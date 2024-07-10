using Dto.Vehicles;
using System;
using System.Collections.Generic;

namespace Dto.Clients
{
    public class MonthlyClientDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Lastname { get; set; }

        public string PhoneNumber { get; set; }

        public string SecondaryPhoneNumber { get; set; }    

        public string Document { get; set; }

        public string Address { get; set; }

        public DateTime StartingDate { get; set; }

        public DateTime EndDate { get; set; }

        public List<VehicleDto> Vehicles { get; set; }

        public MonthlyClientDto()
        {

        }
    }
}
