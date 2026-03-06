using Microsoft.AspNetCore.Http;
namespace WEB_API.BLL.Services.Storage
{
    public class StorageService : IStorageService
    {
        public async Task<string?> SaveImageAsync(IFormFile file, string contentRootPath)
        {
            try
            {
                var types = file.ContentType.Split('/');
                if (types.Length != 2 || types[0] != "image")
                {
                    return null;
                }

                string baseFolder = Path.Combine(contentRootPath, "Images");
                Directory.CreateDirectory(baseFolder);
                string extension = Path.GetExtension(file.FileName);
                string imageName = $"{Guid.NewGuid()}{extension}";
                string imagePath = Path.Combine(baseFolder, imageName);

                using (var stream = File.Create(imagePath))
                {
                    await file.CopyToAsync(stream);
                }

                return imageName;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return null;
            }
        }

        public async Task<IEnumerable<string>> SaveImagesAsync(IEnumerable<IFormFile> files, string contentRootPath)
        {
            var tasks = files.Select(file => SaveImageAsync(file, contentRootPath));
            var results = await Task.WhenAll(tasks);
            return results.Where(res => res != null)!;
        }

        public async Task DeleteImageAsync(string imagePath)
        {
            if (Directory.Exists(imagePath))
            {
                try
                {
                    await Task.Run(() =>
                    {
                        Directory.Delete(imagePath, true);
                    });
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);
                }
            }
        }
    }
}
