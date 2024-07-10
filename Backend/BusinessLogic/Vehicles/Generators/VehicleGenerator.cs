using DataAccessInterface.Repositories;
using Domain.Clients;
using Domain.Vehicles;
using Dto.Vehicles;
using System;
using System.Collections.Generic;
using System.Text;

namespace BusinessLogic.Vehicles.Generators
{
    public class VehicleGenerator
    {
        private IRepository<Vehicle> _vehicleRepository;

        public VehicleGenerator(IRepository<Vehicle> vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public Vehicle Generate(VehicleCreateDto vehicleCreate, MonthlyClient client)
        {
            Vehicle vehicle = new Vehicle(vehicleCreate.Licenseplate, vehicleCreate.Model, vehicleCreate.Brand, vehicleCreate.Color, vehicleCreate.StartingDate);
            vehicle.MonthlyClient = client;

            _vehicleRepository.AddAndSave(vehicle);

            return vehicle;
        }
    }
}
