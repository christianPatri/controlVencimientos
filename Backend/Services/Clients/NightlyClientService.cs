using AutoMapper;
using BusinessLogic.HourlyClients;
using Dto.HourlyClients;
using IService.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Clients
{
    public class NightlyClientService : INightlyClientService
    {
        private readonly HourlyClientLogic _hourlyClientLogic;
        private readonly IMapper _mapper;

        public NightlyClientService(
            HourlyClientLogic hourlyClientLogic,
            IMapper mapper)
        {
            this._hourlyClientLogic = hourlyClientLogic;
            this._mapper = mapper;
        }

        //Ingreso de pensio nocturna
        public HourlyClientDto NightlyVehicleEntry(HourlyClientDto input)
        {
            _hourlyClientLogic.ValidateCreateFields(input);
            _hourlyClientLogic.ValidateNotExists(input);

            var nightlyClient = _hourlyClientLogic.CreateNightlyClient(input);
            var nightlyClientDto = _mapper.Map<HourlyClientDto>(nightlyClient);

            return nightlyClientDto;
        }

        //entrega de pension noctura
        public HourlyClientDto NightlyVehicleExit(HourlyClientDto input)
        {
            var hourlyClient = _hourlyClientLogic.GetNightlyClient(input.Licenseplate, input.Ticket);
            _hourlyClientLogic.ValidateHourlyClient(hourlyClient, input);

            var hourlyClientExit = _hourlyClientLogic.ExitNightlyClient(hourlyClient);
            _hourlyClientLogic.UpdateToExitHourlyClient(hourlyClientExit);

            var hourlyClientDto = _mapper.Map<HourlyClientDto>(hourlyClientExit);

            return hourlyClientDto;
        }
    }
}
