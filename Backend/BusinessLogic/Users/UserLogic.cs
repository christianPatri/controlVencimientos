using Common.Exceptions;
using Common.Validations;
using DataAccessInterface.Repositories;
using Domain.Users;
using Dto.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Users
{
    public class UserLogic
    {
        private IRepository<User> _userRepository;
        private readonly NullEntityValidator _nullEntityValidator;


        public UserLogic(IRepository<User> userRepository, NullEntityValidator nullEntityValidator)
        {
            _userRepository = userRepository;
            _nullEntityValidator = nullEntityValidator; 
        }

        public User CreateUser(UserDto user)
        {
            User newUser = new User(user.Name, user.Lastname, user.Username, user.Password);

            _userRepository.AddAndSave(newUser);

            return newUser;
        }

        public void ValidateFields(UserDto user)
        {
            if (string.IsNullOrEmpty(user.Name)) throw new ValidationException("El nombre del usuario no puede ser vacio");
            if (string.IsNullOrEmpty(user.Lastname)) throw new ValidationException("El apellido del usuario no puede ser vacio");
            if (string.IsNullOrEmpty(user.Password)) throw new ValidationException("El password del usuario no puede ser vacio");
            if (string.IsNullOrEmpty(user.Username)) throw new ValidationException("La nickname del usuairo no puede ser vacio");
        }

        public void ValidateNotExists(UserDto user)
        {
            var existsUser = _userRepository.List().Any(u => u.Username.Equals(user.Username));

            if (existsUser) throw new ValidationException($"El usuario con Nombre de Usuario: {user.Username} en el sistema");
        }

        public IEnumerable<User> GetActiveUsers()
        {
            var users = _userRepository.List().ToList();

            return users;
        }

        public User GetUserByUsername(string username)
        {
            return _userRepository.List().FirstOrDefault(u => u.Username.Equals(username));
        }

        public void DeleteUser(User user)
        {
            _nullEntityValidator.ValidateById(user, "Usuario");
            _userRepository.Delete(user);
        }

        public void ValidateUpdate(UserDto userWithUpdates, User userToUpdate)
        {
            _nullEntityValidator.ValidateById(userToUpdate, "Usuario");
            this.ValidateFields(userWithUpdates);

            //if (!userToUpdate.Username.Equals(userWithUpdates.Username))
            //{
            //    this.ValidateExistsUsername(userWithUpdates.Username);
            //}
        }

        //private void ValidateExistsUsername(string username)
        //{
        //    if (_userRepository.List().Any(u => u.Username.ToLower().Equals(username.ToLower())))
        //    {
        //        throw new ValidationException("El nombre de usuario del usuario que desea modificar ya existe.");
        //    }
        //}

        public void UpdateUser(UserDto userWithUpdates, User user)
        {
            user.Password = userWithUpdates.Password;
            user.Name = userWithUpdates.Name;
            user.Lastname = userWithUpdates.Lastname;

            _userRepository.Update(user);
        }
    }
}
