using Common.Exceptions;
using Common.Utilities;
using Common.Validations;
using DataAccessInterface.Repositories;
using Domain.Clients;
using Domain.Vehicles;
using Dto.Clients;
using Dto.Vehicles;
using Dto.Vehicles.MonthlyVehicles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Vehicles
{
    public class MonthlyVehicleLogic
    {
        private IRepository<Vehicle> _monthlyVehicleRepository;
        private IRepository<MonthlyParkingLog> _monthlyParkingLogRepository;
        private readonly NullEntityValidator _nullEntityValidator;

        public MonthlyVehicleLogic(
            IRepository<Vehicle> monthlyVehicleRepository,
            NullEntityValidator nullEntityValidator,
            IRepository<MonthlyParkingLog> monthlyParkingLogRepository)
        {
            _monthlyVehicleRepository = monthlyVehicleRepository;
            _nullEntityValidator = nullEntityValidator;
            _monthlyParkingLogRepository = monthlyParkingLogRepository;
        }

        public void ValidateFields(MonthlyVehicleDto monthlyVehicle)
        {
            if (string.IsNullOrEmpty(monthlyVehicle.Brand)) throw new ValidationException("La marca del vehiculo no puede ser vacia");
            if (string.IsNullOrEmpty(monthlyVehicle.Model)) throw new ValidationException("El modleo del vehiculo no puede ser vacio");
            if (string.IsNullOrEmpty(monthlyVehicle.Licenseplate)) throw new ValidationException("La matricula del vehiculo no puede ser vacia");
            if (string.IsNullOrEmpty(monthlyVehicle.Color)) throw new ValidationException("El color del vehiculo no puede ser vacio");
            if (monthlyVehicle.Price <= 0) throw new ValidationException("El precio del vehiculo no puede ser cero");
        }

        public void ValidateFields(List<MonthlyVehicleDto> Vehicles)
        {
            Vehicles.ForEach(v =>
            {
                ValidateFields(v);
                ValidateNotExists(v);
            });
        }

        public void ValidateNotExists(MonthlyVehicleDto vehicleCreateDto)
        {
            var licenseplate = new string(vehicleCreateDto.Licenseplate.Where(c => !char.IsWhiteSpace(c)).ToArray());
            var monthlyVehicle = _monthlyVehicleRepository.List().FirstOrDefault(v => v.Licenseplate.ToUpper().Equals(licenseplate.ToUpper()) && v.Active);

            if (monthlyVehicle != null) throw new ValidationException($"Ya existe un vehiculo mensual registrado con matricula: {vehicleCreateDto.Licenseplate} en el sistema");
        }

        public Vehicle Generate(MonthlyVehicleDto vehicleCreate, MonthlyClient monthlyClient)
        {
            var licenseplate = new string(vehicleCreate.Licenseplate.Where(c => !char.IsWhiteSpace(c)).ToArray());

            Vehicle vehicle = new Vehicle(licenseplate, vehicleCreate.Model, vehicleCreate.Brand, vehicleCreate.Color, DateTime.Now);
            vehicle.Price = vehicleCreate.Price;
            vehicle.MonthlyClient = monthlyClient;
            _monthlyVehicleRepository.AddAndSave(vehicle);

            return vehicle;
        }

        public List<Vehicle> Generate(List<MonthlyVehicleDto> vehiclesCreate, MonthlyClient monthlyClient)
        {
            var vehicles = new List<Vehicle>();

            vehiclesCreate.ForEach(v =>
            {
                var vehicle = Generate(v, monthlyClient);
                vehicles.Add(vehicle);
            });

            return vehicles;
        }

        public Vehicle GetBy(string licenseplate)
        {
            licenseplate = new string(licenseplate.Where(c => !char.IsWhiteSpace(c)).ToArray());
            var vehicle = _monthlyVehicleRepository.List().FirstOrDefault(v => v.Licenseplate.ToUpper() == licenseplate.ToUpper());
            _nullEntityValidator.ValidateById(vehicle, "Vehiculo");

            return vehicle;
        }

        public Vehicle GetBy(int vehicleId)
        {
            var vehicle = _monthlyVehicleRepository.List().FirstOrDefault(v => v.Id == vehicleId);
            _nullEntityValidator.ValidateById(vehicle, "Vehiculo");

            return vehicle;
        }

        public MonthlyParkingLog EntryMonthlyVehicle(Vehicle vehicle)
        {
            return InsertMonthlyParkingLog(vehicle, true);
        }

        public MonthlyParkingLog ExitMonthlyVehicle(Vehicle vehicle)
        {
            return InsertMonthlyParkingLog(vehicle, false);
        }

        public MonthlyParkingLog InsertMonthlyParkingLog(Vehicle vehicle, bool isEntry)
        {
            var monthlyParkingLog = new MonthlyParkingLog()
            {
                Vehicle = vehicle,
                VehicleId = vehicle.Id,
                EntryExitDate = DateTime.Now,
                IsEntry = isEntry
            };

            this._monthlyParkingLogRepository.AddAndSave(monthlyParkingLog);

            return monthlyParkingLog;
        }

        public void ValidateUpdate(Vehicle monthlyVehicle, MonthlyVehicleDto vehicleUpdate)
        {   
            this.ValidateFields(vehicleUpdate);
            if (!monthlyVehicle.Licenseplate.ToUpper().Equals(Utilities.FormatString(vehicleUpdate.Licenseplate).ToUpper()))
            {
                this.ValidateNotExists(vehicleUpdate);
            }
        }

        public Vehicle Update(Vehicle monthlyVehicle, MonthlyVehicleDto vehicleUpdate)
        {
            if (vehicleUpdate.Brand != null) monthlyVehicle.Brand = vehicleUpdate.Brand;
            if (vehicleUpdate.Color != null) monthlyVehicle.Color = vehicleUpdate.Color;
            if (vehicleUpdate.Model != null) monthlyVehicle.Model = vehicleUpdate.Model;
            if (vehicleUpdate.Licenseplate != null) monthlyVehicle.Licenseplate = vehicleUpdate.Licenseplate;
            if (vehicleUpdate.Price > 0) monthlyVehicle.Price = vehicleUpdate.Price;

            _monthlyVehicleRepository.Update(monthlyVehicle);

            return monthlyVehicle;
        }

        public List<Vehicle> GetClientActiveVehicles(int clientId)
        {
            var vehicles = _monthlyVehicleRepository.List().Where(v => v.MonthlyClientId == clientId && v.Active).ToList();

            return vehicles;
        }

        public void DeleteMonthlyVehicle(Vehicle monthlyVehicle)
        {
            monthlyVehicle.Active = false;

            _monthlyVehicleRepository.Update(monthlyVehicle);
        }

        public void UpdateMonthlyVehiclesPrice(string oldValue, string newValue)
        {
            var oldPrice = int.Parse(oldValue);
            var newPrice = int.Parse(newValue);

            var vehicles = _monthlyVehicleRepository.List().Where(v => v.Price == oldPrice && v.Active).ToList();

            vehicles.ForEach(v =>
            {
                v.Price = newPrice;
                _monthlyVehicleRepository.Update(v);
            });
        }
    }
}
