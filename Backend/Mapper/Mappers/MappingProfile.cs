using AutoMapper;
using Domain.Bills;
using Domain.Clients;
using Domain.Settings.ConfigurationItems;
using Domain.Users;
using Domain.Vehicles;
using Dto.Bills;
using Dto.Clients;
using Dto.HourlyClients;
using Dto.Settings.ConfigurationItems;
using Dto.Users;
using Dto.Vehicles;
using Dto.Vehicles.MonthlyVehicles;

namespace Mapper.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Vehicle, VehicleDto>();
            CreateMap<VehicleDto, Vehicle>();

            CreateMap<MonthlyClient, MonthlyClientDto>();
            CreateMap<MonthlyClientDto, MonthlyClient>();

            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();

            CreateMap<HourlyClient, HourlyClientDto>();
            CreateMap<HourlyClientDto, HourlyClient>();

            CreateMap<Bill, BillDto>();
            CreateMap<BillDto, Bill>();

            CreateMap<MonthlyParkingLog, MonthlyParkingLogDto>();
            CreateMap<MonthlyParkingLogDto, MonthlyParkingLog>();

            CreateMap<ConfigurationItem, ConfigurationItemDto>();
            CreateMap<ConfigurationItemDto, ConfigurationItem>();
        }
    }
}
