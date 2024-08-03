using Dto.Products.ProductSuppliers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IService.Products
{
    public interface IProductSupplierService
    {
        ProductSupplierDto CreateSupplier(ProductSupplierCreateDto supplier);

        ProductSupplierDto DeleteSupplier(ProductSupplierDto supplier);
    }
}
