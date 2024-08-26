using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Calendar
{
    public class CalendarIconsDto
    {
        public bool HasDayExpirations { get; set; }

        public int AmountTodayExpirations { get; set; }

        public bool HasNextDayExpirations { get; set; }

        public int AmountNextDayExpirations { get; set; }

        public bool HasNext2DayExpirations { get; set; }

        public int AmountNext2DayExpirations { get; set; }

        public bool IsToday { get; set; }

        public bool HasPreviousExpirationsNotChecked { get; set; }

        public int UncheckedExpirations { get; set; }

        public CalendarIconsDto() { }
    }
}
