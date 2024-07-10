using Dto.Clients;
using Dto.MonthlyClients;
using System.Collections.Generic;

namespace IService.Clients
{
    public interface IMonthlyClientService
    {
        IEnumerable<MonthlyClientDto> GetActiveMonthlyClients();

        MonthlyClientDto GetById(int clientId);

        MonthlyClientDto CreateMonthlyClient(MonthlyClientDto clientCreate);

        MonthlyClientDto UpdateMonthlyClient(MonthlyClientDto clientUpdate);

        MonthlyClientDto DeleteMonthlyClient(MonthlyClientDto clientDelete);

        MonthlyClientDto CheckMonthlyClient(MonthlyClientCheck monthlyClientCheck);
    }
}
