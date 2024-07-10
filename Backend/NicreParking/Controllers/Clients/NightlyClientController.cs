using Common.Exceptions;
using Dto.HourlyClients;
using IService.Clients;
using Microsoft.AspNetCore.Mvc;
using Services.Clients;

namespace webApi.Controllers.Clients
{
    [ApiController]
    [Route("api/nightlyClients")]
    public class NightlyClientController : ControllerBase
    {
        private readonly INightlyClientService _nightlyClientService;


        public NightlyClientController(INightlyClientService nightlyClientService)
        {
            _nightlyClientService = nightlyClientService;
        }

        [HttpPost("EntryNightlyClient")]
        public IActionResult EntryNightlyClient(HourlyClientDto input)
        {
            try
            {
                var nightlyVehicle = _nightlyClientService.NightlyVehicleEntry(input);

                return Ok(nightlyVehicle);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
            
        }

        [HttpPost("ExitNightlyClient")]
        public IActionResult ExitNightlyClient(HourlyClientDto input)
        {
            try
            {
                var nightlyVehicle = _nightlyClientService.NightlyVehicleExit(input);

                return Ok(nightlyVehicle);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }
    }
}