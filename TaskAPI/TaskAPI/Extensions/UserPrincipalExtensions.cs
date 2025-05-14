using System.Security.Claims;

namespace TaskAPI.Extensions
{
    public static class UserPrincipalExtensions
    {
        public static Guid GetUserId(this ClaimsPrincipal user)
        {
            Guid result;
            if (user == null)
            {
                throw new ArgumentNullException("User is null");
            } else if (user.FindFirst(ClaimTypes.NameIdentifier) == null)
            {
                throw new ArgumentNullException("ID Not found");

            } else if(!Guid.TryParse(user.FindFirst(ClaimTypes.NameIdentifier).Value, out result))
            {
                throw new Exception("ID Invalid");
            }
            return result;
        }

        public static string GetUserName(this ClaimsPrincipal user)
        {
            if (user == null)
            {
                throw new ArgumentNullException("User is null");
            }
            else if (user.FindFirst(ClaimTypes.NameIdentifier) == null)
            {
                throw new ArgumentNullException("ID Not found");

            }
            return user.FindFirst(ClaimTypes.Name).Value;
        }

        public static string GetCustomClaim(this ClaimsPrincipal user, string claimName)
        {
            if (user == null)
            {
                throw new ArgumentNullException("User is null");
            }
            else if (user.FindFirst(claimName) == null)
            {
                throw new ArgumentNullException("ID Not found");

            }
            return user.FindFirst(claimName).Value;
        }
    }
}
