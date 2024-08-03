using Dto.Products.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Products.ProductSuppliers
{
    public class ProductSupplierDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public string Rut { get; set; }

        public string Description { get; set; }

        public string PhoneNumber { get; set; }

        public string SecondaryPhoneNumber { get; set; }

        public string ContactName { get; set; }

        public string Seller { get; set; }

        public List<ProductDto> Products { get; set; }

        public int Interval { get; set; }

        public DateTime VisitDay { get; set; }
        //Ver como manejarlo, si como dia de la semana de visita, o que o Dias de visitas, tipo un enum
        // 1 = lunes, 2 = martes, etc ?

        public bool IsActive { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
        public ProductSupplierDto() { }
    }
}
