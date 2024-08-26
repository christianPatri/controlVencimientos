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
        List<ProductItemDto> GenerateProductItems(ProductItemsGeneratorDto productItemsCreate);

        ProductItemDto GenerateProductItem(ProductItemCreateDto productItemCreate);

        List<ProductItemDto> GetProductItemsForDateExpiration(DateTime expiration);

        ProductItemDto CheckProductItem(ProductItemCheckDto productItemCheck);
    }
}
