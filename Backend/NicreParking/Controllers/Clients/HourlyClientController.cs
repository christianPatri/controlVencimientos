using Common.Exceptions;
using Dto.Clients;
using Dto.HourlyClients;
using Dto.Users;
using IService.Clients;
using IService.Users;
using Microsoft.AspNetCore.Mvc;
using Services.Clients;

namespace webApi.Controllers.Clients
{
    [ApiController]
    [Route("api/hourlyClients")]
    public class HourlyClientController : ControllerBase
    {
        private readonly IHourlyClientService _hourlyClientService;


        public HourlyClientController(IHourlyClientService hourlyClientService)
        {
            _hourlyClientService = hourlyClientService;
        }

        [HttpPost("EntryHourlyClient")]
        public IActionResult EntryHourlyClient(HourlyClientDto input)
        {
            try
            {
                var hourlyVehicle = _hourlyClientService.HourlyVehicleEntry(input);

                return Ok(hourlyVehicle);
            }
            catch(ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPost("ExitHourlyClient")]
        public IActionResult ExitHourlyClient(HourlyClientDto input)
        {
            try
            {
                var hourlyVehicle = _hourlyClientService.HourlyVehicleExit(input);

                return Ok(hourlyVehicle);
            }
            catch(ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }
    }
}
