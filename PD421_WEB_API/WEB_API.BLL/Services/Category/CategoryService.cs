using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WEB_API.BLL.Dtos.Category;
using WEB_API.BLL.Services.Category;
using WEB_API.BLL.Services.Storage;
using WEB_API.DAL.Entities.Category;
using WEB_API.DAL.repositories.category;

namespace WEB_API.BLL.Services.Categories
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        private readonly IStorageService _storageService;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper, IStorageService storageService)
        {
            _mapper = mapper;
            _categoryRepository = categoryRepository;
            _storageService = storageService;
        }

        public async Task<ServerResponse> Create(CreateCategoryDTO dto, String contentRootPath)
        {
            var entity = _mapper.Map<CategoryEntity>(dto);
            if(dto.Image != null)
            {
                var imagePath = await _storageService.SaveImageAsync(dto.Image,contentRootPath);
                if(imagePath == null)
                {
                    return new ServerResponse { Message = "Сталася помилка при збереженні картинки", IsSuccess = false };
                }
                entity.Image = imagePath;
            }
            await _categoryRepository.CreateAsync(entity);
            return new ServerResponse { Message = "Успішно створено категорію", IsSuccess = true };
        }

        public async Task<ServerResponse> GetAll()
        {
            var categories = await _categoryRepository.GetAll().ToListAsync();
            return new ServerResponse { Message = "Успішно отримано категорії", IsSuccess = true, Data = categories };
        }

    }
}
