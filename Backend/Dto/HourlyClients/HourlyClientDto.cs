using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.HourlyClients
{
    public  class HourlyClientDto
    {
        public string Name { get; set; }

        public string Licenseplate { get; set; }

        public string Model { get; set; }

        public string PhoneNumber { get; set; }

        public DateTime StartingDate { get; set; }

        public DateTime EndingDate { get; set; }

        public int Ticket { get; set; }

        public bool IsNightly { get; set; }

        public bool IsActive { get; set; }

        public int Price { get; set; }

        public int TotalAmount { get; set; }

        public double TotalTime { get; set; }

        public HourlyClientDto() { }
    }
}
