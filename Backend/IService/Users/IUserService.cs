using Dto.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IService.Users
{
    public interface IUserService
    {
        IEnumerable<UserDto> GetActiveUsers();

        UserDto GetUserById(int UserId);

        UserDto CreateUser(UserDto UserCreate);

        UserDto UpdateUser(UserDto UserUpdate);

        void DeleteUser(UserDto UserDelete);
    }
}
