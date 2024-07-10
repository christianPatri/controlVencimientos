using Dto.Bills;
using Dto.HourlyClients;
using IService.Bills;
using IService.Clients;
using Microsoft.AspNetCore.Mvc;
using Services.Clients;

namespace webApi.Controllers.Bills
{
    [ApiController]
    [Route("api/bills")]
    public class BillController : ControllerBase
    {
        private readonly IBillService _billService;


        public BillController(IBillService billService)
        {
            _billService = billService;
        }

        [HttpPost("NewMonthlyClientBill")]
        public IActionResult GenerateNewMonthlyClientBill(BillCreateDto input)
        {
            var bill = _billService.GenerateNewMonthlyClientBill(input);

            return Ok(bill);
        }

        [HttpPost("ManualMonthlyClientBill")]
        public IActionResult GenerateManualMonthlyClientBill(BillDto input)
        {
            var bill = _billService.GenerateManualMonthlyClientBill(input);

            return Ok(bill);
        }

        [HttpGet("{billId}")]
        public IActionResult Get(int billId)
        {
            var client = _billService.GetById(billId);
            return Ok(client);
        }

        [HttpGet("MonthlyClientBills/{monthlyClientId}")]
        public IActionResult GetMonthlyClientBills(int monthlyClientId)
        {
            var bill = _billService.GetMonthlyClientBills(monthlyClientId);

            return Ok(bill);
        }

        [HttpPost("PayBill")]
        public IActionResult PayBill(BillDto input)
        {
            var bill = _billService.PayBill(input);

            return Ok(bill);
        }

        [HttpPost("GenerateMonthlyBills")]
        public IActionResult GenerateMonthlyBills()
        {
            var amount = _billService.GenerateMonthlyBills();

            return Ok(amount);
        }
    }
}
