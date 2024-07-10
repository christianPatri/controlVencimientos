using Domain.Clients;
using Domain.Vehicles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Bills
{
    public class Bill
    {
        public int Id { get; set; }

        public int BillNumber { get; set; }

        public bool IsActive { get; set; }

        public int TotalAmount { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime PaymentDate { get; set; }

        //public List<Vehicle> Vehicles { get; set;}

        public int MonthlyClientId { get; set; }
        public MonthlyClient MonthlyClient { get; set; }

        public int Year { get; set; }

        public int Month { get; set; }

        public string Description { get; set; }


        public Bill() { }
    }
}
