using Common.Exceptions;
using Common.Validations;
using DataAccessInterface.Repositories;
using Domain.Settings.ConfigurationItems;
using Dto.Settings.ConfigurationItems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLogic.Settings
{
    public class SettingLogic
    {
        private IRepository<ConfigurationItem> _configItemsRepository;
        private readonly NullEntityValidator _nullEntityValidator;
        

        public SettingLogic(
            IRepository<ConfigurationItem> repository,
            NullEntityValidator nullEntityValidator
            ) 
        {
            _configItemsRepository = repository;
            _nullEntityValidator = nullEntityValidator;
            
        }

        public List<ConfigurationItem> GetConfigurationItems()
        {
            var configItems = _configItemsRepository.List();

            return configItems.ToList();
        }

        public ConfigurationItem GetConfigurationItem(int configItemId)
        {
            var item = _configItemsRepository.List().FirstOrDefault(i => i.Id == configItemId);
            _nullEntityValidator.ValidateById(item, "Configuracion");

            return item;
        }

        public ConfigurationItem UpdateConfigurationItem(ConfigurationItem item, ConfigurationItemUpdateDto updated)
        {
            if (updated.Value == null) throw new ValidationException("El valor es incorrecto");
            item.Value = updated.Value;
            _configItemsRepository.Update(item);

            return item;
        }
    }
}
