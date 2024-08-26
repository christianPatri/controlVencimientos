using BusinessLogic.Calendar;
using Dto.Calendar;
using IService.Calendar;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Calendar
{
    public class CalendarService : ICalendarService
    {
        private readonly CalendarLogic _calendarLogic;


        public CalendarService(CalendarLogic calendarLogic)
        {
            _calendarLogic = calendarLogic;
        }

        public CalendarIconsDto GetDayIcons(DateTime day)
        {
            var response = new CalendarIconsDto();

            var expirationsDate = _calendarLogic.GetExpirationsDay(day);
            response.HasDayExpirations = expirationsDate.Count > 0;
            response.AmountTodayExpirations = expirationsDate.Count;

            response.IsToday = _calendarLogic.IsToday(day);
            if (response.IsToday)
            {
                var unCheckedItems = _calendarLogic.GetUncheckedExpirations(day);

                response.HasPreviousExpirationsNotChecked = unCheckedItems.Count > 0;
                response.UncheckedExpirations = unCheckedItems.Count;
            }
            else
            {
                //var nextExpirationsDate = _calendarLogic.GetNextExpirationsDay(day);
                //response.HasNextDayExpirations = nextExpirationsDate.Count > 0;
                //response.AmountNextDayExpirations = nextExpirationsDate.Count;

                //var next2ExpirationsDate = _calendarLogic.GetNext2ExpirationsDay(day);
                //response.HasNext2DayExpirations = next2ExpirationsDate.Count > 0;
                //response.AmountNext2DayExpirations = next2ExpirationsDate.Count;
            }


            return response;
        }

        
    }
}
