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
        void LoadSuppliersExcell(string filePath);

        void LoadProductsJson();

        void LoadProductsExcell(string filePath);

        void LoadProductItemsExcell(string filePath);

        void CheckProductItemsByExcel(string filePath, UserDto user);
    }
}
