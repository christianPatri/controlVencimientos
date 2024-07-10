using Dto.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Vehicles.MonthlyVehicles
{
    public class MonthlyVehicleDto
    {
        public int Id { get; set; }

        public string Licenseplate { get; set; }

        public string Model { get; set; }

        public string Brand { get; set; }

        public string Color { get; set; }

        public int Price { get; set; }

        public MonthlyClientDto MonthlyClient { get; set; }

        public MonthlyVehicleDto()
        {

        }
    }
}
