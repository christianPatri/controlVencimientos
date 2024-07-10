using Dto.Vehicles;
using Dto.Vehicles.MonthlyVehicles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IService.Vehicles
{
    public interface IMonthlyVehicleService
    {

        List<VehicleDto> GenerateMonthlyVehicles(MonthlyVehicleGeneratorDto monthlyVehicleGenerator);

        VehicleDto GenerateMonthlyVehicle(MonthlyVehicleGeneratorDto monthlyVehicleGenerator);

        VehicleDto UpdateMonthlyVehicle(MonthlyVehicleDto monthlyVehicle);

        MonthlyParkingLogDto EntryMonthlyVehicle(VehicleDto input);

        MonthlyParkingLogDto ExitMonthlyVehicle(VehicleDto input);

        List<MonthlyParkingLogDto> GetMonthlyVehicleMovements(MonthlyVehicleMovementsDto input);

        VehicleDto DeleteMonthlyVehicle(VehicleDto vehicle);
    }
}
