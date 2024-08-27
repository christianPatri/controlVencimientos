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
using Dto.Bulks;

namespace webApi.Controllers.Bulks
{
    [ServiceFilter(typeof(AuthorizationAttributeFilter))]
    [ApiController]
    [Route("api/bulkProductItems")]
    public class BulkProductItemController : ControllerBase
    {
        private readonly IBulkService _bulkService;

        private readonly IHostingEnvironment _hostingEnvironment;


        public BulkProductItemController(IBulkService bulkService, IHostingEnvironment hostingEnvironment)
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

            var excelUploadResponse = _bulkService.LoadProductItemsExcell(filePath);

            return Ok(excelUploadResponse);
        }

        [HttpPost("CheckByExcel")]
        public async Task<IActionResult> CheckProductItemsByExcel(BulkCheckProductItemsDto checks)
        {
            if (checks.File == null || checks.File.Length == 0)
                return BadRequest("Archivo no cargado");

            var filePath = Path.Combine(_hostingEnvironment.ContentRootPath, "Uploads", checks.File.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await checks.File.CopyToAsync(stream);
            }

            _bulkService.CheckProductItemsByExcel(filePath, checks.User);

            return Ok();
        }

    }
}
