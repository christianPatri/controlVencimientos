using AutoMapper;
using BusinessLogic.Bills;
using BusinessLogic.MonthlyClients;
using Domain.Bills;
using Domain.Clients;
using Dto.Bills;
using Dto.HourlyClients;
using IService.Bills;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Bills
{
    public class BillService : IBillService
    {
        private BillLogic _billLogic;
        private MonthlyClientLogic _monthlyClientLogic;
        private IMapper _mapper;

        public BillService(BillLogic billLogic, MonthlyClientLogic monthlyClientLogic, IMapper mapper)
        {
            _billLogic = billLogic;
            _monthlyClientLogic = monthlyClientLogic;
            _mapper = mapper;
        }

        public BillDto GenerateNewMonthlyClientBill(BillCreateDto newMonthlyClient)
        {   
            var monthlyClient = _monthlyClientLogic.GetById(newMonthlyClient.MonthlyClientId);
            _monthlyClientLogic.ValidateIsActiveClient(monthlyClient);

            var bill = _billLogic.GenerateNewMonthlyClientBill(monthlyClient);
            monthlyClient.Bills.Add(bill);
            _monthlyClientLogic.AddBillToClient(monthlyClient);

            var billDto = _mapper.Map<BillDto>(bill);

            return billDto;
        }

        public int GenerateMonthlyBills()
        {
            var activeMonthlyClients = _monthlyClientLogic.GetActiveClientsForGenerateBills();

            var billsAmount = _billLogic.GenerateMonthlyBills(activeMonthlyClients);
            _monthlyClientLogic.AddBillToClient(activeMonthlyClients);

            return billsAmount;
        }

        public BillDto GenerateManualMonthlyClientBill(BillDto billCreate)
        {
            var monthlyClient = _monthlyClientLogic.GetById(billCreate.MonthlyClientId);
            _monthlyClientLogic.ValidateIsActiveClient(monthlyClient);

            var bill = _billLogic.GenerateManualMonthlyClientBill(monthlyClient, billCreate);
            var billDto = _mapper.Map<BillDto>(bill);

            return billDto;
        }

        public BillDto GetById(int billNumber)
        {
            var bill = _billLogic.GetById(billNumber);

            var billDto = _mapper.Map<BillDto>(bill);
            return billDto;
        }

        public List<BillDto> GetMonthlyClientBills(int clientId)
        {
            var monthlyClient = _monthlyClientLogic.GetById(clientId);
            _monthlyClientLogic.ValidateIsActiveClient(monthlyClient);

            var bills = _billLogic.GetMonthlyClientBills(monthlyClient.Id);
            var billsDto = _mapper.Map<List<BillDto>>(bills);

            return billsDto;
        }

        public BillDto PayBill(BillDto bill)
        {
            //1- buscar la bill y validarla.
            var billToPay = _billLogic.GetById(bill.BillNumber);

            billToPay = _billLogic.PayBill(billToPay);

            var billDto = _mapper.Map<BillDto>(billToPay);

            return billDto;
        }
    }
}
