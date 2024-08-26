using Dto.Products.ProductSuppliers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Products.Products
{
    public class ProductDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string BarCode { get; set; }

        public int Code { get; set; }

        public int AmountDaysPreviousNotification { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime EndDate { get; set; }

        //public ProductSupplierDto Supplier { get; set; }

        public int SupplierId { get; set; }

        public string SupplierName { get; set; }

        public ProductDto() { }
    }
}
