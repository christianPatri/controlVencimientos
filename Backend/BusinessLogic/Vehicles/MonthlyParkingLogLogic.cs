using DataAccessInterface.Repositories;
using Domain.Vehicles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Vehicles
{
    public class MonthlyParkingLogLogic
    {
        private IRepository<MonthlyParkingLog> _monthlyParkingLogRepository;

        public MonthlyParkingLogLogic(IRepository<MonthlyParkingLog> monthlyParkingLogRepository)
        {   
            _monthlyParkingLogRepository = monthlyParkingLogRepository;
        }


        public List<MonthlyParkingLog> GetMonthlyVehicleMovements(int monthlyVehicleId, DateTime from, DateTime to)
        {
            var movements = _monthlyParkingLogRepository.List().Where(pl => pl.VehicleId == monthlyVehicleId);

            if (from > DateTime.MinValue) movements = FilterByFromDate(from, movements);
            if (to > DateTime.MinValue) movements = FilterByToDate(to, movements);

            return movements.ToList();
        }

        public IQueryable<MonthlyParkingLog> FilterByFromDate(DateTime from, IQueryable<MonthlyParkingLog> movements)
        {
            movements = movements.Where(pl => pl.EntryExitDate >= from);
            return movements;
        }

        public IQueryable<MonthlyParkingLog> FilterByToDate(DateTime to, IQueryable<MonthlyParkingLog> movements)
        {
            movements = movements.Where(pl => pl.EntryExitDate <= to);
            return movements;
        }
    }
}
