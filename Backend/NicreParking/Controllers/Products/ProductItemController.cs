using Common.Exceptions;
using Dto.Products.ProductItems;
using Dto.Products.Products;
using IService.Products;
using Microsoft.AspNetCore.Mvc;
using webApi.Filters;

namespace webApi.Controllers.Products
{
    [ServiceFilter(typeof(AuthorizationAttributeFilter))]
    [ApiController]
    [Route("api/productItems")]
    public class ProductItemController: ControllerBase
    {
        private readonly IProductItemService _productItemService;

        public ProductItemController(IProductItemService productItemService)
        {
            _productItemService = productItemService;
        }

        //[HttpGet("GetProductBy/{codebar}")]
        //public IActionResult GetProductBy(string codebar)
        //{
        //    try
        //    {
        //        var product = _productService.GetProductByCodeBar(codebar);

        //        return Ok(product);
        //    }
        //    catch (ValidationException ve)
        //    {
        //        return BadRequest(ve.Message);
        //    }
        //}

        //[HttpPost("DeleteProduct")]
        //public IActionResult DeleteProduct([FromBody] ProductDto product)
        //{
        //    try
        //    {
        //        var result = _productService.DeleteProduct(product);
        //        return Ok(result);
        //    }
        //    catch (ValidationException ve)
        //    {
        //        return BadRequest(ve.Message);
        //    }
        //}

        [HttpPost("CreateProductItem")]
        public IActionResult CreateProductItem([FromBody] ProductItemCreateDto productItem)
        {
            try
            {
                var result = _productItemService.GenerateProductItem(productItem);
                return Ok(result);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPost("CreateProductItems")]
        public IActionResult CreateProductItems([FromBody] ProductItemsCreateDto productItem)
        {
            try
            {
                var result = _productItemService.GenerateProductItems(productItem);
                return Ok(result);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }
    }
}
