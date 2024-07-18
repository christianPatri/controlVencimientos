using Common.Exceptions;
using Common.Validations;
using DataAccessInterface.Repositories;
using Domain.Products;
using Dto.Products.Products;
using Dto.Products.ProductSuppliers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Products
{
    public class ProductLogic
    {
        private readonly IRepository<Product> _productRepository;
        private readonly NullEntityValidator _nullEntityValidator;

        public ProductLogic(IRepository<Product> productRepository,
            NullEntityValidator nullEntityValidator)
        {
            _productRepository = productRepository;
            _nullEntityValidator = nullEntityValidator;
        }

        public void ValidateProductToCreate(ProductCreateDto productToValidate)
        {
            var product = _productRepository.List().FirstOrDefault(p => p.BarCode.Equals(productToValidate.BarCode));

            if (product != null) throw new ValidationException("Producto existente con codigo de barras: " + product.BarCode);
        }


        public Product CreateProduct(ProductCreateDto create)
        {
            var product = new Product()
            {
                Name = create.Name,
                Description = create.Description,
                BarCode = create.BarCode,
                Code = create.Code,
                AmountDaysPreviousNotification = create.AmountDaysPreviousNotification,
                IsActive = true,
                CreationDate = DateTime.Now
            };

            _productRepository.AddAndSave(product);

            return product;
        }

        public void DeleteProduct(Product product)
        {
            product.IsActive = false;
            product.EndDate = DateTime.Now;

            _productRepository.Update(product);
        }

        public Product GetProductByCodebar(string codeBar)
        {
            var product = _productRepository.List().FirstOrDefault(p => p.BarCode.Equals(codeBar));
            _nullEntityValidator.ValidateByField(product, "Producto", "Codigo de barras");

            return product;
        }

        public Product GetProductById(int productId)
        {
            var product = _productRepository.List().FirstOrDefault(p => p.Id == productId);
            _nullEntityValidator.ValidateById(product, "Producto");

            return product;
        }
    }
}
