using BusinessLogic.Bulks;
using BusinessLogic.Products;
using BusinessLogic.Users;
using Domain.Products;
using Dto.Bulks;
using Dto.Products.ProductItems;
using Dto.Products.Products;
using Dto.Users;
using IService.Bulks;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Bulks
{
    public class BulkService : IBulkService
    {
        private readonly BulkLogic _bulkLogic;
        private readonly ProductSupplierLogic _productSupplierLogic;
        private readonly ProductLogic _productLogic;
        private readonly ProductItemLogic _productItemLogic;
        private readonly UserLogic _userLogic;

        public BulkService(
            BulkLogic bulkLogic,
            ProductSupplierLogic productSupplierLogic,
            ProductLogic productLogic,
            ProductItemLogic productItemLogic,
            UserLogic userLogic
            )
        {
            _bulkLogic = bulkLogic;
            _productSupplierLogic = productSupplierLogic;
            _productLogic = productLogic;
            _productItemLogic = productItemLogic;
            _userLogic = userLogic; 
        }

        public SuppliersExcelUploadDto LoadSuppliersExcell(string filePath)
        {
            var route = filePath;
            var excelUpload = _bulkLogic.ReadSuppliersFromExcell(route);

            var suppliers = new List<ProductSupplier>();

            excelUpload.SuppliersToCreate.ForEach(s =>
            {
                try
                {
                    _productSupplierLogic.ValidateSupplierToCreate(s);
                    var supplier = _productSupplierLogic.CreateProductSupplier(s);
                    suppliers.Add(supplier);
                }
                catch (Exception e)
                {
                    excelUpload.SuppliersError.Add(s);
                    Console.WriteLine(e);
                }
                
            });

            return excelUpload;
        }

        public ProductsExcelUploadDto LoadProductsExcell(string filePath)
        {
            var route = filePath;
            var excelUpload = _bulkLogic.ReadProductsFromExcell(route);

            //var products = new List<Product>();
            //var suppliers = new List<ProductSupplier>();

            var productsToGenerate = new List<ProductCreateDto>();

            excelUpload.ProductsToCreate.ForEach(p =>
            {
                try
                {
                    _productLogic.ValidateProductToCreate(p);
                    var supplier = _productSupplierLogic.GetBy(p.SupplierRut);
                    _productLogic.CreateProduct(p, supplier);
                    //suppliers.Add(supplier);
                    productsToGenerate.Add(p);
                }
                catch (Exception e)
                {
                    excelUpload.ProductsError.Add(p);
                    Console.WriteLine(e);
                }
            });

            //products = _productLogic.GenerateByRut(productsToGenerate, suppliers);

            return excelUpload;

        }

        public ProductItemsExcelUploadDto LoadProductItemsExcell(string filePath)
        {
            var route = filePath;
            var excelUpload = _bulkLogic.ReadProductItemsFromExcell(route);

            var productItemsToGenerate = new List<ProductItem>();

            excelUpload.ProductItemsGenerator.ProductItemsCreate.ForEach(p =>
            {
                try
                {
                    var product = _productLogic.GetProductByCodebar(p.ProductCodeBar);
                    var productItem = _productItemLogic.Generate(p, product);

                    productItemsToGenerate.Add(productItem);
                }
                catch (Exception e)
                {
                    excelUpload.ProductItemsError.Add(p);
                    Console.WriteLine(e);
                }
            });

            //Asigno nulo, no tiene sentido devolver todo.
            excelUpload.ProductItemsGenerator = null;
            return excelUpload;
        }

        public void CheckProductItemsByExcel(string filePath, UserDto user)
        {
            var route = filePath;
            var productsToCheck = _bulkLogic.ReadCheckProductsFromExcell(route);

            //Mejora: Podria devolver un objeto, con la cantidad de procesados bien. Y la cantidad con error y una lista de los que dieron error.

            productsToCheck.ForEach(p =>
            {
                try
                {
                    var productItem = _productItemLogic.GetProductItemBy(p);
                    var userCheck = _userLogic.GetUserByUsername(user.Username);

                    productItem = _productItemLogic.CheckProductItem(productItem, userCheck, p);
                }
                catch(Exception e)
                {
                    Console.WriteLine(e);
                }
                
            });
        }



        public void LoadProductsJson()
        {
            throw new NotImplementedException();
        }
    }
}
