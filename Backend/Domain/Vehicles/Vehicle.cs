using Domain.Clients;
using System;
using System.Collections.Generic;

namespace Domain.Vehicles
{
    public class Vehicle
    {
        public int Id { get; set; }

        public string Licenseplate { get; set; }

        public string Model { get; set; }

        public string Brand { get; set; }

        public string Color { get; set; }

        public bool Active { get; set; }

        public int Price { get; set; }

        public int MonthlyClientId { get; set; }
        public MonthlyClient MonthlyClient { get; set; }

        public DateTime StartingDate { get; set; }

        public DateTime EndDate { get; set; }

        public List<MonthlyParkingLog> VehicleParkingLogs { get; set; }

        public Vehicle()
        {
        }

        public Vehicle(string licenseplate, string model, string brand, string color, DateTime startingDate)
        {
            this.Licenseplate = licenseplate;
            this.Model = model;
            this.Brand = brand;
            this.Color = color;
            this.Active = true;
            this.StartingDate = startingDate;
            //this.MonthlyClient = new MonthlyClient();
        }
    }
}
