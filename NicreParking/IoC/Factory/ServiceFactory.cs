using BusinessLogic.Clients.Generator;
using BusinessLogic.Clients.Updater;
using BusinessLogic.Clients.Validators;
using BusinessLogic.Vehicles.Generators;
using BusinessLogic.Vehicles.Updater;
using BusinessLogic.Vehicles.Validators;
using Common.Validations;
using DataAccess.Context;
using DataAccess.Repositories;
using DataAccessInterface.Repositories;
using Domain.Clients;
using Domain.Vehicles;
using IService.Clients;
using IService.Vehicles;
using Mapper.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Services.Clients;
using Services.Vehicles;

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
            services.AddScoped<IRepository<Client>, Repository<Client>>();
            services.AddScoped<IRepository<Vehicle>, Repository<Vehicle>>();
        }

        private void AddServices()
        {
            services.AddScoped<IClientService, ClientService>();
            services.AddScoped<IVehicleService, VehicleService>();
        }

        private void AddHelpers()
        {
            services.AddScoped<NullEntityValidator, NullEntityValidator>();
            services.AddScoped<ClientGenerator, ClientGenerator>();
            services.AddScoped<ClientValidator, ClientValidator>();
            services.AddScoped<ClientUpdater, ClientUpdater>();

            services.AddScoped<VehicleGenerator, VehicleGenerator>();
            services.AddScoped<VehicleCreateValidator, VehicleCreateValidator>();
            services.AddScoped<VehicleUpdateValidator, VehicleUpdateValidator>();
            services.AddScoped<VehicleUpdater, VehicleUpdater>();
        }

        public void AddDbContextService()
        {
            services.AddDbContext<DbContext, NicreParkingContext>();
        }

        public void AddAutoMapperServices()
        {
            services.AddAutoMapper(typeof(MappingProfile));
        }
    }
}
