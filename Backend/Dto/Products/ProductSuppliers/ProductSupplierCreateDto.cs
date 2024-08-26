using Dto.Products.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Products.ProductSuppliers
{
    public class ProductSupplierCreateDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Rut { get; set; }

        public string Description { get; set; }

        public List<ProductDto> Products { get; set; }

        public int Interval { get; set; }

        public List<int> VisitDays { get; set; }

        public string PhoneNumber { get; set; }

        public string SecondaryPhoneNumber { get; set; }

        public string ContactName { get; set; }

        public string Seller { get; set; }

        public ProductSupplierCreateDto() { }
    }
}
