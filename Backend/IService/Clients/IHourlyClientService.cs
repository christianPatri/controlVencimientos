using Dto.HourlyClients;

namespace IService.Clients
{
    public interface IHourlyClientService
    {
        HourlyClientDto HourlyVehicleEntry(HourlyClientDto hourlyEntry);

        HourlyClientDto HourlyVehicleExit(HourlyClientDto hourlyExit);
    }
}
