using Dto.Clients;
using Dto.Vehicles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Bills
{
    public class BillDto
    {
        public int BillNumber { get; set; }
        public bool IsActive { get; set; }

        public int TotalAmount { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime PaymentDate { get; set; }

        //public List<VehicleDto> Vehicles { get; set; }

        public int MonthlyClientId { get; set; }
        public MonthlyClientDto MonthlyClient { get; set; }
        public int Year { get; set; }

        public int Month { get; set; }

        public string Description { get; set; }

        public BillDto() { }
    }
}
