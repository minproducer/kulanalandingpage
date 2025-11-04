import { useApp } from '../contexts/AppContext';
import { translations } from '../locales/translations';

const Guide = () => {
  const { language } = useApp();
  const t = translations[language];

  const guideContent = {
    en: {
      gettingStarted: {
        title: 'Getting Started',
        content: [
          {
            subtitle: 'Dashboard Overview',
            text: 'The dashboard is your central hub. Here you can see quick statistics about your projects, team members, and active pages. Use the sidebar to navigate to different sections.',
          },
          {
            subtitle: 'Navigation',
            text: 'The sidebar on the left contains all main sections: Dashboard, Home Settings, Projects Management, Team Settings, Footer Settings, FAQ Settings, and this Guide. On mobile, tap the hamburger menu to access the sidebar.',
          },
          {
            subtitle: 'Language & Theme',
            text: 'Use the language toggle (🌐) to switch between English and Vietnamese. Use the theme toggle (☀️/🌙) to switch between light and dark mode. Your preferences are saved automatically.',
          },
        ],
      },
      managingProjects: {
        title: 'Managing Projects',
        content: [
          {
            subtitle: 'Adding a New Project',
            text: 'Click "Add New Project" button. Fill in all required fields: Name, Location, Status, Image, and Description. You can upload an image directly or provide a URL. Optional fields include Size, Link, Completion Date, Client Name, Image Gallery, and Specifications.',
          },
          {
            subtitle: 'Editing Projects',
            text: 'Click the edit (✏️) button on any project card or table row. Modify the fields you want to change and click "Save Project". Changes are applied immediately.',
          },
          {
            subtitle: 'Deleting Projects',
            text: 'Click the delete (🗑️) button on any project. Confirm the deletion when prompted. This action cannot be undone.',
          },
          {
            subtitle: 'Project Status',
            text: 'Projects can have three statuses: Completed (green), In Progress (blue), or Coming Soon (yellow). Choose the appropriate status when creating or editing a project.',
          },
          {
            subtitle: 'Image Gallery',
            text: 'Add multiple images to showcase your project. Each image can be uploaded or linked via URL. Use the (+) button to add more images and the delete button to remove them.',
          },
        ],
      },
      managingTeam: {
        title: 'Managing Team',
        content: [
          {
            subtitle: 'Adding Team Members',
            text: 'Click "Add Team Member" button. Provide the member\'s Name, Position, Photo, and Description. The photo can be uploaded or linked via URL.',
          },
          {
            subtitle: 'Editing Team Members',
            text: 'Click the edit button on any team member card. Update the information and click "Save Team Member" to apply changes.',
          },
          {
            subtitle: 'Organizing Team',
            text: 'Team members are displayed in the order they were added. Consider adding them in order of seniority or alphabetically for better organization.',
          },
        ],
      },
      managingContent: {
        title: 'Managing Content',
        content: [
          {
            subtitle: 'Home Settings',
            text: 'Edit the hero section with a compelling title, subtitle, and image. Add navbar logo and text. Create multiple content sections with titles, content, and images to build your homepage.',
          },
          {
            subtitle: 'Footer Settings',
            text: 'Customize your footer with a logo, description, contact information, and social media links. This appears on every page of your website.',
          },
          {
            subtitle: 'FAQ Settings',
            text: 'Add frequently asked questions with clear answers. Set a hero title and background image for the FAQ page. Questions are displayed in the order added.',
          },
        ],
      },
      tips: {
        title: 'Tips & Tricks',
        content: [
          {
            subtitle: 'Image Upload vs URL',
            text: 'Upload: Best for new images. Files are stored on your server. URL: Best for existing images hosted elsewhere. Ensure URLs are permanent and accessible.',
          },
          {
            subtitle: 'Image Optimization',
            text: 'Before uploading, optimize images for web: resize large images, use JPG for photos (smaller file size), use PNG for logos/graphics (better quality). Recommended max size: 1920x1080px.',
          },
          {
            subtitle: 'Writing Descriptions',
            text: 'Keep descriptions concise but informative. Use short paragraphs and bullet points for readability. Highlight key features and benefits.',
          },
          {
            subtitle: 'Regular Backups',
            text: 'While your data is automatically saved, consider taking occasional screenshots or notes of your configurations as a backup reference.',
          },
          {
            subtitle: 'Mobile Testing',
            text: 'After making changes, view your website on mobile devices to ensure everything looks good on smaller screens.',
          },
          {
            subtitle: 'Content Consistency',
            text: 'Maintain consistent tone, style, and formatting across all sections for a professional appearance.',
          },
        ],
      },
    },
    vi: {
      gettingStarted: {
        title: 'Bắt đầu',
        content: [
          {
            subtitle: 'Tổng quan Dashboard',
            text: 'Dashboard là trung tâm điều khiển của bạn. Tại đây bạn có thể xem thống kê nhanh về dự án, thành viên đội ngũ và các trang đang hoạt động. Sử dụng thanh bên để điều hướng đến các phần khác nhau.',
          },
          {
            subtitle: 'Điều hướng',
            text: 'Thanh bên bên trái chứa tất cả các phần chính: Tổng quan, Cài đặt Trang chủ, Quản lý Dự án, Cài đặt Đội ngũ, Cài đặt Footer, Cài đặt FAQ, và Hướng dẫn này. Trên mobile, nhấn vào menu hamburger để truy cập thanh bên.',
          },
          {
            subtitle: 'Ngôn ngữ & Giao diện',
            text: 'Sử dụng nút chuyển ngôn ngữ (🌐) để đổi giữa Tiếng Anh và Tiếng Việt. Sử dụng nút chuyển giao diện (☀️/🌙) để đổi giữa chế độ sáng và tối. Tùy chọn của bạn sẽ được lưu tự động.',
          },
        ],
      },
      managingProjects: {
        title: 'Quản lý Dự án',
        content: [
          {
            subtitle: 'Thêm Dự án mới',
            text: 'Nhấn nút "Thêm Dự án mới". Điền tất cả các trường bắt buộc: Tên, Địa điểm, Trạng thái, Hình ảnh, và Mô tả. Bạn có thể tải ảnh lên trực tiếp hoặc cung cấp URL. Các trường tùy chọn bao gồm Quy mô, Liên kết, Ngày Hoàn thành, Tên Khách hàng, Thư viện Ảnh, và Thông số.',
          },
          {
            subtitle: 'Chỉnh sửa Dự án',
            text: 'Nhấn nút sửa (✏️) trên bất kỳ thẻ dự án hoặc hàng trong bảng. Thay đổi các trường bạn muốn và nhấn "Lưu Dự án". Thay đổi được áp dụng ngay lập tức.',
          },
          {
            subtitle: 'Xóa Dự án',
            text: 'Nhấn nút xóa (🗑️) trên bất kỳ dự án nào. Xác nhận xóa khi được nhắc. Hành động này không thể hoàn tác.',
          },
          {
            subtitle: 'Trạng thái Dự án',
            text: 'Dự án có thể có ba trạng thái: Hoàn thành (xanh lá), Đang thực hiện (xanh dương), hoặc Sắp triển khai (vàng). Chọn trạng thái phù hợp khi tạo hoặc chỉnh sửa dự án.',
          },
          {
            subtitle: 'Thư viện Ảnh',
            text: 'Thêm nhiều ảnh để giới thiệu dự án của bạn. Mỗi ảnh có thể được tải lên hoặc liên kết qua URL. Sử dụng nút (+) để thêm ảnh và nút xóa để loại bỏ chúng.',
          },
        ],
      },
      managingTeam: {
        title: 'Quản lý Đội ngũ',
        content: [
          {
            subtitle: 'Thêm Thành viên',
            text: 'Nhấn nút "Thêm Thành viên". Cung cấp Họ tên, Chức vụ, Ảnh, và Mô tả của thành viên. Ảnh có thể được tải lên hoặc liên kết qua URL.',
          },
          {
            subtitle: 'Chỉnh sửa Thành viên',
            text: 'Nhấn nút sửa trên bất kỳ thẻ thành viên nào. Cập nhật thông tin và nhấn "Lưu Thành viên" để áp dụng thay đổi.',
          },
          {
            subtitle: 'Sắp xếp Đội ngũ',
            text: 'Thành viên được hiển thị theo thứ tự đã thêm. Hãy xem xét thêm họ theo thứ tự cấp bậc hoặc theo bảng chữ cái để tổ chức tốt hơn.',
          },
        ],
      },
      managingContent: {
        title: 'Quản lý Nội dung',
        content: [
          {
            subtitle: 'Cài đặt Trang chủ',
            text: 'Chỉnh sửa phần hero với tiêu đề, phụ đề và hình ảnh hấp dẫn. Thêm logo và chữ cho navbar. Tạo nhiều phần nội dung với tiêu đề, nội dung và hình ảnh để xây dựng trang chủ.',
          },
          {
            subtitle: 'Cài đặt Footer',
            text: 'Tùy chỉnh footer với logo, mô tả, thông tin liên hệ và liên kết mạng xã hội. Phần này xuất hiện trên mọi trang của website.',
          },
          {
            subtitle: 'Cài đặt FAQ',
            text: 'Thêm các câu hỏi thường gặp với câu trả lời rõ ràng. Đặt tiêu đề và ảnh nền hero cho trang FAQ. Câu hỏi được hiển thị theo thứ tự đã thêm.',
          },
        ],
      },
      tips: {
        title: 'Mẹo & Thủ thuật',
        content: [
          {
            subtitle: 'Tải ảnh lên vs URL',
            text: 'Tải lên: Tốt nhất cho ảnh mới. File được lưu trên máy chủ. URL: Tốt nhất cho ảnh đã có sẵn ở nơi khác. Đảm bảo URL là vĩnh viễn và có thể truy cập.',
          },
          {
            subtitle: 'Tối ưu Hình ảnh',
            text: 'Trước khi tải lên, tối ưu ảnh cho web: thay đổi kích thước ảnh lớn, dùng JPG cho ảnh (file nhỏ hơn), dùng PNG cho logo/đồ họa (chất lượng tốt hơn). Kích thước đề xuất tối đa: 1920x1080px.',
          },
          {
            subtitle: 'Viết Mô tả',
            text: 'Giữ mô tả ngắn gọn nhưng đầy đủ thông tin. Sử dụng đoạn văn ngắn và dấu đầu dòng để dễ đọc. Làm nổi bật các tính năng và lợi ích chính.',
          },
          {
            subtitle: 'Sao lưu Thường xuyên',
            text: 'Mặc dù dữ liệu được lưu tự động, hãy xem xét chụp ảnh màn hình hoặc ghi chú cấu hình thỉnh thoảng để làm tài liệu tham khảo.',
          },
          {
            subtitle: 'Kiểm tra Mobile',
            text: 'Sau khi thay đổi, xem website trên thiết bị di động để đảm bảo mọi thứ hiển thị tốt trên màn hình nhỏ.',
          },
          {
            subtitle: 'Nhất quán Nội dung',
            text: 'Duy trì giọng điệu, phong cách và định dạng nhất quán trên tất cả các phần để có vẻ ngoài chuyên nghiệp.',
          },
        ],
      },
    },
  };

  const content = guideContent[language];

  const sections = [
    { id: 'getting-started', data: content.gettingStarted, icon: '🚀' },
    { id: 'managing-projects', data: content.managingProjects, icon: '📁' },
    { id: 'managing-team', data: content.managingTeam, icon: '👥' },
    { id: 'managing-content', data: content.managingContent, icon: '✏️' },
    { id: 'tips', data: content.tips, icon: '💡' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">📚</span>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t.guide.title}</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{t.guide.subtitle}</p>
      </div>

      {/* Table of Contents */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span>📋</span>
          {t.guide.toc}
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className="flex items-start gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all text-left group"
            >
              <span className="text-2xl">{section.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {section.data.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      {sections.map((section) => (
        <div
          key={section.id}
          id={section.id}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sm:p-8 scroll-mt-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">{section.icon}</span>
            {section.data.title}
          </h2>
          <div className="space-y-6">
            {section.data.content.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-500 dark:border-blue-400 pl-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.subtitle}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Footer Note */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <span className="text-2xl">ℹ️</span>
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
              {language === 'en' ? 'Need Help?' : 'Cần Hỗ trợ?'}
            </h3>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              {language === 'en'
                ? 'If you encounter any issues or have questions, please contact the technical support team.'
                : 'Nếu bạn gặp bất kỳ vấn đề nào hoặc có câu hỏi, vui lòng liên hệ với đội ngũ hỗ trợ kỹ thuật.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
