using BusinessLogic.Users;
using Common.Exceptions;
using DataAccessInterface.Repositories;
using Domain.Users;
using Dto.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Sessions
{
    public class SessionLogic
    {
        private IRepository<User> _userRepository;

        public SessionLogic(IRepository<User> userRepository)
        {
            _userRepository = userRepository;
        }

        public void ValidateLogin(UserLoginDto userLoginDto)
        {
            if (userLoginDto.Username == null || userLoginDto.Password == null)
            {
                throw new ValidationException("Error, los campos enviados no pueden ser nulos.");
            }
        }

        public void ValidateExistingUser(User userToLogin)
        {
            if (userToLogin == null)
            {
                throw new ValidationException("Credenciales incorrectas.");
            }
        }

        public bool IsCorrectToken(Guid token)
        {
            return this._userRepository.List().ToList().Exists(u => u.Token == token);
        }

        public User SearchUser(UserLoginDto userLoginDto)
        {
            var user = this._userRepository.List().FirstOrDefault(u =>
                u.Username.ToLower().Equals(userLoginDto.Username.ToLower())
                && u.Password.Equals(userLoginDto.Password));

            return user;
        }
    }
}
