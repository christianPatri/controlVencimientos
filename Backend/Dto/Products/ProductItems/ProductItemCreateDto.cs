using Dto.Products.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Products.ProductItems
{
    public class ProductItemCreateDto
    {

        public int ProductId { get; set; }

        public ProductDto Product { get; set; }

        public string ProductCodeBar { get; set; }

        public DateTime ExpirationDate { get; set; }

        public int Amount { get; set; }

        public ProductItemCreateDto() { }
    }
}
