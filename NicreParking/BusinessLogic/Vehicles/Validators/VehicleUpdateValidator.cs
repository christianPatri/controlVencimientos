using Common.Exceptions;
using DataAccessInterface.Repositories;
using Domain.Vehicles;
using Dto.Vehicles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BusinessLogic.Vehicles.Validators
{
    public class VehicleUpdateValidator
    {
        private readonly IRepository<Vehicle> _vehicleRepository;

        public VehicleUpdateValidator(IRepository<Vehicle> vehicleRepository)
        {
            _vehicleRepository = vehicleRepository;
        }

        public void ValidateFields(VehicleUpdateDto vehicleUpdate)
        {
            if (string.IsNullOrEmpty(vehicleUpdate.LicensePlate)) throw new ValidationException("La matricula del vehiculo no puede ser vacia");
            if (string.IsNullOrEmpty(vehicleUpdate.Model)) throw new ValidationException("El modelo del vehiculo no puede ser vacio");
            if (string.IsNullOrEmpty(vehicleUpdate.Brand)) throw new ValidationException("La marca del vehiculo no puede ser vacia");
            if (string.IsNullOrEmpty(vehicleUpdate.Color)) throw new ValidationException("El color del vehiculo no puede ser vacio");
        }

        public void ValidateNotExists(VehicleUpdateDto vehicleCreate)
        {
            var vehicle = _vehicleRepository.List().FirstOrDefault(v => v.LicensePlate.Equals(vehicleCreate.LicensePlate));

            if (vehicle != null) throw new ValidationException($"Ya existe un vehiculo con matricula: {vehicleCreate.LicensePlate} en el sistema");
        }
    }
}
