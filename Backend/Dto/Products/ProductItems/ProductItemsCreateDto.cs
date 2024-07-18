using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Products.ProductItems
{
    public class ProductItemsCreateDto
    {
        public List<ProductItemCreateDto> ProductItemsCreate { get; set; } 
        public ProductItemsCreateDto()
        {

        }
    }
}
