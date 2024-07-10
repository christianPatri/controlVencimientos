using Domain.Bills;
using Domain.Clients;
using Dto.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Reports
{
    public class ReportLogic
    {
        public ReportLogic()
        {

        }

        public List<MonthlyDebtorDto> GenerateMonthlyClientDebtorsReport(List<MonthlyClient> monthlyClients)
        {
            var report = new List<MonthlyDebtorDto>();

            monthlyClients.ForEach(client =>
            {
                var monthlyDebtor = new MonthlyDebtorDto();

                monthlyDebtor.ClientName = client.Name + " " + client.Lastname;
                monthlyDebtor.ClientDocument = client.Document;
                monthlyDebtor.ClientVehicles = client.Vehicles.Count();
                monthlyDebtor.PendingBills = client.Bills.Where(b => b.IsActive).Count();
                var bills = client.Bills.OrderByDescending(b => b.Year).ThenByDescending(b => b.Month);
                var lastPaymentBill = bills.FirstOrDefault(b => !b.IsActive);
                monthlyDebtor.LastPaymentDate = lastPaymentBill != null ? lastPaymentBill.PaymentDate : DateTime.MinValue;

                report.Add(monthlyDebtor);
            });

            return report.OrderByDescending(d => d.PendingBills).ToList();
        }

        public NightlyParkingReportDto GenerateNightlyParkingReport(List<HourlyClient> movements)
        {
            var report = new NightlyParkingReportDto();
            //report.Movements = movements;
            report.TotalMovements = movements.Count();
            movements.ForEach(m => report.TotalAmount += m.TotalAmount);

            return report;
        }

        public NightlyParkingReportDto GenerateHourlyParkingReport(List<HourlyClient> movements)
        {
            var report = new NightlyParkingReportDto();
            report.TotalMovements = movements.Count();
            movements.ForEach(m => report.TotalAmount += m.TotalAmount);

            return report;
        }

        public MonthlyClientReportDto GenerateMonthlyParkingReport(List<Bill> payedBills, List<MonthlyClient> monthlyClients)
        {
            var report = new MonthlyClientReportDto();
            var reportPayments = new List<MonthlyParkingReportPaymentDto>();
            var totalAmount = 0;

            payedBills.ForEach(bill =>
            {
                var item = new MonthlyParkingReportPaymentDto();
                item.BillDescription = bill.Description;
                item.PaymentDate = bill.PaymentDate;
                item.BillNumber = bill.BillNumber;
                item.BillAmount = bill.TotalAmount;

                var client = monthlyClients.First(c => c.Id == bill.MonthlyClientId);
                item.ClientName = client.Name + " " + client.Lastname;
                item.ClientDocument = client.Document;
                item.ClientVehicles = client.Vehicles.Count();

                reportPayments.Add(item);

                totalAmount += bill.TotalAmount;
            });

            report.Payments = reportPayments.OrderByDescending(d => d.PaymentDate).ToList();
            report.TotalPayments = reportPayments.Count();
            report.TotalAmount = totalAmount;

            return report;
        }


    }
}
