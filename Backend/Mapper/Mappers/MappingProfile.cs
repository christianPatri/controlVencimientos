using AutoMapper;
using Domain.Settings.ConfigurationItems;
using Domain.Users;
using Dto.Settings.ConfigurationItems;
using Dto.Users;

namespace Mapper.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {


            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();

            CreateMap<ConfigurationItem, ConfigurationItemDto>();
            CreateMap<ConfigurationItemDto, ConfigurationItem>();
        }
    }
}
