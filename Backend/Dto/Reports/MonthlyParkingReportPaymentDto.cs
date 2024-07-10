using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Reports
{
    public class MonthlyParkingReportPaymentDto
    {
        public string ClientName { get; set; }

        public string ClientDocument { get; set; }

        public int ClientVehicles { get; set; }

        public int BillNumber { get; set; }

        public int BillAmount { get; set; }

        public string BillDescription { get; set; }

        public DateTime PaymentDate { get; set; }

        public MonthlyParkingReportPaymentDto() { }
    }
}
