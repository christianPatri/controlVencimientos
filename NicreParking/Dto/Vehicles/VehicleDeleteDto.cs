using System;
using System.Collections.Generic;
using System.Text;

namespace Dto.Vehicles
{
    public class VehicleDeleteDto
    {
        public int Id { get; set; }

        public string LicensePlate { get; set; }

        public DateTime EndDate { get; set; }

        public VehicleDeleteDto()
        {
        }
    }
}
