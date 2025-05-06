namespace TaskAPI.Extensions
{
    public static class DateTimeExtensions
    {
        private static readonly TimeZoneInfo VietnamTimeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");

        public static DateTime GetVietnamLocalTime(this DateTime utcDateTime)
        {
            return TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, VietnamTimeZone);
        }

        public static DateTime GetVietnamLocalNow()
        {
            return GetVietnamLocalTime(DateTime.UtcNow);
        }
    }

}
