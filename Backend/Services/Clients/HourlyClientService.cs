using AutoMapper;
using BusinessLogic.HourlyClients;
using BusinessLogic.Users;
using Dto.HourlyClients;
using Dto.Users;
using IService.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Clients
{
    public class HourlyClientService : IHourlyClientService
    {
        private readonly HourlyClientLogic _hourlyClientLogic;
        private readonly IMapper _mapper;

        public HourlyClientService(
            HourlyClientLogic hourlyClientLogic,
            IMapper mapper)
        {
            this._hourlyClientLogic = hourlyClientLogic;
            this._mapper = mapper;
        }

        //Ingreso de vehiculo por hora
        public HourlyClientDto HourlyVehicleEntry(HourlyClientDto input)
        {
            _hourlyClientLogic.ValidateCreateFields(input);
            _hourlyClientLogic.ValidateNotExists(input);

            var hourlyClient = _hourlyClientLogic.CreateHourlyClient(input);
            var hourlyClientDto = _mapper.Map<HourlyClientDto>(hourlyClient);

            return hourlyClientDto;
        }

        //Entrega de vehiculo por hora
        public HourlyClientDto HourlyVehicleExit(HourlyClientDto input)
        {
            var hourlyClient = _hourlyClientLogic.GetHourlyClient(input.Licenseplate, input.Ticket);
            _hourlyClientLogic.ValidateHourlyClient(hourlyClient, input);

            var hourlyClientExit = _hourlyClientLogic.ExitHourlyClient(hourlyClient);
            _hourlyClientLogic.UpdateToExitHourlyClient(hourlyClientExit);

            var hourlyClientDto = _mapper.Map<HourlyClientDto>(hourlyClientExit);

            return hourlyClientDto;
        }
    }
}
