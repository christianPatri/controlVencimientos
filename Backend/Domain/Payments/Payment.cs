using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Payments
{
    public class Payment
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }

        public int Amount { get; set; }

        public DateTime PaymentDate { get; set; }

        public int PayedMonth { get; set; }

        public int PayedYear { get; set; }


        public Payment()
        {
        }

        public Payment(int vehicleId, int amount, DateTime paymentDate, int payedMonth, int payedYear)
        {
            this.VehicleId = vehicleId;
            this.Amount = amount;
            this.PaymentDate = paymentDate;
            this.PayedMonth = payedMonth;
            this.PayedYear = payedYear;
        }
    }
}
