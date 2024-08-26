using Common.Validations;
using DataAccessInterface.Repositories;
using Domain.Products;
using Domain.Users;
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
        private readonly IRepository<User> _userRepository;

        public ProductItemLogic(
            IRepository<ProductItem> productItemRepository,
            IRepository<User> userRepository,
            NullEntityValidator nullEntityValidator)
        {
            _productItemRepository = productItemRepository;
            _nullEntityValidator = nullEntityValidator;
            _userRepository = userRepository;
        }

        public ProductItem GetProductById(int productItemId)
        {
            var productItem = _productItemRepository.List().FirstOrDefault(p => p.Id == productItemId);
            _nullEntityValidator.ValidateById(productItem, "Producto");

            return productItem;
        }

        public ProductItem GetProductItemBy(ProductItemCheckDto productItemCheck)
        {
            var productItem = _productItemRepository.IncludeAll("Product").FirstOrDefault(p => p.Product.Name == productItemCheck.ProductItem.Product.Name &&
                p.IsActive && p.Amount == productItemCheck.ProductItem.Amount && CompareDate(p.ExpirationDate, productItemCheck.ProductItem.ExpirationDate));

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

        public List<ProductItem> GetProductItemsForDateExpiration(DateTime expirationDate)
        {
            //IncludeAll("Supplier").Where(p => p.IsActive).ToList();

            var productItems = _productItemRepository.IncludeAll("Product").Where(p =>
                   p.ExpirationDate.Year == expirationDate.Year &&
                   p.ExpirationDate.Month == expirationDate.Month &&
                   p.ExpirationDate.Day == expirationDate.Day);

            if (IsToday(expirationDate))
            {
                var moreItems = _productItemRepository.IncludeAll("Product").Where(p =>
                   p.ExpirationDate.Year <= expirationDate.Year &&
                   p.ExpirationDate.Month <= expirationDate.Month &&
                   p.ExpirationDate.Day < expirationDate.Day &&
                   p.IsActive);

                productItems = productItems.Concat(moreItems).OrderBy(pi => pi.ExpirationDate);
            }

            foreach (var item in productItems)
            {
                if(item.CheckUserId > 0)
                {
                    item.CheckedBy = _userRepository.List().First(u => u.Id == item.CheckUserId);
                }
                
            }
            return productItems.ToList();
        }

        public bool IsToday(DateTime date)
        {
            var today = DateTime.Now;

            return today.Year == date.Year && today.Month == date.Month && today.Day == date.Day;
        }

        private bool CompareDate(DateTime date1, DateTime date2)
        {
            return date1.Year == date2.Year && date1.Month == date2.Month && date1.Day == date2.Day;
        }

        public ProductItem CheckProductItem(ProductItem productItem, User user, ProductItemCheckDto productItemCheck)
        {
            productItem.AmountExpired = productItemCheck.ProductItem.AmountExpired;
            productItem.CheckedDate = DateTime.Now;
            productItem.Status = Domain.Enums.ProductItemStatus.Checked;
            productItem.CheckedBy = user;
            productItem.CheckUserId = user.Id;
            productItem.IsActive = false;

            _productItemRepository.Update(productItem);
            
            return productItem;
        }

    }
}
