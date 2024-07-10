using AutoMapper;
using BusinessLogic.MonthlyClients;
using BusinessLogic.Vehicles;
using Domain.Vehicles;
using Dto.Clients;
using Dto.Vehicles;
using Dto.Vehicles.MonthlyVehicles;
using IService.Vehicles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Vehicles
{
    public class MonthlyVehicleService : IMonthlyVehicleService
    {
        private readonly IMapper _mapper;
        private readonly MonthlyVehicleLogic _monthlyVehicleLogic;
        private readonly MonthlyClientLogic _monthlyClientLogic;
        private readonly MonthlyParkingLogLogic _monthlyParkingLogLogic;

        public MonthlyVehicleService(
             IMapper mapper,
             MonthlyVehicleLogic monthlyVehicleLogic,
             MonthlyClientLogic monthlyClientLogic,
             MonthlyParkingLogLogic monthlyParkingLogLogic)
        {
            _mapper = mapper;
            _monthlyVehicleLogic = monthlyVehicleLogic;
            _monthlyClientLogic = monthlyClientLogic;
            _monthlyParkingLogLogic = monthlyParkingLogLogic;
        }

        public List<VehicleDto> GenerateMonthlyVehicles(MonthlyVehicleGeneratorDto monthlyVehicleGenerator)
        {
            //1- Tengo el monthly client  --> Lo busco en BD y lo obtengo
            _monthlyClientLogic.ValidateFields(monthlyVehicleGenerator.MonthlyClient);
            var monthlyClient = _monthlyClientLogic.GetById(monthlyVehicleGenerator.MonthlyClient.Id);

            //2 -> Valido los vehiculos que no existan
            _monthlyVehicleLogic.ValidateFields(monthlyVehicleGenerator.MonthlyVehicles);

            //3 -> Genero los vehiculos en base de datos
            var vehicles = _monthlyVehicleLogic.Generate(monthlyVehicleGenerator.MonthlyVehicles, monthlyClient);

            //4 -> Linkeo los vehiculos al cliente
            monthlyClient.Vehicles = vehicles;
            _monthlyClientLogic.LinkVehiclesToClient(monthlyClient);

            //5 retorno
            var returnDto = _mapper.Map<List<VehicleDto>>(vehicles);

            return returnDto;
        }

        public VehicleDto GenerateMonthlyVehicle(MonthlyVehicleGeneratorDto monthlyVehicleGenerator)
        {
            //1- Tengo el monthly client  --> Lo busco en BD y lo obtengo
            _monthlyClientLogic.ValidateFields(monthlyVehicleGenerator.MonthlyClient);
            var monthlyClient = _monthlyClientLogic.GetBy(monthlyVehicleGenerator.MonthlyClient.Document);

            //2 -> Valido los vehiculos que no existan
            _monthlyVehicleLogic.ValidateFields(monthlyVehicleGenerator.MonthlyVehicles);

            //3 -> Genero los vehiculos en base de datos -> viene uno solo
            var vehicles = _monthlyVehicleLogic.Generate(monthlyVehicleGenerator.MonthlyVehicles, monthlyClient);

            //4 -> Linkeo los vehiculos al cliente
            monthlyClient.Vehicles.ToList().Add(vehicles.FirstOrDefault());
            _monthlyClientLogic.LinkVehiclesToClient(monthlyClient);

            //5 retorno
            var returnDto = _mapper.Map<VehicleDto>(vehicles.FirstOrDefault());

            return returnDto;
        }

        public VehicleDto UpdateMonthlyVehicle(MonthlyVehicleDto monthlyVehicle)
        {
            var vehicle = _monthlyVehicleLogic.GetBy(monthlyVehicle.Id);
            _monthlyVehicleLogic.ValidateUpdate(vehicle, monthlyVehicle);

            _monthlyVehicleLogic.Update(vehicle, monthlyVehicle);

            return _mapper.Map<VehicleDto>(vehicle);
        }

        public MonthlyParkingLogDto EntryMonthlyVehicle(VehicleDto input)
        {
            var vehicle = _monthlyVehicleLogic.GetBy(input.Licenseplate);
            var parkingLog = _monthlyVehicleLogic.EntryMonthlyVehicle(vehicle);

            return _mapper.Map<MonthlyParkingLogDto>(parkingLog);
        }

        public MonthlyParkingLogDto ExitMonthlyVehicle(VehicleDto input)
        {
            var vehicle = _monthlyVehicleLogic.GetBy(input.Licenseplate);
            var parkingLog = _monthlyVehicleLogic.ExitMonthlyVehicle(vehicle);

            return _mapper.Map<MonthlyParkingLogDto>(parkingLog);
        }

        public List<MonthlyParkingLogDto> GetMonthlyVehicleMovements(MonthlyVehicleMovementsDto input)
        {
            //por Default: traigo los ultimos 10 ?

            //1- busco el vehiculo que exista !

            var vehicle = _monthlyVehicleLogic.GetBy(input.MonthlyVehicleId);

            //2 - busco todos los movimientos ? o ya filtrados por el iqueryable ?
            // ordenados de forma ascendente (de hoy para atras)

            var movements = _monthlyParkingLogLogic.GetMonthlyVehicleMovements(input.MonthlyVehicleId, input.From, input.To);
            if (movements.Count > 0) movements = movements.OrderByDescending(m => m.EntryExitDate).ToList();

            if (input.From == DateTime.MinValue && input.To == DateTime.MinValue)
            {
                //movements = movements.Take(10).ToList();
            }

            //retorno valores mapeados

            return _mapper.Map<List<MonthlyParkingLogDto>>(movements);
        }

        public VehicleDto DeleteMonthlyVehicle(VehicleDto vehicle)
        {
            var vehicleToDelete = _monthlyVehicleLogic.GetBy(vehicle.Id);
            _monthlyVehicleLogic.DeleteMonthlyVehicle(vehicleToDelete);

            return vehicle;
        }
    }
}
