using Dto.Products.Common;
using Dto.Products.ProductItems;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Bulks
{
    public class BulkCheckProductItemsDto : BaseRequestDto
    {
        public IFormFile File { get; set; }

        public BulkCheckProductItemsDto() { }
    }
}
