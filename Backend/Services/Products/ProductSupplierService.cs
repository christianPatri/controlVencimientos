using AutoMapper;
using BusinessLogic.Products;
using Dto.Products.Products;
using Dto.Products.ProductSuppliers;
using IService.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Products
{
    public class ProductSupplierService : IProductSupplierService
    {
        private readonly ProductSupplierLogic _productSupplierLogic;
        private readonly IMapper _mapper;


        public ProductSupplierService(
            ProductSupplierLogic productSupplierLogic,
            IMapper mapper
            )
        {
            _productSupplierLogic = productSupplierLogic;
            _mapper = mapper;

        }

        public ProductSupplierDto CreateSupplier(ProductSupplierCreateDto supplierToCreate)
        {
            _productSupplierLogic.ValidateSupplierToCreate(supplierToCreate);
            var supplier = _productSupplierLogic.CreateProductSupplier(supplierToCreate);

            var dto = _mapper.Map<ProductSupplierDto>(supplier);

            return dto;
        }

        public ProductSupplierDto DeleteSupplier(ProductSupplierDto supplierToDelete)
        {
            var supplier = _productSupplierLogic.GetBy(supplierToDelete.Rut);
            _productSupplierLogic.DeleteSupplier(supplier);

            return supplierToDelete;
        }
    }
}
