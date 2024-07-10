using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Vehicles.MonthlyVehicles
{
    public class MonthlyParkingLogDto
    {
        public int Id { get; set; }

        public VehicleDto Vehicle { get; set; }

        public DateTime EntryExitDate { get; set; }

        public bool IsEntry { get; set; }

        public MonthlyParkingLogDto() { }
    }
}
