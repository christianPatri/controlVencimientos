using DataAccessInterface.Repositories;
using Domain.Clients;
using Dto.Clients;

namespace BusinessLogic.Clients.Generator
{
    public class ClientGenerator
    {
        private IRepository<Client> _clientRepository;
      
        public ClientGenerator(IRepository<Client> clientRepository)
        {
            _clientRepository = clientRepository;
        }

        public Client Generate(ClientCreateDto clientCreate)
        {
            Client client = new Client(clientCreate.Name, clientCreate.Surname, clientCreate.PhoneNumber, clientCreate.Ci, clientCreate.StartingDate);
            _clientRepository.AddAndSave(client);

            return client;
        }
    }
}
