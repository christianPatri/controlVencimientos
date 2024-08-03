using Dto.Products.Products;
using IService.Products;
using IService.Users;
using Microsoft.AspNetCore.Mvc;
using Services.Users;
using System.ComponentModel.DataAnnotations;
using webApi.Filters;

namespace webApi.Controllers.Products
{
    [ServiceFilter(typeof(AuthorizationAttributeFilter))]
    [ApiController]
    [Route("api/products")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        //Crear Producto
        //Buscar producto por codigo de barras cuando escaneo
        //Eliminar/desactivar producto
        //Asignar producto a provedor
        //Eliminar producto de proveedor


        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet("GetProductBy/{codebar}")]
        public IActionResult GetProductBy(string codebar)
        {
            try
            {
                var product = _productService.GetProductByCodeBar(codebar);

                return Ok(product);
            }
            catch(ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPost("DeleteProduct")]
        public IActionResult DeleteProduct([FromBody] ProductDto product)
        {
            try
            {
                var result = _productService.DeleteProduct(product);
                return Ok(result);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPost("CreateProduct")]
        public IActionResult CreateProduct([FromBody] ProductCreateDto product)
        {
            try
            {
                var result = _productService.CreateProduct(product);
                return Ok(result);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }
    }
}
