using Microsoft.AspNetCore.Http;
namespace WEB_API.BLL.Services.Storage
{
    public interface IStorageService
    {
        Task<string?> SaveImageAsync(IFormFile file,string contentRootPath);
        Task<IEnumerable<string>> SaveImagesAsync(IEnumerable<IFormFile> files,string contentRootPath);
        Task DeleteImageAsync(string folderPath);
    }
}
