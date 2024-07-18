using AutoMapper;
using BusinessLogic.Products;
using Common.Validations;
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
        private readonly IMapper _mapper;
        

        public ProductService(
            ProductLogic productLogic,
            IMapper mapper
            )
        {
            _productLogic = productLogic;
            _mapper = mapper;
            
        }

        public ProductDto CreateProduct(ProductCreateDto productCreate)
        {
            _productLogic.ValidateProductToCreate(productCreate);
            var product = _productLogic.CreateProduct(productCreate);

            var dto = _mapper.Map<ProductDto>(product);

            return dto;
        }

        public ProductDto GetProductByCodeBar(string codeBar)
        {
            var product = _productLogic.GetProductByCodebar(codeBar);
            

            return _mapper.Map<ProductDto>(product);
        }

        public ProductDto DeleteProduct(ProductDto productToDelete)
        {
            var product = _productLogic.GetProductByCodebar(productToDelete.BarCode);
            _productLogic.DeleteProduct(product);

            return productToDelete;
        }
    }
}
