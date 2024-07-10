using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace webApi.Controllers.Payments
{
    [ApiController]
    [Route("api/payments")]
    public class PaymentController : ControllerBase
    {
        public PaymentController()
        {

        }

        ///// <summary>
        ///// Make a payment linked to a client and vehicle
        ///// </summary>
        ///// <param name="clientCreate"></param>
        ///// <returns></returns>
        //[HttpPost]
        //public IActionResult Post([FromBody] PaymentCreateDto paymentCreateDto)
        //{
        //    try
        //    {
        //        var payment = _vehicleService.CreateVehicle(vehicleCreate);
        //        return Ok(vehicle);
        //    }
        //    catch (ValidationException ve)
        //    {
        //        return BadRequest(ve.Message);
        //    }
        //}
    }
}
