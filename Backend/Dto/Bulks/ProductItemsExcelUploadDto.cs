using Dto.Products.ProductItems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Bulks
{
    public class ProductItemsExcelUploadDto
    {
        public List<int> RowsError { get; set; }

        public List<ProductItemCreateDto> ProductItemsError { get; set; }

        public ProductItemsGeneratorDto ProductItemsGenerator { get; set;  }

        public ProductItemsExcelUploadDto()
        {
            RowsError = new List<int>();
            ProductItemsError = new List<ProductItemCreateDto>();
        }
    }
}
