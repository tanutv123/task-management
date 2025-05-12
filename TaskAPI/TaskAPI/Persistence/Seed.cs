using Microsoft.EntityFrameworkCore;
using TaskAPI.Entities;
namespace TaskAPI.Persistence
{


    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new AppDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>()))
            {
                if (context.ProjectTasks.Any())
                {
                    // Data already seeded
                    return;
                }

                var moreTasks = new List<ProjectTask>
                {
                    new ProjectTask
                    {
                        Title = "Kiểm thử hệ thống",
                        Description = "Kiểm tra toàn bộ tính năng và hiệu suất hệ thống",
                        DeadlineFrom = DateTime.Parse("2025-05-15"),
                        DeadlineTo = DateTime.Parse("2025-05-30"),
                        Status = "Chưa bắt đầu",
                        Assignee = "Phạm Minh D",
                        Creator = "Lê Văn B",
                        CreatedDate = DateTime.Parse("2025-04-22"),
                        CompletedDate = null,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Name = "Viết test plan", IsCompleted = false },
                            new Subtask { Name = "Thực hiện test thủ công", IsCompleted = false },
                            new Subtask { Name = "Test hiệu suất", IsCompleted = false },
                            new Subtask { Name = "Tổng hợp báo cáo lỗi", IsCompleted = false }
                        }
                    },
                    new ProjectTask
                    {
                        Title = "Triển khai hệ thống",
                        Description = "Đưa hệ thống lên môi trường thật",
                        DeadlineFrom = DateTime.Parse("2025-06-01"),
                        DeadlineTo = DateTime.Parse("2025-06-05"),
                        Status = "Chưa bắt đầu",
                        Assignee = "Nguyễn Thị E",
                        Creator = "Trần Văn C",
                        CreatedDate = DateTime.Parse("2025-04-23"),
                        CompletedDate = null,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Name = "Chuẩn bị server", IsCompleted = false },
                            new Subtask { Name = "Cấu hình CI/CD", IsCompleted = false },
                            new Subtask { Name = "Đưa mã nguồn lên production", IsCompleted = false },
                            new Subtask { Name = "Kiểm tra sau triển khai", IsCompleted = false }
                        }
                    },
                    new ProjectTask
                    {
                        Title = "Thu thập phản hồi người dùng",
                        Description = "Lấy ý kiến người dùng về phiên bản beta",
                        DeadlineFrom = DateTime.Parse("2025-06-06"),
                        DeadlineTo = DateTime.Parse("2025-06-15"),
                        Status = "Chưa bắt đầu",
                        Assignee = "Lê Anh F",
                        Creator = "Trần Văn C",
                        CreatedDate = DateTime.Parse("2025-04-24"),
                        CompletedDate = null,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Name = "Tạo biểu mẫu khảo sát", IsCompleted = false },
                            new Subtask { Name = "Gửi khảo sát tới người dùng", IsCompleted = false },
                            new Subtask { Name = "Tổng hợp kết quả", IsCompleted = false },
                            new Subtask { Name = "Phân tích dữ liệu", IsCompleted = false }
                        }
                    },
                    new ProjectTask
                    {
                        Title = "Cập nhật giao diện mới",
                        Description = "Cập nhật UI theo phản hồi người dùng",
                        DeadlineFrom = DateTime.Parse("2025-06-16"),
                        DeadlineTo = DateTime.Parse("2025-06-25"),
                        Status = "Chưa bắt đầu",
                        Assignee = "Ngô Thanh G",
                        Creator = "Phạm Minh D",
                        CreatedDate = DateTime.Parse("2025-04-25"),
                        CompletedDate = null,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Name = "Thiết kế layout mới", IsCompleted = false },
                            new Subtask { Name = "Cập nhật CSS/JS", IsCompleted = false },
                            new Subtask { Name = "Kiểm tra hiển thị trên thiết bị", IsCompleted = false },
                            new Subtask { Name = "Tối ưu tốc độ", IsCompleted = false }
                        }
                    },
                    new ProjectTask
                    {
                        Title = "Xây dựng tài liệu hướng dẫn",
                        Description = "Viết tài liệu sử dụng cho người dùng cuối",
                        DeadlineFrom = DateTime.Parse("2025-06-26"),
                        DeadlineTo = DateTime.Parse("2025-07-01"),
                        Status = "Chưa bắt đầu",
                        Assignee = "Đinh Văn H",
                        Creator = "Lê Văn B",
                        CreatedDate = DateTime.Parse("2025-04-26"),
                        CompletedDate = null,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Name = "Tạo khung tài liệu", IsCompleted = false },
                            new Subtask { Name = "Viết nội dung chi tiết", IsCompleted = false },
                            new Subtask { Name = "Chèn hình minh họa", IsCompleted = false },
                            new Subtask { Name = "Kiểm tra chính tả và format", IsCompleted = false }
                        }
                    },
                    new ProjectTask
                    {
                        Title = "Tối ưu cơ sở dữ liệu",
                        Description = "Cải thiện hiệu năng truy vấn",
                        DeadlineFrom = DateTime.Parse("2025-07-02"),
                        DeadlineTo = DateTime.Parse("2025-07-10"),
                        Status = "Chưa bắt đầu",
                        Assignee = "Vũ Thị I",
                        Creator = "Nguyễn Văn A",
                        CreatedDate = DateTime.Parse("2025-04-27"),
                        CompletedDate = null,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Name = "Xem xét index hiện tại", IsCompleted = false },
                            new Subtask { Name = "Thêm index cần thiết", IsCompleted = false },
                            new Subtask { Name = "Tối ưu query", IsCompleted = false },
                            new Subtask { Name = "Test lại hiệu suất", IsCompleted = false }
                        }
                    },
                    new ProjectTask
                    {
                        Title = "Tích hợp thanh toán",
                        Description = "Tích hợp cổng thanh toán trực tuyến",
                        DeadlineFrom = DateTime.Parse("2025-07-11"),
                        DeadlineTo = DateTime.Parse("2025-07-20"),
                        Status = "Chưa bắt đầu",
                        Assignee = "Nguyễn Minh J",
                        Creator = "Trần Văn C",
                        CreatedDate = DateTime.Parse("2025-04-28"),
                        CompletedDate = null,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Name = "Đăng ký tài khoản đối tác", IsCompleted = false },
                            new Subtask { Name = "Lấy API key", IsCompleted = false },
                            new Subtask { Name = "Tích hợp frontend/backend", IsCompleted = false },
                            new Subtask { Name = "Kiểm thử giao dịch", IsCompleted = false }
                        }
                    },
                    new ProjectTask
                    {
                        Title = "Triển khai đăng nhập bằng Google",
                        Description = "Cho phép người dùng đăng nhập qua tài khoản Google",
                        DeadlineFrom = DateTime.Parse("2025-07-21"),
                        DeadlineTo = DateTime.Parse("2025-07-30"),
                        Status = "Chưa bắt đầu",
                        Assignee = "Lê Thị K",
                        Creator = "Phạm Minh D",
                        CreatedDate = DateTime.Parse("2025-04-29"),
                        CompletedDate = null,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Name = "Tạo ứng dụng Google OAuth", IsCompleted = false },
                            new Subtask { Name = "Tích hợp OAuth vào frontend", IsCompleted = false },
                            new Subtask { Name = "Xử lý token phía backend", IsCompleted = false },
                            new Subtask { Name = "Kiểm tra đăng nhập", IsCompleted = false }
                        }
                    },
                    new ProjectTask
                    {
                        Title = "Cải thiện bảo mật",
                        Description = "Tăng cường các biện pháp bảo vệ dữ liệu",
                        DeadlineFrom = DateTime.Parse("2025-08-01"),
                        DeadlineTo = DateTime.Parse("2025-08-10"),
                        Status = "Chưa bắt đầu",
                        Assignee = "Trần Anh L",
                        Creator = "Lê Văn B",
                        CreatedDate = DateTime.Parse("2025-04-30"),
                        CompletedDate = null,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Name = "Bật HTTPS", IsCompleted = false },
                            new Subtask { Name = "Thêm CSP headers", IsCompleted = false },
                            new Subtask { Name = "Mã hóa thông tin nhạy cảm", IsCompleted = false },
                            new Subtask { Name = "Test lỗ hổng bảo mật", IsCompleted = false }
                        }
                    },
                    new ProjectTask
                    {
                        Title = "Phân tích dữ liệu người dùng",
                        Description = "Sử dụng công cụ để phân tích hành vi người dùng",
                        DeadlineFrom = DateTime.Parse("2025-08-11"),
                        DeadlineTo = DateTime.Parse("2025-08-20"),
                        Status = "Chưa bắt đầu",
                        Assignee = "Phạm Quốc M",
                        Creator = "Nguyễn Văn A",
                        CreatedDate = DateTime.Parse("2025-05-01"),
                        CompletedDate = null,
                        Subtasks = new List<Subtask>
                        {
                            new Subtask { Name = "Tích hợp Google Analytics", IsCompleted = false },
                            new Subtask { Name = "Theo dõi sự kiện người dùng", IsCompleted = false },
                            new Subtask { Name = "Phân tích dữ liệu thu thập", IsCompleted = false },
                            new Subtask { Name = "Đề xuất cải tiến", IsCompleted = false }
                        }
                    },
                };

                foreach(var task in moreTasks)
                {
                    var i = 1;
                    task.AssigneeId = new Guid();
                    task.CreatorId = new Guid();
                    task.Department = "IT";
                    foreach (var subtask in task.Subtasks)
                    {
                        subtask.Priority = i++;
                    }
                }

                context.ProjectTasks.AddRange(moreTasks);
                context.SaveChanges();
            }
        }
    }

}
