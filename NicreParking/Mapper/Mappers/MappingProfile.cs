using AutoMapper;
using Domain.Clients;
using Domain.Vehicles;
using Dto.Clients;
using Dto.Vehicles;

namespace Mapper.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Vehicle, VehicleDto>();
            CreateMap<VehicleDto, Vehicle>();

            CreateMap<Client, ClientDto>();
            CreateMap<ClientDto, Client>();
        }
    }
}
