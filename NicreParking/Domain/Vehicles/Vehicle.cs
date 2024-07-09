using Domain.Clients;
using System;
using System.Collections.Generic;

namespace Domain.Vehicles
{
    public class Vehicle
    {
        public int Id { get; set; }

        public string LicensePlate { get; set; }

        public string Model { get; set; }

        public string Brand { get; set; }

        public string Color { get; set; }

        public bool Active { get; set; }

        public IEnumerable<Client> Clients { get; set; }

        public DateTime StartingDate { get; set; }

        public DateTime EndDate { get; set; }

        public Vehicle()
        {
        }

        public Vehicle(string licensePlate, string model, string brand, string color, DateTime startingDate)
        {
            this.LicensePlate = licensePlate;
            this.Model = model;
            this.Brand = brand;
            this.Color = color;
            this.Active = true;
            this.StartingDate = startingDate;
            this.Clients = new List<Client>();
        }
    }
}
