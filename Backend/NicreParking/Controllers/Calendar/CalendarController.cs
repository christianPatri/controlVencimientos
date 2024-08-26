using Common.Exceptions;
using IService.Calendar;
using IService.Products;
using Microsoft.AspNetCore.Mvc;
using System;
using webApi.Filters;

namespace webApi.Controllers.Calendar
{
    [ServiceFilter(typeof(AuthorizationAttributeFilter))]
    [ApiController]
    [Route("api/calendar")]
    public class CalendarController : ControllerBase
    {
        private readonly ICalendarService _calendarService;

        public CalendarController(ICalendarService calendarService)
        {
            _calendarService = calendarService;
        }

        [HttpGet("GetDayIcons")]
        public IActionResult GetDayIcons(DateTime date)
        {
            try
            {
                var product = _calendarService.GetDayIcons(date);

                return Ok(product);
            }
            catch (ValidationException ve)
            {
                return BadRequest(ve.Message);
            }
        }
    }
}
