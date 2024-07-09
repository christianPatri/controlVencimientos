using Dto.Vehicles;
using System;
using System.Collections.Generic;
using System.Text;

namespace IService.Vehicles
{
    public interface IVehicleService
    {
        IEnumerable<VehicleDto> GetActiveVehiclesBy(int clientId);

        VehicleDto CreateVehicle(VehicleCreateDto vehicleCreate);

        VehicleDto UpdateVehicleBasicInfo(VehicleUpdateDto vehicleUpdate);

        void DeleteVehicle(int vehicleId);

        VehicleDto DisableVehicle(VehicleDeleteDto vehicleDelete);
    }
}
