using Common.Exceptions;
using Dto.Products.Products;
using Dto.Products.ProductSuppliers;
using IService.Products;
using Microsoft.AspNetCore.Mvc;
using Services.Products;
using webApi.Filters;

namespace webApi.Controllers.Products
{
    [ServiceFilter(typeof(AuthorizationAttributeFilter))]
    [ApiController]
    [Route("api/productSuppliers")]
    public class ProductSupplierController : ControllerBase
    {
        private readonly IProductSupplierService _productSupplierService;

        //Crear proveedor
        //Buscar proveedor por ?
        //Eliminar/desactivar proveedor
        //Asignar producto a provedor
        //Eliminar producto de proveedor


        public ProductSupplierController(IProductSupplierService productSupplierService)
        {
            _productSupplierService = productSupplierService;
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

        [HttpGet("ActiveSuppliers")]
        public IActionResult GetActiveSuppliers()
        {
            try
            {
                var productSuppliers = _productSupplierService.GetActiveSuppliers();

                return Ok(productSuppliers);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPost("Create")]
        public IActionResult CreateSupplier([FromBody] ProductSupplierCreateDto supplier)
        {
            try
            {
                var productSupplier = _productSupplierService.CreateSupplier(supplier);

                return Ok(productSupplier);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPost("Delete")]
        public IActionResult DeleteSupplier([FromBody] ProductSupplierDto supplier)
        {
            try
            {
                var result = _productSupplierService.DeleteSupplier(supplier);
                return Ok(result);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpGet("{supplierId}")]
        public IActionResult GetSupplier(int supplierId)
        {
            try
            {
                var productSupplier = _productSupplierService.GetSupplierById(supplierId);

                return Ok(productSupplier);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }
    }
}
