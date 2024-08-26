using Common.Exceptions;
using Dto.Products.ProductItems;
using Dto.Products.Products;
using IService.Products;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
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

        

        [HttpGet("GetProductItemsForDateExpiration")]
        public IActionResult GetProductItemsForExpiration([FromQuery] ProductItemsExpirationDto expiration)
        {
            try
            {
                var result = _productItemService.GetProductItemsForDateExpiration(expiration.ExpirationDate);
                return Ok(result);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }



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
        public IActionResult CreateProductItems([FromBody] ProductItemsGeneratorDto productItem)
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

        [HttpPost("CheckProductItem")]
        public IActionResult CheckProductItem([FromBody] ProductItemCheckDto productItemCheck)
        {
            try
            {
                var result = _productItemService.CheckProductItem(productItemCheck);
                return Ok(result);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }
    }
}
