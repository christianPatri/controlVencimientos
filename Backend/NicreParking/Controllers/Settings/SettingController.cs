using Dto.Settings.ConfigurationItems;
using IService.Reports;
using IService.Settings;
using Microsoft.AspNetCore.Mvc;
using webApi.Filters;

namespace webApi.Controllers.Settings
{
    [ServiceFilter(typeof(AuthorizationAttributeFilter))]
    [ApiController]
    [Route("api/settings")]
    public class SettingController : ControllerBase
    {
        private readonly ISettingService _settingService;

        public SettingController(ISettingService settingService)
        {
            _settingService = settingService;
        }

        [HttpGet("GetConfigurationItems")]
        public IActionResult GetConfigurationItems()
        {
            var configItems = _settingService.GetConfigurationItems();
            return Ok(configItems);
        }

        [HttpPost("UpdateConfigurationItem")]
        public IActionResult UpdateConfigurationItem(ConfigurationItemUpdateDto input)
        {
            var configItems = _settingService.UpdateConfigurationItem(input);
            return Ok(configItems);
        }
    }
}
