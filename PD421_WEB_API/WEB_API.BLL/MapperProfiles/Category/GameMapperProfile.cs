using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WEB_API.BLL.Dtos.Category;
using WEB_API.DAL.Entities.Category;

namespace WEB_API.BLL.MapperProfiles.Category
{
    public class GameMapperProfile : Profile
    {
        public GameMapperProfile()
        {
            CreateMap<CreateCategoryDTO, CategoryEntity>()
                .ForMember(dest => dest.Image, opt => opt.Ignore());

            CreateMap<UpdateCategoryDTO, CategoryEntity>()
                .ForMember(dest => dest.Image, opt => opt.Ignore())
                .ForAllMembers(opt => opt.Condition((s, d, sm) => sm != null));
        }
    }
}
