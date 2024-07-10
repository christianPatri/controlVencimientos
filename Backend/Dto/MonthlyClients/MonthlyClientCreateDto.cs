using System;
using System.Collections.Generic;
using System.Text;

namespace Dto.Clients
{
    public class MonthlyClientCreateDto
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string PhoneNumber { get; set; }

        public string SecondaryPhoneNumber { get; set; }

        public string Document { get; set; }

        public DateTime StartingDate { get; set; }
    }
}
