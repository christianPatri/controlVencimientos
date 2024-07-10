using Dto.HourlyClients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IService.Clients
{
    public interface INightlyClientService
    {
        HourlyClientDto NightlyVehicleEntry(HourlyClientDto nightlyEntry);

        HourlyClientDto NightlyVehicleExit(HourlyClientDto nightlyExit);
    }
}
