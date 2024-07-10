using AutoMapper;
using BusinessLogic.Bills;
using BusinessLogic.HourlyClients;
using BusinessLogic.MonthlyClients;
using BusinessLogic.Reports;
using BusinessLogic.Vehicles;
using Domain.Clients;
using Dto.HourlyClients;
using Dto.Reports;
using IService.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Reports
{
    public class ReportService : IReportService
    {
        private ReportLogic _reportLogic;
        private MonthlyClientLogic _monthlyClientLogic;
        private BillLogic _billLogic;
        private MonthlyVehicleLogic _monthlyVehicleLogic;
        private HourlyClientLogic _hourlyClientLogic;
        private readonly IMapper _mapper;

        public ReportService(
            ReportLogic reportLogic,
            MonthlyClientLogic monthlyClientLogic,
            BillLogic billLogic,
            MonthlyVehicleLogic monthlyVehicleLogic,
            HourlyClientLogic hourlyClientLogic,
            IMapper mapper)
        {
            _reportLogic = reportLogic;
            _billLogic = billLogic;
            _monthlyClientLogic = monthlyClientLogic;
            _monthlyVehicleLogic = monthlyVehicleLogic;
            _hourlyClientLogic = hourlyClientLogic;
            _mapper = mapper;
        }

        public List<MonthlyDebtorDto> GetMonthlyDebtorsReport()
        {
            //1- obtener todos los clientes
            var clients = _monthlyClientLogic.GetActiveClients();

            //2- para cada cliente obtener las bills y vehiculos
            clients.ForEach(c =>
            {
                var bills = _billLogic.GetMonthlyClientBills(c.Id);
                c.Bills = bills;

                var vehicles = _monthlyVehicleLogic.GetClientActiveVehicles(c.Id);
                c.Vehicles = vehicles;
            });

            var report = _reportLogic.GenerateMonthlyClientDebtorsReport(clients);

            //3- armo el DTO resultante

            return report;
        }

        public NightlyParkingReportDto GetNightlyParkingReport(ParkingReportInDto parkingReportIn)
        {
            //Preciso ir al repo y traer los movimientos de parking nocturno entre esas fechas
            var from = DateTime.Parse(parkingReportIn.From);
            var to = parkingReportIn.To != null ? DateTime.Parse(parkingReportIn.To) : DateTime.Now;

            var movementes = _hourlyClientLogic.GetNightlyClientsForReport(from, to);

            // preciso tambien metricas: cantidad de pensiones, total, etc
            //OBJ: lista + esos datos

            var report = _reportLogic.GenerateNightlyParkingReport(movementes);
            report.Movements = _mapper.Map<List<HourlyClientDto>>(movementes);
            report.From = from;
            report.To = to;

            return report;
        }

        public NightlyParkingReportDto GetHourlyParkingReport(ParkingReportInDto parkingReportIn)
        {
            //Preciso ir al repo y traer los movimientos de parking por horas entre esas fechas
            var from = DateTime.Parse(parkingReportIn.From);
            var to = parkingReportIn.To != null ? DateTime.Parse(parkingReportIn.To) : DateTime.Now;

            var movementes = _hourlyClientLogic.GetHourlyClientsForReport(from, to);

            // preciso tambien metricas: cantidad de pensiones, total, etc
            //OBJ: lista + esos datos

            var report = _reportLogic.GenerateNightlyParkingReport(movementes);
            report.Movements = _mapper.Map<List<HourlyClientDto>>(movementes);
            report.From = from;
            report.To = to;

            return report;

        }

        public MonthlyClientReportDto GetMonthlyParkingReport(ParkingReportInDto parkingReportIn)
        {
            //Preciso ir al repo y traer las facturas pagadas entre esas fechas.
            var from = DateTime.Parse(parkingReportIn.From);
            var to = parkingReportIn.To != null ? DateTime.Parse(parkingReportIn.To) : DateTime.Now;

            var payedBills = _billLogic.GetPayedBills(from, to);

            //Preciso los clientes de cada factura
            var monthlyClients = _monthlyClientLogic.GetMonthlyClientsByBills(payedBills);

            // preciso tambien metricas: cantidad de pensiones, total, etc
            //OBJ: lista + esos datos

            var report = _reportLogic.GenerateMonthlyParkingReport(payedBills, monthlyClients);
            
            report.From = from;
            report.To = to;

            return report;
        }
    }
}
