using AutoMapper;
using BusinessLogic.Products;
using Common.Validations;
using Domain.Products;
using Dto.Products.Products;
using IService.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Products
{
    public class ProductService : IProductService
    {
        private readonly ProductLogic _productLogic;
        private readonly ProductSupplierLogic _productSupplierLogic;
        private readonly IMapper _mapper;
        

        public ProductService(
            ProductLogic productLogic,
            ProductSupplierLogic productSupplierLogic,
            IMapper mapper
            )
        {
            _productLogic = productLogic;
            _mapper = mapper;
            _productSupplierLogic = productSupplierLogic;
            
        }

        public ProductDto CreateProduct(ProductCreateDto productCreate)
        {
            _productLogic.ValidateProductToCreate(productCreate);
            var supplier = _productSupplierLogic.GetBy(productCreate.SupplierId);
            var product = _productLogic.CreateProduct(productCreate, supplier);

            var dto = _mapper.Map<ProductDto>(product);

            return dto;
        }

        public List<ProductDto> CreateProducts(ProductsGeneratorDto productCreate)
        {
            var suppliers = new List<ProductSupplier>();

            productCreate.Products.ForEach(p =>
            {
                _productLogic.ValidateProductToCreate(p);
                var supplier = _productSupplierLogic.GetBy(p.SupplierId);
                suppliers.Add(supplier);
            });

            var products = _productLogic.Generate(productCreate.Products, suppliers);

            return _mapper.Map<List<ProductDto>>(products);
        }

        public ProductDto GetProductByCodeBar(string codeBar)
        {
            var product = _productLogic.GetProductByCodebar(codeBar);

            return _mapper.Map<ProductDto>(product);
        }

        public List<ProductDto> GetActiveProducts()
        {
            var products = _productLogic.GetActiveProducts();

            return _mapper.Map<List<ProductDto>>(products);
        }

        public ProductDto DeleteProduct(ProductDto productToDelete)
        {
            var product = _productLogic.GetProductByCodebar(productToDelete.BarCode);
            _productLogic.DeleteProduct(product);

            return productToDelete;
        }

        public List<ProductDto> GetSupplierProducts(int supplierId)
        {
            var supplier = _productSupplierLogic.GetBy(supplierId);
            var products = _productLogic.GetProductsFromSupplier(supplier);

            return _mapper.Map<List<ProductDto>>(products);

        }


    }
}
