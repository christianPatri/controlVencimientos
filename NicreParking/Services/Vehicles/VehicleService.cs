using AutoMapper;
using BusinessLogic.Vehicles.Generators;
using BusinessLogic.Vehicles.Updater;
using BusinessLogic.Vehicles.Validators;
using Common.Validations;
using DataAccessInterface.Repositories;
using Domain.Clients;
using Domain.Vehicles;
using Dto.Clients;
using Dto.Vehicles;
using IService.Vehicles;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Vehicles
{
    public class VehicleService : IVehicleService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Client> _clientRepository;
        private readonly IRepository<Vehicle> _vehicleRepository;
        private readonly NullEntityValidator _nullEntityValidator;
        private readonly VehicleCreateValidator _vehicleCreateValidator;
        private readonly VehicleGenerator _vehicleGenerator;
        private readonly VehicleUpdateValidator _vehicleUpdateValidator;
        private readonly VehicleUpdater _vehicleUpdater;

        public VehicleService(
            IMapper mapper,
            IRepository<Client> clientRepository,
            IRepository<Vehicle> vehicleRepository,
            NullEntityValidator nullEntityValidator,
            VehicleCreateValidator vehicleCreateValidator,
            VehicleGenerator vehicleGenerator,
            VehicleUpdateValidator vehicleUpdateValidator,
            VehicleUpdater vehicleUpdater)
        {
            _mapper = mapper;
            _clientRepository = clientRepository;
            _vehicleRepository = vehicleRepository;
            _nullEntityValidator = nullEntityValidator;
            _vehicleCreateValidator = vehicleCreateValidator;
            _vehicleGenerator = vehicleGenerator;
            _vehicleUpdateValidator = vehicleUpdateValidator;
            _vehicleUpdater = vehicleUpdater;
        }

        public IEnumerable<VehicleDto> GetActiveVehiclesBy(int clientId)
        {
            var client = _clientRepository.IncludeAll("Vehicles").FirstOrDefault(v => v.Id == clientId);
            _nullEntityValidator.Validate<Client>(client, "Cliente");
            _nullEntityValidator.Validate<IEnumerable<Vehicle>>(client.Vehicles, "Vehiculos");
                        
            var vehiclesDto = _mapper.Map<List<VehicleDto>>(client.Vehicles.Where(v => v.Active));

            return vehiclesDto;
        }

        public VehicleDto CreateVehicle(VehicleCreateDto vehicleCreate)
        {
            _vehicleCreateValidator.ValidateFields(vehicleCreate);
            _vehicleCreateValidator.ValidateNotExists(vehicleCreate);

            var clients = _clientRepository.List().Where(c => vehicleCreate.ClientIds.Contains(c.Id)).ToList();
            _vehicleCreateValidator.ValidateExistingClients(clients, vehicleCreate);

            var vehicle = _vehicleGenerator.Generate(vehicleCreate, clients);
            var vehicleDto = _mapper.Map<VehicleDto>(vehicle);

            return vehicleDto;
        }

        public VehicleDto UpdateVehicleBasicInfo(VehicleUpdateDto vehicleUpdate)
        {
            var vehicle = _vehicleRepository.List().FirstOrDefault(v => v.Id == vehicleUpdate.Id);
            _nullEntityValidator.Validate<Vehicle>(vehicle, "vehiculo");

            _vehicleUpdateValidator.ValidateFields(vehicleUpdate);

            var vehicleUpdated = _vehicleUpdater.Update(vehicle, vehicleUpdate);

            var vehicleUpdatedDto = _mapper.Map<VehicleDto>(vehicleUpdated);

            return vehicleUpdatedDto;
        }

        public VehicleDto DisableVehicle(VehicleDeleteDto vehicleDelete)
        {
            var vehicle = _vehicleRepository.List().FirstOrDefault(v => v.Id == vehicleDelete.Id);
            _nullEntityValidator.Validate<Vehicle>(vehicle, "vehiculo");

            var vehicleDisabled = _vehicleUpdater.DisableVehicle(vehicle, vehicleDelete);

            return _mapper.Map<VehicleDto>(vehicleDisabled);
        }

        public void DeleteVehicle(int vehicleId)
        {
            var vehicle = _vehicleRepository.List().FirstOrDefault(v => v.Id == vehicleId);
            _nullEntityValidator.Validate<Vehicle>(vehicle, "vehiculo");

            _vehicleRepository.Delete(vehicle);
        }
    }
}
