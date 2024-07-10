using Dto.Clients;
using System;
using System.Collections.Generic;
using System.Text;

namespace Dto.Vehicles
{
    public class VehicleDto
    {
        public int Id { get; set; }

        public string Licenseplate { get; set; }

        public string Model { get; set; }

        public string Brand { get; set; }

        public string Color { get; set; }

        public int Price { get; set; }

        public VehicleDto()
        {

        }
    }
}
