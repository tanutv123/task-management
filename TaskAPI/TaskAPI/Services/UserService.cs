using System.Text.Json;
using TaskAPI.DTOs;

namespace TaskAPI.Services
{
    public class UserService
    {
        private readonly HttpClient _httpClient;

        public UserService(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("UserService");
        }

        public async Task<UserDto?> GetUserByIdAsync(string userId)
        {
            var response = await _httpClient.GetAsync($"/users/{userId}");

            if (!response.IsSuccessStatusCode)
                return null;

            var content = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<UserDto>(content, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
        }
    }

}
