using Dto.Products.Products;
using Dto.Products.ProductSuppliers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Bulks
{
    public class SuppliersExcelUploadDto
    {
        public List<int> RowsError { get; set; }

        public List<ProductSupplierCreateDto> SuppliersError { get; set; }

        public List<ProductSupplierCreateDto> SuppliersToCreate { get; set; }
       
        public SuppliersExcelUploadDto()
        {
            RowsError = new List<int>();
            SuppliersError = new List<ProductSupplierCreateDto>();
            SuppliersToCreate = new List<ProductSupplierCreateDto>();
        }
    }
}
