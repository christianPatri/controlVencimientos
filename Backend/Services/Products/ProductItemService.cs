using AutoMapper;
using BusinessLogic.Products;
using Domain.Products;
using Dto.Products.ProductItems;
using IService.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Products
{
    public class ProductItemService : IProductItemService
    {
        private readonly IMapper _mapper;
        private readonly ProductItemLogic _productItemLogic;
        private readonly ProductLogic _productLogic;

        public ProductItemService(
            ProductItemLogic productItemLogic,
            ProductLogic productLogic,
            IMapper mapper) 
        {
            _productItemLogic = productItemLogic;
            _productLogic = productLogic;
            _mapper = mapper;
        }

        public List<ProductItemDto> GenerateProductItems(ProductItemsCreateDto productItemsCreate)
        {
            //Para cada prdoucto, voy a generar los P.Items

            var productsItems = new List<ProductItem>();

            productItemsCreate.ProductItemsCreate.ForEach(productItemCreate =>
            {
                var product = _productLogic.GetProductById(productItemCreate.ProductId);
                var productItem = _productItemLogic.Generate(productItemCreate, product);

                productsItems.Add(productItem);
            });

            var returnDto = _mapper.Map<List<ProductItemDto>>(productsItems);

            return returnDto;
        }

        public ProductItemDto GenerateProductItem(ProductItemCreateDto productItemCreate)
        {
            var product = _productLogic.GetProductById(productItemCreate.ProductId);
            var productItem = _productItemLogic.Generate(productItemCreate, product);

            var returnDto = _mapper.Map<ProductItemDto>(productItem);

            return returnDto;
        }


    }
}
