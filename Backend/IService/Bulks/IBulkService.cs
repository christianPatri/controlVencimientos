using Dto.Bulks;
using Dto.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IService.Bulks
{
    public interface IBulkService
    {
        SuppliersExcelUploadDto LoadSuppliersExcell(string filePath);

        void LoadProductsJson();

        ProductsExcelUploadDto LoadProductsExcell(string filePath);

        ProductItemsExcelUploadDto LoadProductItemsExcell(string filePath);

        void CheckProductItemsByExcel(string filePath, UserDto user);
    }
}
