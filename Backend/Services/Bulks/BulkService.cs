using BusinessLogic.Bulks;
using BusinessLogic.Products;
using BusinessLogic.Users;
using Domain.Products;
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

        public void LoadSuppliersExcell(string filePath)
        {
            var route = filePath;
            var suppliersToCreate = _bulkLogic.ReadSuppliersFromExcell(route);

            var suppliers = new List<ProductSupplier>();

            suppliersToCreate.ForEach(s =>
            {
                try
                {
                    _productSupplierLogic.ValidateSupplierToCreate(s);
                    var supplier = _productSupplierLogic.CreateProductSupplier(s);
                    suppliers.Add(supplier);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
                
            });
        }

        public void LoadProductsExcell(string filePath)
        {
            var route = filePath;
            var productsToCreate = _bulkLogic.ReadProductsFromExcell(route);

            var products = new List<Product>();
            var suppliers = new List<ProductSupplier>();

            var productsToGenerate = new List<ProductCreateDto>();

            productsToCreate.ForEach(p =>
            {
                try
                {
                    _productLogic.ValidateProductToCreate(p);
                    var supplier = _productSupplierLogic.GetBy(p.SupplierRut);
                    suppliers.Add(supplier);
                    productsToGenerate.Add(p);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            });

            products = _productLogic.GenerateByRut(productsToGenerate, suppliers);

        }

        public void LoadProductItemsExcell(string filePath)
        {
            var route = filePath;
            var productItemsToCreate = _bulkLogic.ReadProductItemsFromExcell(route);

            var productItemsToGenerate = new List<ProductItem>();

            productItemsToCreate.ProductItemsCreate.ForEach(p =>
            {
                try
                {
                    var product = _productLogic.GetProductByCodebar(p.ProductCodeBar);
                    var productItem = _productItemLogic.Generate(p, product);

                    productItemsToGenerate.Add(productItem);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                }
            });
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
