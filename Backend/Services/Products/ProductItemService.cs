using AutoMapper;
using BusinessLogic.Products;
using BusinessLogic.Users;
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
        private readonly UserLogic _userLogic;

        public ProductItemService(
            ProductItemLogic productItemLogic,
            ProductLogic productLogic,
            UserLogic userLogic,
            IMapper mapper) 
        {
            _productItemLogic = productItemLogic;
            _productLogic = productLogic;
            _userLogic = userLogic;
            _mapper = mapper;
        }

        public List<ProductItemDto> GenerateProductItems(ProductItemsGeneratorDto productItemsCreate)
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

        public List<ProductItemDto> GetProductItemsForDateExpiration(DateTime expiration)
        {
            var productItems = _productItemLogic.GetProductItemsForDateExpiration(expiration);

            //Si el dia es Today, tengo que traer los que estan expirados para atras

            return _mapper.Map<List<ProductItemDto>>(productItems);
        }

        public ProductItemDto CheckProductItem(ProductItemCheckDto productItemCheck)
        {
            var productItem = _productItemLogic.GetProductById(productItemCheck.ProductItem.Id);
            var user = _userLogic.GetUserByUsername(productItemCheck.User.Username);

            productItem = _productItemLogic.CheckProductItem(productItem, user, productItemCheck);

            return _mapper.Map<ProductItemDto>(productItem);
        }


    }
}
