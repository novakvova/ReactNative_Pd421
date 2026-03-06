using WEB_API.BLL.Dtos.Category;

namespace WEB_API.BLL.Services.Category
{
    public interface ICategoryService
    {
        public Task<ServerResponse> GetAll();

        public Task<ServerResponse> Create(CreateCategoryDTO dto, String contentRootPath);
    }
}
