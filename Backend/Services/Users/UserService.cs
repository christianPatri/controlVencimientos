using AutoMapper;
using BusinessLogic.Users;
using Dto.Users;
using IService.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Serilog;

namespace Services.Users
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly UserLogic _userLogic;

        public UserService(
            IMapper mapper,
            UserLogic userLogic
            )
        {
            _mapper = mapper;
            _userLogic = userLogic;
        }

        public UserDto CreateUser(UserDto userCreate)
        {
            Log.Information("Creando Usuario Nuevo");
            Log.Information("Creating user with {@userCreate}", userCreate);
            try
            {
                _userLogic.ValidateFields(userCreate);
                _userLogic.ValidateNotExists(userCreate);

                var user = _userLogic.CreateUser(userCreate);
                var userDto = _mapper.Map<UserDto>(user);

                return userDto;
            }
            catch(Exception e)
            {
                Log.Error(e.Message);
                throw(e);
            }
        }

        public void DeleteUser(UserDto userToDelete)
        {
            var user = _userLogic.GetUserByUsername(userToDelete.Username);
            _userLogic.DeleteUser(user);
        }

        public IEnumerable<UserDto> GetActiveUsers()
        {
            var users = _userLogic.GetActiveUsers();
            var usersDto = _mapper.Map<IEnumerable<UserDto>>(users);

            return usersDto;
        }

        public UserDto GetUserById(int UserId)
        {
            throw new NotImplementedException();
        }

        public UserDto UpdateUser(UserDto userToUpdate)
        {
            var user = _userLogic.GetUserByUsername(userToUpdate.Username);

            _userLogic.ValidateUpdate(userToUpdate, user);
            _userLogic.UpdateUser(userToUpdate, user);

            return _mapper.Map<UserDto>(userToUpdate);
        }
    }
}
