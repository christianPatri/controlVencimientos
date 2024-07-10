using Common.Exceptions;
using Common.Validations;
using DataAccessInterface.Repositories;
using Domain.Clients;
using Domain.Settings.ConfigurationItems;
using Dto.HourlyClients;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.HourlyClients
{
    public class HourlyClientLogic
    {
        private IRepository<HourlyClient> _hourlyRepository;
        private IRepository<Ticket> _ticketRepository;
        private IRepository<ConfigurationItem> _settingsRepositoy;
        private readonly NullEntityValidator _nullEntityValidator;


        public HourlyClientLogic(
            IRepository<HourlyClient> hourlyRepository,
            IRepository<Ticket> ticketRepository,
            NullEntityValidator nullEntityValidator,
            IRepository<ConfigurationItem> settingsRepositoy)
        {
            _hourlyRepository = hourlyRepository;
            _nullEntityValidator = nullEntityValidator;
            _ticketRepository = ticketRepository;
            _settingsRepositoy = settingsRepositoy;
        }

        public void ValidateCreateFields(HourlyClientDto hourlyClient)
        {
            if (string.IsNullOrEmpty(hourlyClient.Licenseplate)) throw new ValidationException("La matricula no puede ser vacia");
            if (string.IsNullOrEmpty(hourlyClient.Model)) throw new ValidationException("El vehiculo no puede ser vacio");
        }

        public void ValidateNotExists(HourlyClientDto hourlyClient)
        {
            var existsActiveHourlyVehicle = _hourlyRepository.List().Any(v => v.Licenseplate.ToUpper().Equals(hourlyClient.Licenseplate.ToUpper()) && v.IsActive);

            if (existsActiveHourlyVehicle) throw new ValidationException($"Ya existe un vehiculo con matricula: {hourlyClient.Licenseplate} en pension");
        }

        public HourlyClient CreateHourlyClient(HourlyClientDto hourlyClient)
        {
            HourlyClient newHourlyClient = new HourlyClient()
            {
                Name = hourlyClient.Name,
                Licenseplate = new string(hourlyClient.Licenseplate.Where(c => !char.IsWhiteSpace(c)).ToArray()),
                Model = hourlyClient.Model,
                PhoneNumber = hourlyClient.PhoneNumber,
                IsActive = true,
                StartingDate = DateTime.Now,
                IsNightly = false,
                Ticket = GetLastTicket(),
            };

            _hourlyRepository.AddAndSave(newHourlyClient);

            return newHourlyClient;
        }

        public int GetLastTicket()
        {
            var isFirstTicket = false;
            var ticket = _ticketRepository.List().FirstOrDefault();

            if (ticket == null)
            {
                ticket = new Ticket();
                isFirstTicket = true;
            }

            ticket.LastTicketNumber++;

            if(isFirstTicket)
            {
                _ticketRepository.AddAndSave(ticket);
            }
            else
            {
                _ticketRepository.Update(ticket);
            }

            return ticket.LastTicketNumber;
        }

        public HourlyClient GetHourlyClient(string licenseplate, int ticket)
        {
            licenseplate = new string(licenseplate.Where(c => !char.IsWhiteSpace(c)).ToArray());

            return _hourlyRepository.List().FirstOrDefault(v => v.IsActive && v.Licenseplate.ToUpper().Equals(licenseplate.ToUpper()) 
                        && v.Ticket == ticket && !v.IsNightly);
        }

        public void ValidateHourlyClient(HourlyClient hourlyClient, HourlyClientDto hourlyClientDto)
        {
            _nullEntityValidator.ValidateById(hourlyClient, "Matricula");
            
            if(hourlyClient.Ticket != hourlyClientDto.Ticket)
            {
                throw new ValidationException($"Numero de ticket erroneo para la matricula: {hourlyClient.Licenseplate} en pension");
            }
        }

        public HourlyClient ExitHourlyClient(HourlyClient hourlyClient)
        {
            hourlyClient.EndingDate = DateTime.Now;

            var hourlyPrice = int.Parse(_settingsRepositoy.List().First(ci => ci.Name.Equals("Precio Por Hora")).Value);

            TimeSpan duration = hourlyClient.EndingDate - hourlyClient.StartingDate; // Calculate the TimeSpan

            // Get the total duration in hours
            double totalHours = duration.TotalHours;

            // Convert minutes to decimal
            double decimalMinutes = totalHours * 60;

            // Divide by quarter hour (15 minutes)
            double quarterHours = decimalMinutes / 15;

            // Round up to nearest quarter hour
            double roundedQuarterHours = Math.Ceiling(quarterHours);

            // Convert back to minutes (rounded to nearest quarter hour upwards)
            double roundedDurationInMinutes = roundedQuarterHours * 15;

            // Convert rounded minutes to hours
            double roundedDurationInHours = roundedDurationInMinutes / 60;

            var totalAmount = (int) (hourlyPrice * roundedDurationInHours);

            hourlyClient.TotalAmount = totalAmount;
            hourlyClient.Price = hourlyPrice;
            hourlyClient.TotalTime = totalHours;
            hourlyClient.IsActive = false;

            return hourlyClient;
        }

        public void UpdateToExitHourlyClient(HourlyClient hourlyClient)
        {
            _hourlyRepository.Update(hourlyClient);
        }

        public HourlyClient CreateNightlyClient(HourlyClientDto hourlyClient)
        {
            HourlyClient newHourlyClient = new HourlyClient()
            {
                Name = hourlyClient.Name,
                Licenseplate = new string(hourlyClient.Licenseplate.Where(c => !char.IsWhiteSpace(c)).ToArray()),
                Model = hourlyClient.Model,
                PhoneNumber = hourlyClient.PhoneNumber,
                IsActive = true,
                StartingDate = DateTime.Now,
                IsNightly = true,
                Ticket = GetLastTicket(),
            };

            _hourlyRepository.AddAndSave(newHourlyClient);

            return newHourlyClient;
        }

        public HourlyClient GetNightlyClient(string licenseplate, int ticket)
        {
            licenseplate = new string(licenseplate.Where(c => !char.IsWhiteSpace(c)).ToArray());

            return _hourlyRepository.List().FirstOrDefault(v => v.IsActive && v.Licenseplate.ToUpper().Equals(licenseplate.ToUpper())
                        && v.Ticket == ticket && v.IsNightly);
        }

        public HourlyClient ExitNightlyClient(HourlyClient nightlyClient)
        {
            nightlyClient.EndingDate = DateTime.Now;

            var nightlyPrice = int.Parse(_settingsRepositoy.List().First(ci => ci.Name.Equals("Precio Por Noche")).Value);
            var hourlyPrice = 50;

            TimeSpan duration = nightlyClient.EndingDate - nightlyClient.StartingDate; // Calculate the TimeSpan

            int totalDays = (int)duration.TotalDays;
            var isOneDay = false;

            //Me cuenta los total DAYS cada 24 hs.

            if (totalDays < 1)
            {
                totalDays = 1;
                isOneDay = true;

                //tengo que ver luego los horarios de retiro para ver los montos a cobrar.
            }
            else
            {
                var totalHours = (int)duration.TotalHours;
                var leftHours = totalHours - (totalDays * 24);

                totalDays++;

                //mismo escenario,entro 20hs, retiro 22hs del otro dia, es un dia entero + 2 hs => me va a dar un dia. entonces le sumo otro.
                // pending: Ver horarios de retiros.

            }

            var totalAmount = (int)(nightlyPrice * totalDays);

            nightlyClient.TotalAmount = totalAmount;
            nightlyClient.Price = nightlyPrice;
            nightlyClient.TotalTime = totalDays;
            nightlyClient.IsActive = false;

            return nightlyClient;
        }

        public List<HourlyClient> GetNightlyClientsForReport(DateTime from, DateTime to)
        {
            var nightlyMovements = _hourlyRepository.List().Where(nc => nc.IsNightly && nc.StartingDate >= from && nc.StartingDate <= to);

            return nightlyMovements.OrderByDescending(m => m.StartingDate).ToList();
        }

        public List<HourlyClient> GetHourlyClientsForReport(DateTime from, DateTime to)
        {
            var hourlyMovements = _hourlyRepository.List().Where(nc => !nc.IsNightly && nc.StartingDate >= from && nc.StartingDate <= to);

            return hourlyMovements.OrderByDescending(m => m.StartingDate).ToList();
        }
    }
}
