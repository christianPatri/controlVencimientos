using System;

namespace Domain.Vehicles
{
    public class MonthlyParkingLog
    {
        public int Id { get; set; }

        public int VehicleId { get; set; }

        public Vehicle Vehicle { get; set; }

        public DateTime EntryExitDate { get; set; }

        public bool IsEntry { get; set; }

        public MonthlyParkingLog() { }
    }
}
