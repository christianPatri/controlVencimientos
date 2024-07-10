using Common.Utilities;
using Common.Validations;
using DataAccessInterface.Repositories;
using Domain.Bills;
using Domain.Clients;
using Domain.Vehicles;
using Dto.Bills;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Bills
{
    public class BillLogic
    {
        private readonly IRepository<Bill> _billRepository;
        private readonly IRepository<BillNumber> _billNumberRepository;
        private readonly NullEntityValidator _nullEntityValidator;

        public BillLogic(IRepository<Bill> billRepository,
            IRepository<BillNumber> billNumberRepository,
            NullEntityValidator nullEntityValidator) 
        {
            _billRepository = billRepository;
            _billNumberRepository = billNumberRepository;
            _nullEntityValidator = nullEntityValidator;
        }


        public Bill GenerateNewMonthlyClientBill(MonthlyClient monthlyClient)
        {
            var bill = CreateBill(monthlyClient);
            _billRepository.AddAndSave(bill);

            return bill;
        }

        public Bill CreateBill(MonthlyClient monthlyClient)
        {
            var bill = new Bill();

            bill.BillNumber = GetLastBillNumber();
            bill.MonthlyClient = monthlyClient;
            bill.MonthlyClientId = monthlyClient.Id;
            bill.IssueDate = DateTime.Now;
            monthlyClient.Vehicles.ToList().ForEach(v => bill.TotalAmount += v.Price);
            bill.IsActive = true;
            var month = Utilities.GetMonthFromNumber(DateTime.Now.Month);
            bill.Description = "Factura del mes de " + month + " " + DateTime.Now.Year.ToString();
            bill.Month = DateTime.Now.Month;
            bill.Year = DateTime.Now.Year;

            return bill;
        }

        public Bill GenerateManualMonthlyClientBill(MonthlyClient monthlyClient, BillDto billToCreate)
        {
            var bill = new Bill();

            bill.BillNumber = GetLastBillNumber();
            bill.MonthlyClientId = monthlyClient.Id;
            bill.MonthlyClient = monthlyClient;
            bill.IssueDate = DateTime.Now;
            bill.TotalAmount = billToCreate.TotalAmount;
            bill.IsActive = true;
            if (!string.IsNullOrEmpty(billToCreate.Description))
            {
                bill.Description = billToCreate.Description;
            }
            else
            {
                var month = Utilities.GetMonthFromNumber(billToCreate.Month);
                bill.Description = "Factura del mes de " + month + " " + billToCreate.Year.ToString();
            }
            
            bill.Month = billToCreate.Month;
            bill.Year = billToCreate.Year;

            _billRepository.AddAndSave(bill);

            return bill;
        }

        public int GenerateMonthlyBills(List<MonthlyClient> monthlyClients)
        {
            var count = 0;

            monthlyClients.ForEach(mc =>
            {
                //1- Valido que no exista ya la factura
                var exists = MonthlyBillAlreadyExists(mc);

                if (!exists)
                {
                    //2- genero la factura del mes y se la agrego al cliente
                    var bill = CreateBill(mc);
                    mc.Bills.Add(bill);
                    count++;
                }
            });

            return count;
        }

        public bool MonthlyBillAlreadyExists(MonthlyClient monthlyClient)
        {
            var exists = false;
            var bills = monthlyClient.Bills;

            if(bills != null)
            {
                exists = bills.Any(b=> b.Year == DateTime.Now.Year && b.Month == DateTime.Now.Month);   
            }

            return exists;
        }

        public int GetLastBillNumber()
        {
            var isFirstBill = false;
            var bill = _billNumberRepository.List().FirstOrDefault();

            if (bill == null)
            {
                bill = new BillNumber();
                isFirstBill = true;
            }

            bill.LastBillNumber++;

            if (isFirstBill)
            {
                _billNumberRepository.AddAndSave(bill);
            }
            else
            {
                _billNumberRepository.Update(bill);
            }

            return bill.LastBillNumber;
        }

        public Bill GetById(int billNumber)
        {
            var bill = _billRepository.List().FirstOrDefault(b => b.BillNumber == billNumber);
            _nullEntityValidator.ValidateById(bill, "Factura");

            return bill;
        }

        public List<Bill> GetMonthlyClientBills(int monthlyClientId)
        {
            var bills = _billRepository.List().Where(b => b.MonthlyClientId == monthlyClientId).ToList();
            
            bills = bills.OrderByDescending(b => b.Year).ThenByDescending(b => b.Month).ToList();

            return bills;
        }

        public Bill PayBill(Bill bill)
        {
            bill.IsActive = false;
            bill.PaymentDate = DateTime.Now;

            _billRepository.Update(bill);

            return bill;
        }

        public List<Bill> GetPayedBills(DateTime from, DateTime to)
        {
            var bills = _billRepository.List().Where(b => !b.IsActive && b.PaymentDate >= from && b.PaymentDate <= to);

            return bills.ToList();
        }

        public void CancelBills(int monthlyClientId)
        {
            var bills = GetMonthlyClientBills(monthlyClientId).Where(b => b.IsActive).ToList();

            bills.ForEach(b =>
            {
                b.IsActive = false;
                _billRepository.Update(b);
            });
        }
    }
}
