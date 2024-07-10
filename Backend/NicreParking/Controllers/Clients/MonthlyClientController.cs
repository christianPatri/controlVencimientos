using Common.Exceptions;
using Dto.Clients;
using Dto.MonthlyClients;
using IService.Clients;
using Microsoft.AspNetCore.Mvc;
using webApi.Filters;

namespace webApi.Controllers.Clients
{
    [ServiceFilter(typeof(AuthorizationAttributeFilter))]
    [ApiController]
    [Route("api/monthlyClients")]
    public class MonthlyClientController : ControllerBase
    {
        private readonly IMonthlyClientService _monthlyClientService;

        public MonthlyClientController(IMonthlyClientService monthlyClientService)
        {
            _monthlyClientService = monthlyClientService;
        }

        [HttpGet("ActiveMonthlyClients")]
        public IActionResult GetActiveMonthlyClients()
        {
            var clients = _monthlyClientService.GetActiveMonthlyClients();
            return Ok(clients);
        }

        [HttpGet("{clientId}")]
        public IActionResult Get(int clientId)
        {
            var client = _monthlyClientService.GetById(clientId);
            return Ok(client);
        }

        [HttpPost]
        public IActionResult Post([FromBody] MonthlyClientDto clientCreate)
        {
            try
            {
                var client = _monthlyClientService.CreateMonthlyClient(clientCreate);
                return Ok(client);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPut]
        public IActionResult Put([FromBody] MonthlyClientDto clientUpdate)
        {
            //Mejoras: Devolver un estado tambien, que diga cliente actualizado ?
            try
            {
                var client = _monthlyClientService.UpdateMonthlyClient(clientUpdate);
                return Ok(client);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPut("DeleteMonthlyClient")]
        public IActionResult Delete([FromBody] MonthlyClientDto clientDelete)
        {
            try
            {
                var client = _monthlyClientService.DeleteMonthlyClient(clientDelete);
                return Ok(client);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpGet("CheckMonthlyClient")]
        public IActionResult CheckMonthlyClient([FromQuery] MonthlyClientCheck monthlyClientCheck)
        {
            try
            {
                var client = _monthlyClientService.CheckMonthlyClient(monthlyClientCheck);
                return Ok(client);
            }
            catch(ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }
    }
}
