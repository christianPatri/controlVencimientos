using Dto.Clients;
using System;
using System.Collections.Generic;

namespace Dto.Vehicles
{
    public class VehicleCreateDto
    {
        public string Licenseplate { get; set; }

        public string Model { get; set; }

        public string Brand { get; set; }

        public string Color { get; set; }

        public int ClientId { get; set; }

        public DateTime StartingDate { get; set; }

        public VehicleCreateDto()
        {
        }
    }
}
