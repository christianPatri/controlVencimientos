using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Vehicles.MonthlyVehicles
{
    public class MonthlyVehicleMovementsDto
    {
        public int MonthlyClientId { get; set; }
        public int MonthlyVehicleId { get; set; }

        //Filters
        public DateTime From { get; set; }
        public DateTime To { get; set; }

        //public List<MonthlyParkingLogDto> Movements { get; set; }


        public MonthlyVehicleMovementsDto() { }
    }
}
