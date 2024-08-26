using AutoMapper;
using Domain.Products;
using Domain.Settings.ConfigurationItems;
using Domain.Users;
using Dto.Products.ProductItems;
using Dto.Products.Products;
using Dto.Products.ProductSuppliers;
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

            CreateMap<Product, ProductDto>()
                .ForMember(dest => dest.SupplierId, opt => opt.MapFrom(src => src.SupplierId))
                .ForMember(dest => dest.SupplierName, opt => opt.MapFrom(src => src.Supplier.Name));
            CreateMap<ProductDto, Product>();

            CreateMap<ProductSupplier, ProductSupplierDto>();
            CreateMap<ProductSupplierDto, ProductSupplier>();

            CreateMap<ProductItem, ProductItemDto>();
            CreateMap<ProductItemDto, ProductItem>();
        }
    }
}
