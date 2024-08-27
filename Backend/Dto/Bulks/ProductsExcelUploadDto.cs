using Dto.Products.ProductItems;
using Dto.Products.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Bulks
{
    public class ProductsExcelUploadDto
    {
        public List<int> RowsError { get; set; }

        public List<ProductCreateDto> ProductsError { get; set; }

        public List<ProductCreateDto> ProductsToCreate { get; set; }

        public ProductsExcelUploadDto()
        {
            RowsError = new List<int>();
            ProductsError = new List<ProductCreateDto>();
            ProductsToCreate = new List<ProductCreateDto>();
        }
    }
}
