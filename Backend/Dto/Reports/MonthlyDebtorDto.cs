using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Reports
{
    public class MonthlyDebtorDto
    {
        public string ClientName {  get; set; } 

        public string ClientDocument { get; set; }

        public int ClientVehicles {  get; set; }    

        public int PendingBills { get; set; }

        public DateTime LastPaymentDate { get; set; }

        public MonthlyDebtorDto()
        {

        }
    }
}