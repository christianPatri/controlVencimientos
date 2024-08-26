using Dto.Products.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Products.ProductItems
{
    public class ProductItemCheckDto : BaseRequestDto
    {
        public ProductItemDto ProductItem { get; set; }

        public ProductItemCheckDto() { }


    }
}
