using Common.Exceptions;
using Common.Validations;
using DataAccessInterface.Repositories;
using Domain.Products;
using Dto.Products.ProductSuppliers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Products
{
    public class ProductSupplierLogic
    {
        private readonly IRepository<ProductSupplier> _supplierRepository;
        private readonly NullEntityValidator _nullEntityValidator;

        public ProductSupplierLogic(
            IRepository<ProductSupplier> supplierRepository,
            NullEntityValidator nullEntityValidator)
        {
            _supplierRepository = supplierRepository;
            _nullEntityValidator = nullEntityValidator;
        }

        public void ValidateSupplierToCreate(ProductSupplierCreateDto supplierToValidate)
        {
            var supplier = _supplierRepository.List().FirstOrDefault(s => s.Rut.Equals(supplierToValidate.Rut));

            if (supplier != null) throw new ValidationException("Proveedor existente con rut: " + supplierToValidate.Rut);
        }


        public ProductSupplier CreateProductSupplier(ProductSupplierCreateDto create)
        {
            var productSupplier = new ProductSupplier()
            {
                Name = create.Name,
                Rut = create.Rut,
                Description = create.Description,
                Interval = create.Interval,
                VisitDay = create.VisitDay,
                PhoneNumber = create.PhoneNumber,
                SecondaryPhoneNumber = create.SecondaryPhoneNumber,
                Seller = create.Seller,
                ContactName = create.ContactName,
                IsActive = true,
                StartDate = DateTime.Now
            };

            _supplierRepository.AddAndSave(productSupplier);

            return productSupplier;
        }

        public void DeleteSupplier(ProductSupplier supplier)
        {
            supplier.IsActive = false;
            supplier.EndDate = DateTime.Now;

            _supplierRepository.Update(supplier);
        }

        public ProductSupplier GetBy(string rut)
        {
            var supplier = _supplierRepository.List().FirstOrDefault(s => s.Rut.Equals(rut));
            _nullEntityValidator.ValidateByField(supplier, "Proveedor", "Rut");

            return supplier;
        }
    }
}
