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
            if (string.IsNullOrEmpty(vehicleCreate.Licenseplate)) throw new ValidationException("La matricula del vehiculo no puede ser vacia");
            if (string.IsNullOrEmpty(vehicleCreate.Model)) throw new ValidationException("El modelo del vehiculo no puede ser vacio");
            if (string.IsNullOrEmpty(vehicleCreate.Brand)) throw new ValidationException("La marca del vehiculo no puede ser vacia");
            if (string.IsNullOrEmpty(vehicleCreate.Color)) throw new ValidationException("El color del vehiculo no puede ser vacio");
            if (vehicleCreate.ClientId < 0) throw new ValidationException("El duenio del vehiculo no puede ser vacio");
        }

        public void ValidateNotExists(VehicleCreateDto vehicleCreate)
        {
            var vehicle = _vehicleRepository.List().FirstOrDefault(v => v.Licenseplate.Equals(vehicleCreate.Licenseplate));

            if (vehicle != null) throw new ValidationException($"Ya existe un vehiculo con matricula: {vehicleCreate.Licenseplate} en el sistema");
        }

        public void ValidateExistingClient(MonthlyClient client, VehicleCreateDto vehicleCreate)
        {
            if (client == null) throw new ValidationException("El cliente no esta registrado en el sistema");
        }
    }
}
