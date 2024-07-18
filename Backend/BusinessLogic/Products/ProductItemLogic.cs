using Common.Validations;
using DataAccessInterface.Repositories;
using Domain.Products;
using Dto.Products.ProductItems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Products
{
    public class ProductItemLogic
    {
        private readonly IRepository<ProductItem> _productItemRepository;
        private readonly NullEntityValidator _nullEntityValidator;

        public ProductItemLogic(
            IRepository<ProductItem> productItemRepository,
            NullEntityValidator nullEntityValidator)
        {
            _productItemRepository = productItemRepository;
            _nullEntityValidator = nullEntityValidator;
        }

        public ProductItem GetProductByCodebar(int productItemId)
        {
            var productItem = _productItemRepository.List().FirstOrDefault(p => p.Id == productItemId);
            _nullEntityValidator.ValidateById(productItem, "Producto");

            return productItem;
        }

        public ProductItem Generate(ProductItemCreateDto productItemCreate, Product product)
        {
            var productItem = new ProductItem()
            {
                Product = product,
                ProductId = productItemCreate.ProductId,
                Amount = productItemCreate.Amount,
                EntryDate = DateTime.Now,
                ExpirationDate = productItemCreate.ExpirationDate,
                Status = Domain.Enums.ProductItemStatus.Active,
                IsActive = true
            };

            _productItemRepository.AddAndSave(productItem);

            return productItem;

        }

        public List<ProductItem> Generate(List<ProductItemCreateDto> productItemsCreate, Product product)
        {
            var productItems = new List<ProductItem>();

            productItemsCreate.ForEach(pi =>
            {
                var productItem = Generate(pi, product);
                productItems.Add(productItem);
            });

            return productItems;
        }

    }
}
