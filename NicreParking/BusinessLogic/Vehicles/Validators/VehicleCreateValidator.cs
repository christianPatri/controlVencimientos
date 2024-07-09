using Common.Exceptions;
using DataAccessInterface.Repositories;
using Domain.Clients;
using Domain.Vehicles;
using Dto.Vehicles;
using System.Collections.Generic;
using System.Linq;

namespace BusinessLogic.Vehicles.Validators
{
    public class VehicleCreateValidator
    {
        private readonly IRepository<Vehicle> _vehicleRepository;

        public VehicleCreateValidator(IRepository<Vehicle> vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public void ValidateFields(VehicleCreateDto vehicleCreate)
        {
            if (string.IsNullOrEmpty(vehicleCreate.LicensePlate)) throw new ValidationException("La matricula del vehiculo no puede ser vacia");
            if (string.IsNullOrEmpty(vehicleCreate.Model)) throw new ValidationException("El modelo del vehiculo no puede ser vacio");
            if (string.IsNullOrEmpty(vehicleCreate.Brand)) throw new ValidationException("La marca del vehiculo no puede ser vacia");
            if (string.IsNullOrEmpty(vehicleCreate.Color)) throw new ValidationException("El color del vehiculo no puede ser vacio");
            if (vehicleCreate.ClientIds == null) throw new ValidationException("El/los duenio/s del vehiculo no puede ser vacio");
        }

        public void ValidateNotExists(VehicleCreateDto vehicleCreate)
        {
            var vehicle = _vehicleRepository.List().FirstOrDefault(v => v.LicensePlate.Equals(vehicleCreate.LicensePlate));

            if (vehicle != null) throw new ValidationException($"Ya existe un vehiculo con matricula: {vehicleCreate.LicensePlate} en el sistema");
        }

        public void ValidateExistingClients(List<Client> clients, VehicleCreateDto vehicleCreate)
        {
            if (vehicleCreate.ClientIds.Count() != clients.Count()) throw new ValidationException("Hay clientes que no estan registrados en el sistema");
        }
    }
}
