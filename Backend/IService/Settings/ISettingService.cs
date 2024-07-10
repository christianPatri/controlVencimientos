using Dto.Settings.ConfigurationItems;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IService.Settings
{
    public interface ISettingService
    {
        List<ConfigurationItemDto> GetConfigurationItems();

        ConfigurationItemDto UpdateConfigurationItem(ConfigurationItemUpdateDto input);
    }
}
