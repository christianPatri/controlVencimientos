using Dto.HourlyClients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Reports
{
    public class MonthlyClientReportDto
    {
        public List<MonthlyParkingReportPaymentDto> Payments { get; set; }

        public DateTime From { get; set; }
        public DateTime To { get; set; }

        public int TotalAmount { get; set; }

        public int TotalPayments { get; set; }


        public MonthlyClientReportDto() { }
    }
}
