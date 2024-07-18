using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Products.Products
{
    public class ProductCreateDto
    {
        public string Name { get; set; }

        public string Description { get; set; }

        public string BarCode { get; set; }

        public int Code { get; set; }

        public int AmountDaysPreviousNotification { get; set; }

        public int SupplierId { get; set; }

        public ProductCreateDto() { }
    }
}
