using Domain.Enums;
using System;

namespace Domain.Users
{
    public class User
    {
        public int Id { get; set; }

        public string Name
        {
            get
            {
                return this.name;
            }
            set
            {
                this.ValidateEmptyString(value, "El nombre del usuario no puede ser vacio o nulo.");
                this.name = value;
            }
        }

        public string Lastname
        {
            get
            {
                return this.lastname;
            }
            set
            {
                this.ValidateEmptyString(value, "El apellido del usuario no puede ser vacio o nulo.");
                this.lastname = value;
            }
        }

        public string Password
        {
            get
            {
                return this.password;
            }
            set
            {
                this.ValidateEmptyString(value, "El password del usuario no puede ser vacio o nulo.");
                this.password = value;
            }
        }

        public string Username
        {
            get
            {
                return this.username;
            }
            set
            {
                this.ValidateEmptyString(value, "El usuario no puede ser vacio o nulo.");
                //this.ValidateEmailFormat(value);
                this.username = value;
            }
        }

        public Guid Token { get; set; }

        public UserRoles Role { get; set; }

        public bool IsActive { get; set; }

        public DateTime CreatedDate { get; set; }

        private string name;
        private string password;
        private string username;
        private string lastname;
        //private const string EMAIL_REGEX = @"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,})+)$";

        public User()
        {
        }

        public User(string name, string lastname, string username, string password)
        {
            this.Name = name;
            this.Lastname = lastname;
            this.Username = username;
            this.Password = password;
            this.CreatedDate = DateTime.Now;
            this.Token = Guid.NewGuid();
        }

        private void ValidateEmptyString(string value, string message)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException(message);
            }
        }

        //private void ValidateEmailFormat(string value)
        //{
        //    Regex regex = new Regex(EMAIL_REGEX);

        //    if (!regex.Match(value).Success)
        //    {
        //        throw new ArgumentException("El mail del usuario tiene que ser del formato 'mail@mail.com'.");
        //    }
        //}
    }
}
