
using BusinessLogic.Sessions;
using BusinessLogic.Settings;
using BusinessLogic.Users;

using Common.Validations;
using DataAccess.Context;
using DataAccess.Repositories;
using DataAccessInterface.Repositories;
using Domain.Settings.ConfigurationItems;
using Domain.Users;
using IService.Sessions;
using IService.Settings;
using IService.Users;
using Mapper.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Services.Sessions;
using Services.Settings;
using Services.Users;

namespace IoC.Factory
{
    public class ServiceFactory
    {
        private readonly IServiceCollection services;

        public ServiceFactory(IServiceCollection services)
        {
            this.services = services;
        }

        public void AddCustomServices()
        {
            this.AddRepositories();
            this.AddServices();
            this.AddHelpers();
        }

        private void AddRepositories()
        {

            services.AddScoped<IRepository<User>, Repository<User>>();
            services.AddScoped<IRepository<ConfigurationItem>, Repository<ConfigurationItem>>();

        }

        private void AddServices()
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ISessionService, SessionService>();
            services.AddScoped<ISettingService, SettingService>();
        }

        private void AddHelpers()
        {
            services.AddScoped<NullEntityValidator, NullEntityValidator>();

            services.AddScoped<UserLogic, UserLogic>();
            services.AddScoped<SessionLogic, SessionLogic>();
            services.AddScoped<SettingLogic, SettingLogic>();
        }

        public void AddDbContextService()
        {
            services.AddDbContext<DbContext, VencimientosContext>();
        }

        public void AddAutoMapperServices()
        {
            services.AddAutoMapper(typeof(MappingProfile));
        }
    }
}
