using DataAccessInterface.Repositories;
using Domain.Clients;
using Dto.Clients;

namespace BusinessLogic.Clients.Updater
{
    public class ClientUpdater
    {
        private readonly IRepository<Client> _clientRepository;

        public ClientUpdater(IRepository<Client> clientRepository)
        {
            _clientRepository = clientRepository;   
        }

        public Client Update(Client client, ClientUpdateDto clientUpdate)
        {

            if (clientUpdate.Name != null) client.Name = clientUpdate.Name;
            if (clientUpdate.Surname != null) client.Surname = clientUpdate.Surname;
            if (clientUpdate.PhoneNumber != null) client.PhoneNumber = clientUpdate.PhoneNumber;
            if (clientUpdate.Ci != null) client.Ci = clientUpdate.Ci;

            _clientRepository.Update(client);

            return client;
        }

        public Client Delete(Client client, ClientDeleteDto clientDelete)
        {
            client.EndingDate = clientDelete.EndDate;
            client.IsActive = false;
            _clientRepository.Update(client);

            return client;
        }
    }
}
