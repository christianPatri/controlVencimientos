using Common.Exceptions;
using Common.Validations;
using DataAccessInterface.Repositories;
using Domain.Bills;
using Domain.Clients;
using Dto.Clients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.MonthlyClients
{
    public class MonthlyClientLogic
    {
        private IRepository<MonthlyClient> _monthlyClientRepository;
        private readonly NullEntityValidator _nullEntityValidator;

        public MonthlyClientLogic(
            IRepository<MonthlyClient> monthlyClientRepository,
            NullEntityValidator nullEntityValidator)
        {
            _monthlyClientRepository = monthlyClientRepository;
            _nullEntityValidator = nullEntityValidator;
        }

        public void ValidateFields(MonthlyClientDto monthlyClient)
        {
            if (string.IsNullOrEmpty(monthlyClient.Name)) throw new ValidationException("El nombre del cliente no puede ser vacio");
            if (string.IsNullOrEmpty(monthlyClient.Lastname)) throw new ValidationException("El apellido del cliente no puede ser vacio");
            if (string.IsNullOrEmpty(monthlyClient.PhoneNumber)) throw new ValidationException("El telefono del cliente no puede ser vacio");
            if (string.IsNullOrEmpty(monthlyClient.Document)) throw new ValidationException("El documento del cliente no puede ser vacio");
        }

        public void ValidateNotExists(MonthlyClientDto clientCreateDto)
        {
            var document = new string(clientCreateDto.Document.Where(c => !char.IsWhiteSpace(c)).ToArray());
            var monthlyClient = _monthlyClientRepository.List().FirstOrDefault(c => c.Document.ToUpper().Equals(document.ToUpper()) && c.IsActive);

            if (monthlyClient != null) throw new ValidationException($"Ya existe un cliente con documento: {clientCreateDto.Document} en el sistema");
        }

        public MonthlyClient Generate(MonthlyClientDto clientCreate)
        {
            var document = new string(clientCreate.Document.Where(c => !char.IsWhiteSpace(c)).ToArray());

            MonthlyClient monthlyClient = new MonthlyClient(clientCreate.Name, clientCreate.Lastname, clientCreate.PhoneNumber, 
                clientCreate.SecondaryPhoneNumber, document, clientCreate.StartingDate);
            monthlyClient.StartingDate = DateTime.Now;
            monthlyClient.Address = clientCreate.Address;
            
            _monthlyClientRepository.AddAndSave(monthlyClient);

            return monthlyClient;
        }

        public List<MonthlyClient> GetActiveClients()
        {
            var clients = _monthlyClientRepository.List().Where(c => c.IsActive).ToList();

            return clients;
        }

        public List<MonthlyClient> GetActiveClientsForGenerateBills()
        {
            var clients = _monthlyClientRepository.IncludeAll("Vehicles", "Bills").Where(c => c.IsActive).ToList();

            return clients;
        }

        public MonthlyClient GetBy(string document)
        {
            document = new string(document.Where(c => !char.IsWhiteSpace(c)).ToArray());

            var monthlyClient = _monthlyClientRepository.IncludeAll("Vehicles").FirstOrDefault(c => c.Document.ToUpper() == document.ToUpper());
            _nullEntityValidator.ValidateById(monthlyClient, "Cliente Mensual");

            return monthlyClient;
        }

        public MonthlyClient GetById(int clientId)
        {
            var monthlyClient = _monthlyClientRepository.IncludeAll("Vehicles").FirstOrDefault(c => c.Id == clientId);
            monthlyClient.Vehicles = monthlyClient.Vehicles.Where(v => v.Active).ToList();
            _nullEntityValidator.ValidateById(monthlyClient, "Cliente Mensual");

            return monthlyClient;
        }

        public void ValidateUpdate(MonthlyClientDto monthlyClientUpdate, MonthlyClient monthlyClientToUpdate)
        {
            _nullEntityValidator.ValidateById(monthlyClientToUpdate, "Cliente Mensual");
            this.ValidateFields(monthlyClientUpdate);

            var x = new string(monthlyClientToUpdate.Document.Where(c => !char.IsWhiteSpace(c)).ToArray());
            var y = new string(monthlyClientUpdate.Document.Where(c => !char.IsWhiteSpace(c)).ToArray());

            if (!x.ToUpper().Equals(y.ToUpper()))
            {
                this.ValidateNotExists(monthlyClientUpdate);
            }
        }

        public void ValidateIsActiveClient(MonthlyClient monthlyClient)
        {
            if(!monthlyClient.IsActive) throw new ValidationException($"El cliente se encuentra inactivo.");
        }

        public MonthlyClient Update(MonthlyClient monthlyClient, MonthlyClientDto clientUpdate)
        {

            if (clientUpdate.Name != null) monthlyClient.Name = clientUpdate.Name;
            if (clientUpdate.Lastname != null) monthlyClient.Lastname = clientUpdate.Lastname;
            if (clientUpdate.PhoneNumber != null) monthlyClient.PhoneNumber = clientUpdate.PhoneNumber;
            if (clientUpdate.Document != null) monthlyClient.Document = clientUpdate.Document;
            if (clientUpdate.Address != null) monthlyClient.Address = clientUpdate.Address;

            _monthlyClientRepository.Update(monthlyClient);

            return monthlyClient;
        }

        public MonthlyClient Delete(MonthlyClient monthlyClient, MonthlyClientDto clientDelete)
        {
            monthlyClient.EndingDate = DateTime.Now;
            monthlyClient.IsActive = false;
            _monthlyClientRepository.Update(monthlyClient);

            return monthlyClient;
        }

        public void LinkVehiclesToClient(MonthlyClient monthlyClient)
        {
            _monthlyClientRepository.Update(monthlyClient);
        }

        public void AddBillToClient(MonthlyClient monthlyClient)
        {
            _monthlyClientRepository.Update(monthlyClient);
        }

        public void AddBillToClient(List<MonthlyClient> monthlyClients)
        {
            _monthlyClientRepository.Update(monthlyClients);
        }

        public List<MonthlyClient> GetMonthlyClientsByBills(List<Bill> bills)
        {
            var monthlyClients = new List<MonthlyClient>();

            bills.ForEach(bill =>
            {
                var client = _monthlyClientRepository.IncludeAll("Vehicles", "Bills").FirstOrDefault(mc => mc.Id == bill.MonthlyClientId);
                monthlyClients.Add(client);
            });

            return monthlyClients.Distinct().ToList();
        }
    }
}
