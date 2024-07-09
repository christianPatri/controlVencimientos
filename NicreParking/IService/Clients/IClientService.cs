using Dto.Clients;
using System.Collections.Generic;

namespace IService.Clients
{
    public interface IClientService
    {
        IEnumerable<ClientDto> GetActiveClients();

        ClientDto GetById(int clientId);

        ClientDto Add(ClientCreateDto clientCreate);

        ClientDto Update(ClientUpdateDto clientUpdate);

        ClientDto Delete(ClientDeleteDto clientDelete);
    }
}
