using Common.Exceptions;
using Dto.Vehicles;
using IService.Vehicles;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webApi.Controllers.Vehicles
{
    [ApiController]
    [Route("api/vehicles")]
    public class VehicleController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;

        public VehicleController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        /// <summary>
        /// Get the vehicles from a specific client
        /// </summary>
        /// <param name="clientId"></param>
        /// <returns></returns>
        [HttpGet("{clientId}")]
        public IActionResult Get(int clientId)
        {
            try
            {
                var vehicles = _vehicleService.GetActiveVehiclesBy(clientId);

                return Ok(vehicles);
            }
            catch(ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        /// <summary>
        /// Create a vehicle linked to a client
        /// </summary>
        /// <param name="clientCreate"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Post(VehicleCreateDto vehicleCreate)
        {
            try
            {
                var vehicle = _vehicleService.CreateVehicle(vehicleCreate);
                return Ok(vehicle);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        /// <summary>
        /// Create a vehicle linked to a client
        /// </summary>
        /// <param name="vehicleUpdate"></param>
        /// <returns></returns>
        [HttpPut]
        public IActionResult Put([FromBody] VehicleUpdateDto vehicleUpdate)
        {
            try
            {
                var vehicle = _vehicleService.UpdateVehicleBasicInfo(vehicleUpdate);
                return Ok(vehicle);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        /// <summary>
        /// disable a vehicle linked to a client
        /// </summary>
        /// <param name=""></param>
        /// <returns></returns>
        [HttpPut]
        public IActionResult Disable(VehicleDeleteDto vehicleDelete)
        {
            try
            {
                _vehicleService.DisableVehicle(vehicleDelete);
                return Ok();
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        /// <summary>
        /// delete a vehicle linked to a client
        /// </summary>
        /// <param name="clientCreate"></param>
        /// <returns></returns>
        [HttpDelete("{vehicleId}")]
        public IActionResult Delete(int vehicleId)
        {
            try
            {
                _vehicleService.DeleteVehicle(vehicleId);
                return Ok();
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }

        //Falta Metodo para linkear un cliente a un vehiculo, o al revez, dado un vehiculo, quiero linkearle otro cliente.
        // Ej: Creo yo con un auto. Luego agrego a alquien mas, lo necesito linekar al auto => No se puede ahora.
    }
}
