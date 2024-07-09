using System;
using System.Collections.Generic;
using System.Text;

namespace Dto.Clients
{
    public class ClientUpdateDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string PhoneNumber { get; set; }

        public string Ci { get; set; }

        public ClientUpdateDto()
        {

        }
    }
}
