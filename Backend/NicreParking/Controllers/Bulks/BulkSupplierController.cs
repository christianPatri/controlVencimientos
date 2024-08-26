using Common.Exceptions;
using Dto.Products.ProductItems;
using Dto.Products.Products;
using IService.Products;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using webApi.Filters;
using Domain.Products;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using IService.Bulks;

namespace webApi.Controllers.Bulks
{
    [ServiceFilter(typeof(AuthorizationAttributeFilter))]
    [ApiController]
    [Route("api/bulkSuppliers")]
    public class BulkSupplierController : ControllerBase
    {
        private readonly IBulkService _bulkService;

        private readonly IHostingEnvironment _hostingEnvironment;


        public BulkSupplierController(IBulkService bulkService, IHostingEnvironment hostingEnvironment)
        {
            _bulkService = bulkService;
            _hostingEnvironment = hostingEnvironment;

        }

        [HttpPost("Excel")]
        public async Task<IActionResult> ExcelUpload(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return BadRequest("Archivo no cargado");

            var filePath = Path.Combine(_hostingEnvironment.ContentRootPath, "Uploads", file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            _bulkService.LoadSuppliersExcell(filePath);

            return Ok();
        }

        //[HttpPost("cargar-json")]
        //public async Task<IActionResult> CargarJson(IFormFile archivo)
        //{
        //    if (archivo == null || archivo.Length == 0)
        //        return BadRequest("Archivo no cargado");

        //    using (var stream = new StreamReader(archivo.OpenReadStream()))
        //    {
        //        var contenido = await stream.ReadToEndAsync();
        //        var productos = JsonConvert.DeserializeObject<List<Producto>>(contenido);

        //        // Lógica para guardar los productos en la base de datos
        //        // ...

        //        return Ok(productos);
        //    }
        //}

        
    }
}



