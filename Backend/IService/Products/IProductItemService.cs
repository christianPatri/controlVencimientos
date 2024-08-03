using Dto.Products.ProductItems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IService.Products
{
    public interface IProductItemService
    {
        List<ProductItemDto> GenerateProductItems(ProductItemsCreateDto productItemsCreate);

        ProductItemDto GenerateProductItem(ProductItemCreateDto productItemCreate);
    }
}
