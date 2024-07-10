using AutoMapper;
using BusinessLogic.Bills;
using BusinessLogic.MonthlyClients;
using BusinessLogic.Vehicles;
using Domain.Clients;
using Dto.Clients;
using Dto.MonthlyClients;
using IService.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Clients
{
    public class MonthlyClientService : IMonthlyClientService
    {
        private readonly IMapper _mapper;
        private readonly MonthlyClientLogic _monthlyClientLogic;
        private readonly MonthlyVehicleLogic _monthlyVehicleLogic;
        private readonly BillLogic _billLogic;

        public MonthlyClientService(
            IMapper mapper,
            MonthlyClientLogic monthlyClientLogic,
            MonthlyVehicleLogic monthlyVehicleLogic,
            BillLogic billLogic)
        {
            _mapper = mapper;
            _monthlyClientLogic = monthlyClientLogic;
            _monthlyVehicleLogic = monthlyVehicleLogic;
            _billLogic = billLogic;
        }

        public MonthlyClientDto CreateMonthlyClient(MonthlyClientDto clientCreate)
        {
            _monthlyClientLogic.ValidateFields(clientCreate);
            _monthlyClientLogic.ValidateNotExists(clientCreate);
           
            var client = _monthlyClientLogic.Generate(clientCreate);
            var clientDto = _mapper.Map<MonthlyClientDto>(client);

            return clientDto;
        }

        public IEnumerable<MonthlyClientDto> GetActiveMonthlyClients()
        {
            var clients = _monthlyClientLogic.GetActiveClients();
            var clientsDto = _mapper.Map<IEnumerable<MonthlyClientDto>>(clients);

            return clientsDto;
        }

        public MonthlyClientDto GetById(int clientId)
        {
            var client = _monthlyClientLogic.GetById(clientId);

            var clientDto = _mapper.Map<MonthlyClientDto>(client);

            return clientDto;
        }

        public MonthlyClientDto UpdateMonthlyClient(MonthlyClientDto clientUpdate)
        {
            //Esta mal, si nodifico el documento va a actualizar a otro. Tengo que buscar por ID primero.
            var client = _monthlyClientLogic.GetById(clientUpdate.Id);
            _monthlyClientLogic.ValidateUpdate(clientUpdate, client);

            _monthlyClientLogic.Update(client, clientUpdate);   
            var clientDto = _mapper.Map<MonthlyClientDto>(clientUpdate);

            return clientDto;
        }

        public MonthlyClientDto DeleteMonthlyClient(MonthlyClientDto clientDelete)
        {
            var client = _monthlyClientLogic.GetById(clientDelete.Id);

            //1- elimino los vehiculos del cliente
            client.Vehicles.ToList().ForEach(v => _monthlyVehicleLogic.DeleteMonthlyVehicle(v));

            //2- Elimino las facturas
            _billLogic.CancelBills(client.Id);

            //3- Elimino el cliente
            var clientDeleted =_monthlyClientLogic.Delete(client, clientDelete);

            var clientDto = _mapper.Map<MonthlyClientDto>(clientDeleted);

            return clientDto;
        }

        public MonthlyClientDto CheckMonthlyClient(MonthlyClientCheck monthlyClientCheck)
        {
            var client = new MonthlyClient();

            if(!string.IsNullOrEmpty(monthlyClientCheck.Document))
            {
                client = _monthlyClientLogic.GetBy(monthlyClientCheck.Document);
                
            }
            else
            {
                var vehicle = _monthlyVehicleLogic.GetBy(monthlyClientCheck.Licenseplate);
                client = _monthlyClientLogic.GetById(vehicle.MonthlyClientId);
            }

            var clientDto = _mapper.Map<MonthlyClientDto>(client);
            return clientDto;
        }
    }
}
