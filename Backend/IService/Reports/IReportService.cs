using Dto.Reports;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IService.Reports
{
    public interface IReportService
    {
        List<MonthlyDebtorDto> GetMonthlyDebtorsReport();

        NightlyParkingReportDto GetNightlyParkingReport(ParkingReportInDto parkingReportIn);

        NightlyParkingReportDto GetHourlyParkingReport(ParkingReportInDto parkingReportIn);

        MonthlyClientReportDto GetMonthlyParkingReport(ParkingReportInDto parkingReportIn);
    }
}
