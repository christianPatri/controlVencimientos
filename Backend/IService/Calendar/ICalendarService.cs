using Dto.Calendar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IService.Calendar
{
    public interface ICalendarService
    {
        CalendarIconsDto GetDayIcons(DateTime day);
    }
}
