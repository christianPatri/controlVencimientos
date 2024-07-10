using BusinessLogic.Bills;
using BusinessLogic.HourlyClients;
using BusinessLogic.MonthlyClients;
using BusinessLogic.Reports;
using BusinessLogic.Sessions;
using BusinessLogic.Settings;
using BusinessLogic.Users;
using BusinessLogic.Vehicles;
using BusinessLogic.Vehicles.Generators;
using BusinessLogic.Vehicles.Updater;
using BusinessLogic.Vehicles.Validators;
using Common.Validations;
using DataAccess.Context;
using DataAccess.Repositories;
using DataAccessInterface.Repositories;
using Domain.Bills;
using Domain.Clients;
using Domain.Settings.ConfigurationItems;
using Domain.Users;
using Domain.Vehicles;
using IService.Bills;
using IService.Clients;
using IService.Reports;
using IService.Sessions;
using IService.Settings;
using IService.Users;
using IService.Vehicles;
using Mapper.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Services.Bills;
using Services.Clients;
using Services.Reports;
using Services.Sessions;
using Services.Settings;
using Services.Users;
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
            services.AddScoped<IRepository<MonthlyClient>, Repository<MonthlyClient>>();
            services.AddScoped<IRepository<Vehicle>, Repository<Vehicle>>();
            services.AddScoped<IRepository<User>, Repository<User>>();
            services.AddScoped<IRepository<HourlyClient>, Repository<HourlyClient>>();
            services.AddScoped<IRepository<Ticket>, Repository<Ticket>>();
            services.AddScoped<IRepository<Bill>, Repository<Bill>>();
            services.AddScoped<IRepository<BillNumber>, Repository<BillNumber>>();
            services.AddScoped<IRepository<MonthlyParkingLog>, Repository<MonthlyParkingLog>>();
            services.AddScoped<IRepository<ConfigurationItem>, Repository<ConfigurationItem>>();

        }

        private void AddServices()
        {
            services.AddScoped<IMonthlyClientService, MonthlyClientService>();
            services.AddScoped<IMonthlyVehicleService, MonthlyVehicleService>();
            services.AddScoped<IVehicleService, VehicleService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IHourlyClientService, HourlyClientService>();
            services.AddScoped<ISessionService, SessionService>();
            services.AddScoped<INightlyClientService, NightlyClientService>();
            services.AddScoped<IBillService, BillService>();
            services.AddScoped<IReportService, ReportService>();
            services.AddScoped<ISettingService, SettingService>();
        }

        private void AddHelpers()
        {
            services.AddScoped<NullEntityValidator, NullEntityValidator>();

            services.AddScoped<VehicleGenerator, VehicleGenerator>();
            services.AddScoped<VehicleCreateValidator, VehicleCreateValidator>();
            services.AddScoped<VehicleUpdateValidator, VehicleUpdateValidator>();
            services.AddScoped<VehicleUpdater, VehicleUpdater>();

            services.AddScoped<UserLogic, UserLogic>();
            services.AddScoped<HourlyClientLogic, HourlyClientLogic>();
            services.AddScoped<MonthlyClientLogic, MonthlyClientLogic>();
            services.AddScoped<MonthlyVehicleLogic, MonthlyVehicleLogic>();
            services.AddScoped<SessionLogic, SessionLogic>();
            services.AddScoped<BillLogic, BillLogic>();
            services.AddScoped<MonthlyParkingLogLogic, MonthlyParkingLogLogic>();

            services.AddScoped<ReportLogic, ReportLogic>();
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
