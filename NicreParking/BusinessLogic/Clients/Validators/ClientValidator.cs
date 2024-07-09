using Common.Exceptions;
using DataAccessInterface.Repositories;
using Domain.Clients;
using Dto.Clients;
using System.Linq;

namespace BusinessLogic.Clients.Validators
{
    public class ClientValidator
    {
        private IRepository<Client> _clientRepository;

        public ClientValidator(IRepository<Client> clientRepository)
        {
            _clientRepository = clientRepository;
        }

        public void ValidateFields(ClientCreateDto clientCreate)
        {
            if (string.IsNullOrEmpty(clientCreate.Name)) throw new ValidationException("El nombre del cliente no puede ser vacio");
            if (string.IsNullOrEmpty(clientCreate.Surname)) throw new ValidationException("El apellido del cliente no puede ser vacio");
            if (string.IsNullOrEmpty(clientCreate.PhoneNumber)) throw new ValidationException("El telefono del cliente no puede ser vacio");
            if (string.IsNullOrEmpty(clientCreate.Ci)) throw new ValidationException("La cedula del cliente no puede ser vacia");
        }

        public void ValidateNotExists(ClientCreateDto clientCreateDto)
        {
            var client = _clientRepository.List().FirstOrDefault(c => c.Ci.Equals(clientCreateDto.Ci) && c.IsActive);

            if (client != null) throw new ValidationException($"Ya existe un cliente con cedula: {clientCreateDto.Ci} en el sistema");
        }
    }
}
