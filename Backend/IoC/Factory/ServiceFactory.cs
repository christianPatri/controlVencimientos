
using AutoMapper;
using BusinessLogic.Bulks;
using BusinessLogic.Calendar;
using BusinessLogic.Products;
using BusinessLogic.Sessions;
using BusinessLogic.Settings;
using BusinessLogic.Users;
using Common.Validations;
using DataAccess.Context;
using DataAccess.Repositories;
using DataAccessInterface.Repositories;
using Domain.Products;
using Domain.Settings.ConfigurationItems;
using Domain.Users;
using IService.Bulks;
using IService.Calendar;
using IService.Products;
using IService.Sessions;
using IService.Settings;
using IService.Users;
using Mapper.Mappers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Services.Bulks;
using Services.Calendar;
using Services.Products;
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
            services.AddScoped<IRepository<ProductSupplier>, Repository<ProductSupplier>>();
            services.AddScoped<IRepository<ProductItem>, Repository<ProductItem>>();
            services.AddScoped<IRepository<Product>, Repository<Product>>();
            services.AddScoped<IRepository<ConfigurationItem>, Repository<ConfigurationItem>>();

        }

        private void AddServices()
        {
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ISessionService, SessionService>();
            services.AddScoped<ISettingService, SettingService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<IProductItemService, ProductItemService>();
            services.AddScoped<IProductSupplierService, ProductSupplierService>();
            services.AddScoped<IBulkService, BulkService>();
            services.AddScoped<ICalendarService, CalendarService>();
        }

        private void AddHelpers()
        {
            services.AddScoped<NullEntityValidator, NullEntityValidator>();

            services.AddScoped<UserLogic, UserLogic>();
            services.AddScoped<SessionLogic, SessionLogic>();
            services.AddScoped<SettingLogic, SettingLogic>();
            services.AddScoped<ProductLogic, ProductLogic>();
            services.AddScoped<ProductItemLogic, ProductItemLogic>();
            services.AddScoped<ProductSupplierLogic, ProductSupplierLogic>();
            services.AddScoped<BulkLogic, BulkLogic>();
            services.AddScoped<CalendarLogic, CalendarLogic>();

        }

        public void AddDbContextService()
        {
            services.AddDbContext<DbContext, VencimientosContext>();
        }

        public void AddAutoMapperServices()
        {
            //var mappingConfig = new MapperConfiguration(mc =>
            //{
            //    mc.AddProfile(new MappingProfile());
            //});

            //IMapper mapper = mappingConfig.CreateMapper();
            //services.AddSingleton(mapper);
            services.AddAutoMapper(typeof(MappingProfile));
        }
    }
}
