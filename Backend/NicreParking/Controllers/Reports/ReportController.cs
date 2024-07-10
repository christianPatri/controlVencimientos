using Dto.MonthlyClients;
using Dto.Reports;
using IService.Clients;
using IService.Reports;
using Microsoft.AspNetCore.Mvc;
using webApi.Filters;

namespace webApi.Controllers.Reports
{
    [ServiceFilter(typeof(AuthorizationAttributeFilter))]
    [ApiController]
    [Route("api/reports")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportServic)
        {
            _reportService = reportServic;
        }

        [HttpGet("GetMonthlyDebtorsReport")]
        public IActionResult GetMonthlyDebtorsReport()
        {
            var report = _reportService.GetMonthlyDebtorsReport();
            return Ok(report);
        }

        [HttpGet("GetNightlyParkingReport")]
        public IActionResult GetNightlyParkingReport([FromQuery] ParkingReportInDto parkingReportIn)
        {
            var report = _reportService.GetNightlyParkingReport(parkingReportIn);
            return Ok(report);
        }

        [HttpGet("GetHourlyParkingReport")]
        public IActionResult GetHourlyParkingReport([FromQuery] ParkingReportInDto parkingReportIn)
        {
            var report = _reportService.GetHourlyParkingReport(parkingReportIn);
            return Ok(report);
        }


        [HttpGet("GetMonthlyParkingReport")]
        public IActionResult GetMonthlyParkingReport([FromQuery] ParkingReportInDto parkingReportIn)
        {
            var report = _reportService.GetMonthlyParkingReport(parkingReportIn);
            return Ok(report);
        }

        
    }
}
