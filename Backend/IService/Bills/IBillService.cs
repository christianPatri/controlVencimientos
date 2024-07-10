using Dto.Bills;
using Dto.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IService.Bills
{
    public interface IBillService
    {
        BillDto GenerateNewMonthlyClientBill(BillCreateDto newMonthlyClient);
        int GenerateMonthlyBills();

        BillDto GenerateManualMonthlyClientBill(BillDto billCreate);

        BillDto GetById(int billNumber);

        List<BillDto> GetMonthlyClientBills(int clientId);

        BillDto PayBill(BillDto bill);
    }
}
