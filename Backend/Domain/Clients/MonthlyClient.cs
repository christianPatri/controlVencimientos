using Domain.Bills;
using Domain.Vehicles;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Clients
{
    public class MonthlyClient
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Lastname { get; set; }

        public string PhoneNumber { get; set; }

        public string SecondaryPhoneNumber { get; set; }

        public string Document { get; set; }

        public string Address { get; set; }

        public IEnumerable<Vehicle> Vehicles { get; set; }

        public DateTime StartingDate { get; set; }

        public DateTime EndingDate { get; set; }

        public bool IsActive { get; set; }

        public List<Bill> Bills { get; set; }

        public MonthlyClient()
        {

        }

        public MonthlyClient(string name, string lastname, string phoneNumber, string secondaryPhoneNumber, string document, DateTime startingDate)
        {
            this.Name = name;
            this.Lastname = lastname;
            this.PhoneNumber = phoneNumber;
            this.SecondaryPhoneNumber = secondaryPhoneNumber;
            this.Document = document;
            this.StartingDate = startingDate;
            this.Vehicles = new List<Vehicle>();
            this.EndingDate = DateTime.MinValue;
            this.IsActive = true;
        }
    }
}
