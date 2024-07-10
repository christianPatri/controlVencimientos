using Common.Exceptions;
using Dto.Clients;
using Dto.HourlyClients;
using Dto.Vehicles;
using Dto.Vehicles.MonthlyVehicles;
using IService.Vehicles;
using Microsoft.AspNetCore.Mvc;

namespace webApi.Controllers.Vehicles
{
    [ApiController]
    [Route("api/monthlyVehicles")]
    public class MonthlyVehicleController : ControllerBase
    {
        private readonly IMonthlyVehicleService _monthlyVehicleService;

        public MonthlyVehicleController(IMonthlyVehicleService monthlyVehicleService)
        {
            _monthlyVehicleService = monthlyVehicleService;
        }

        [HttpPost("GenerateMonthlyVehicles")]
        public IActionResult GenerateMonthlyVehicles([FromBody] MonthlyVehicleGeneratorDto monthlyVehicleGenerator)
        {
            try
            {
                var result = _monthlyVehicleService.GenerateMonthlyVehicles(monthlyVehicleGenerator);
                return Ok(result);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPost("GenerateMonthlyVehicle")]
        public IActionResult GenerateMonthlyVehicle([FromBody] MonthlyVehicleGeneratorDto monthlyVehicleGenerator)
        {
            try
            {
                var result = _monthlyVehicleService.GenerateMonthlyVehicle(monthlyVehicleGenerator);
                return Ok(result);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPut("UpdateMonthlyVehicle")]
        public IActionResult UpdateMonthlyVehicle([FromBody] MonthlyVehicleDto monthlyVehicle)
        {
            try
            {
                var result = _monthlyVehicleService.UpdateMonthlyVehicle(monthlyVehicle);
                return Ok(result);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPost("EntryMonthlyVehicle")]
        public IActionResult EntryMonthlyVehicle(VehicleDto input)
        {
            try
            {
                var hourlyVehicle = _monthlyVehicleService.EntryMonthlyVehicle(input);
                return Ok(hourlyVehicle);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPost("ExitMonthlyVehicle")]
        public IActionResult ExitMonthlyVehicle(VehicleDto input)
        {
            try
            {
                var hourlyVehicle = _monthlyVehicleService.ExitMonthlyVehicle(input);
                return Ok(hourlyVehicle);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpGet("MonthlyVehicleMovements")]
        public IActionResult MonthlyVehicleMovements([FromQuery] MonthlyVehicleMovementsDto input)
        {
            try
            {
                var vehicleMovements = _monthlyVehicleService.GetMonthlyVehicleMovements(input);
                return Ok(vehicleMovements);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        [HttpPost("DeleteMonthlyVehicle")]
        public IActionResult DeleteMonthlyVehicle([FromBody] VehicleDto monthlyVehicle)
        {
            try
            {
                var result = _monthlyVehicleService.DeleteMonthlyVehicle(monthlyVehicle);
                return Ok(result);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }
    }
}
