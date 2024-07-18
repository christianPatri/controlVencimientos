using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Products
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string BarCode { get; set; }

        public int Code { get; set;}

        public int AmountDaysPreviousNotification { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime EndDate { get; set; }

        public Product()
        {

        }
    }
}
