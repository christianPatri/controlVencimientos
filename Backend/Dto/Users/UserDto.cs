using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dto.Users
{
    public class UserDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Lastname { get; set; }

        public string Password { get; set; }

        public string Username { get; set; }

        public DateTime CreatedDate { get; set; }

        public UserDto()
        {

        }
    }
}
