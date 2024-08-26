using Common.Exceptions;
using Common.Validations;
using DataAccessInterface.Repositories;
using Domain.Enums;
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

            if(supplierToValidate.VisitDays.Count == 0 ) throw new ValidationException("Debe asignar al menos un dia de visita al local");
        }

        public List<ProductSupplier> GetActiveSuppliers()
        {
            var suppliers = _supplierRepository.List().Where(s => s.IsActive).ToList();

            return suppliers;
        }


        public ProductSupplier CreateProductSupplier(ProductSupplierCreateDto create)
        {
            var visitDays = new List<SupplierVisitDay>();
            create.VisitDays.ForEach(vd => visitDays.Add((SupplierVisitDay)vd));
            var productSupplier = new ProductSupplier()
            {
                Name = create.Name,
                Rut = create.Rut,
                Description = create.Description,
                Interval = create.Interval,
                VisitDays = visitDays,
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

        public ProductSupplier GetBy(int id)
        {
            var supplier = _supplierRepository.List().FirstOrDefault(s => s.Id == id);
            _nullEntityValidator.Validate(supplier, "Proveedor");

            return supplier;
        }
    }
}
