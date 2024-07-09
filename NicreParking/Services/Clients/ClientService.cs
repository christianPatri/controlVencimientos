using AutoMapper;
using BusinessLogic.Clients.Generator;
using BusinessLogic.Clients.Updater;
using BusinessLogic.Clients.Validators;
using Common.Validations;
using DataAccessInterface.Repositories;
using Domain.Clients;
using Dto.Clients;
using IService.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Clients
{
    public class ClientService : IClientService
    {
        private readonly IMapper _mapper;
        private readonly NullEntityValidator _nullEntityValidator;
        private readonly ClientValidator _clientValidator;
        private readonly ClientGenerator _clientGenerator;
        private readonly IRepository<Client> _clientRepository;
        private readonly ClientUpdater _clientUpdater;

        public ClientService(
            IMapper mapper, 
            IRepository<Client> clientRepository,
            NullEntityValidator nullEntityValidator,
            ClientValidator clientValidator,
            ClientGenerator clientGenerator,
            ClientUpdater clientUpdater)
        {
            _mapper = mapper;
            _clientRepository = clientRepository;
            _nullEntityValidator = nullEntityValidator;
            _clientValidator = clientValidator;
            _clientGenerator = clientGenerator;
            _clientUpdater = clientUpdater;
        }

        public ClientDto Add(ClientCreateDto clientCreate)
        {
            _clientValidator.ValidateFields(clientCreate);
            _clientValidator.ValidateNotExists(clientCreate);
           
            var client = _clientGenerator.Generate(clientCreate);
            var clientDto = _mapper.Map<ClientDto>(client);

            return clientDto;
        }

        public IEnumerable<ClientDto> GetActiveClients()
        {
            var clients = _clientRepository.List().Where(c => c.IsActive).ToList();

            var clientsDto = _mapper.Map<IEnumerable<ClientDto>>(clients);

            return clientsDto;
        }

        public ClientDto GetById(int clientId)
        {
            var client = _clientRepository.List().FirstOrDefault(c => c.Id == clientId);
            _nullEntityValidator.ValidateById(client, "Cliente");

            var clientDto = _mapper.Map<ClientDto>(client);

            return clientDto;
        }

        public ClientDto Update(ClientUpdateDto clientUpdate)
        {
            var client = _clientRepository.List().FirstOrDefault(c => c.Id == clientUpdate.Id);
            _nullEntityValidator.ValidateById(client, "Cliente");

            var clientUpdated = _clientUpdater.Update(client, clientUpdate);
            var clientDto = _mapper.Map<ClientDto>(clientUpdated);

            return clientDto;
        }

        public ClientDto Delete(ClientDeleteDto clientDelete)
        {
            var client = _clientRepository.List().FirstOrDefault(c => c.Id == clientDelete.Id);
            _nullEntityValidator.ValidateById(client, "Cliente");

            var clientDeleted = _clientUpdater.Delete(client, clientDelete);
            var clientDto = _mapper.Map<ClientDto>(clientDeleted);

            return clientDto;
        }
    }
}
