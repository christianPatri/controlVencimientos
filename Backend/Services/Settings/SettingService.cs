using AutoMapper;
using BusinessLogic.Settings;
using BusinessLogic.Vehicles;
using Dto.Settings.ConfigurationItems;
using IService.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Settings
{
    public class SettingService : ISettingService
    {
        private SettingLogic _settingLogic;
        private readonly IMapper _mapper;
        private readonly MonthlyVehicleLogic _monthlyVehicleLogic;

        public SettingService(
            SettingLogic settingLogic,
            IMapper mapper,
            MonthlyVehicleLogic monthlyVehicleLogic)
        {
            _settingLogic = settingLogic;
            _mapper = mapper;
            _monthlyVehicleLogic = monthlyVehicleLogic;
        }

        public List<ConfigurationItemDto> GetConfigurationItems()
        {
            var configItems = _settingLogic.GetConfigurationItems();

            var configItemsDto = _mapper.Map<List<ConfigurationItemDto>>(configItems);

            return configItemsDto;
        }

        public ConfigurationItemDto UpdateConfigurationItem(ConfigurationItemUpdateDto input)
        {
            var configItemToUpdate = _settingLogic.GetConfigurationItem(input.Id);

            var isMonthlyPrice = configItemToUpdate.Name == "Precio Por Mes";
            var oldValue = configItemToUpdate.Value;

            var updatedItem = _settingLogic.UpdateConfigurationItem(configItemToUpdate, input);

            if(isMonthlyPrice)
            {
                //Tengo que actualizar todos los precios mensuales !!
                _monthlyVehicleLogic.UpdateMonthlyVehiclesPrice(oldValue, input.Value);
            }

            return _mapper.Map<ConfigurationItemDto>(updatedItem);
        }
    }
}
