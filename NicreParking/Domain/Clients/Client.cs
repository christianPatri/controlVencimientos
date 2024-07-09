using Domain.Vehicles;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Clients
{
    public class Client
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string PhoneNumber { get; set; }

        public string Ci { get; set; }

        public IEnumerable<Vehicle> Vehicles { get; set; }

        public DateTime StartingDate { get; set; }

        public DateTime EndingDate { get; set; }

        public bool IsActive { get; set; }

        public Client()
        {

        }

        public Client(string name, string surname, string phoneNumber, string ci, DateTime startingDate)
        {
            this.Name = name;
            this.Surname = surname;
            this.PhoneNumber = phoneNumber;
            this.Ci = ci;
            this.StartingDate = startingDate;
            this.Vehicles = new List<Vehicle>();
            this.EndingDate = DateTime.MinValue;
            this.IsActive = true;
        }
    }
}
