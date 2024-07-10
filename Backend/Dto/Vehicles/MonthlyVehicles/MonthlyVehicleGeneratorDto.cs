using Dto.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Vehicles.MonthlyVehicles
{
    public class MonthlyVehicleGeneratorDto
    {
        public MonthlyClientDto MonthlyClient { get; set; }

        public List<MonthlyVehicleDto> MonthlyVehicles { get; set; }

        public MonthlyVehicleGeneratorDto() { }
    }
}
