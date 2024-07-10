using DataAccessInterface.Repositories;
using Domain.Vehicles;
using Dto.Vehicles;

namespace BusinessLogic.Vehicles.Updater
{
    public class VehicleUpdater
    {
        private readonly IRepository<Vehicle> _vehicleRepository;

        public VehicleUpdater(IRepository<Vehicle> vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public Vehicle Update(Vehicle vehicle, VehicleUpdateDto vehicleUpdate)
        {
            vehicle.Licenseplate = vehicleUpdate.Licenseplate;
            vehicle.Model = vehicleUpdate.Model;
            vehicle.Brand = vehicleUpdate.Brand;
            vehicle.Color = vehicleUpdate.Color;

            _vehicleRepository.Update(vehicle);

            return vehicle;
        }

        public Vehicle DisableVehicle(Vehicle vehicle, VehicleDeleteDto vehicleDelete)
        {
            vehicle.Active = false;
            vehicle.EndDate = vehicleDelete.EndDate;
            _vehicleRepository.Update(vehicle);

            return vehicle;
        }
    }
}
