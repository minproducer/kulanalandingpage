-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th10 03, 2025 lúc 06:49 PM
-- Phiên bản máy phục vụ: 10.4.25-MariaDB
-- Phiên bản PHP: 7.4.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `kulana_dev`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `configs`
--

CREATE TABLE `configs` (
  `id` int(11) NOT NULL,
  `config_key` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `config_value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `configs`
--

INSERT INTO `configs` (`id`, `config_key`, `config_value`, `updated_by`, `created_at`, `updated_at`) VALUES
(4, 'footer', '{\"sections\":{\"companyInfo\":{\"enabled\":true,\"logoUrl\":\"http:\\/\\/localhost\\/kulana-uploads\\/img_6907e8c6a3c762.26363680.png\",\"description\":\"Transforming concepts into high-performing assets with precision, integrity, and commitment to long-term value.\"},\"navigation\":{\"enabled\":true,\"title\":\"Quick Links\",\"links\":[{\"name\":\"Home\",\"path\":\"\\/\"},{\"name\":\"Projects\",\"path\":\"\\/projects\"},{\"name\":\"Management Team\",\"path\":\"\\/management-team\"},{\"name\":\"FAQ\",\"path\":\"\\/faq\"}]},\"contact\":{\"enabled\":true,\"title\":\"Contact\",\"email\":\"info@kulanadevelopment.com\",\"phone\":\"(555) 123-4567\",\"location\":\"Texas & Southeast\"},\"social\":{\"enabled\":true,\"title\":\"Follow Us\",\"links\":{\"email\":\"#\",\"linkedin\":\"#\",\"facebook\":\"#\"},\"platforms\":{\"email\":{\"enabled\":true,\"value\":\"\"},\"linkedin\":{\"enabled\":true,\"username\":\"#\"},\"facebook\":{\"enabled\":true,\"username\":\"#\"},\"twitter\":{\"enabled\":true,\"username\":\"#\"},\"instagram\":{\"enabled\":true,\"username\":\"#\"},\"youtube\":{\"enabled\":true,\"username\":\"#\"}}}},\"copyright\":{\"enabled\":true,\"text\":\"Kulana Development\",\"year\":2025}}', NULL, '2025-11-02 22:22:56', '2025-11-02 23:27:02'),
(8, 'faq', '{\"hero\":{\"enabled\":true,\"backgroundImage\":\"https:\\/\\/images.unsplash.com\\/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1920&q=80\",\"title\":\"FAQ\",\"titleHighlight\":\"FAQ\",\"subtitle\":\"Everything you need to know about partnering with Kulana Development\"},\"categoryFilter\":{\"enabled\":true,\"showAllOption\":true},\"faqs\":{\"enabled\":true,\"showCategoryBadges\":true},\"faqItems\":[{\"id\":1,\"question\":\"What types of projects does Kulana Development handle?\",\"answer\":\"We specialize in commercial, residential, and mixed-use developments across Texas and the Southeast. Our portfolio includes high-rise construction, historic restorations, medical facilities, tech campuses, and master-planned communities. From feasibility studies to turnkey delivery, we manage every aspect of development with precision and accountability.\",\"category\":\"General\"},{\"id\":2,\"question\":\"What regions do you serve?\",\"answer\":\"We primarily serve Texas and the Southeast region, with completed projects in Austin, Dallas, Houston, San Antonio, Fort Worth, and surrounding metropolitan areas. Our experience spans urban infill developments to suburban master-planned communities.\",\"category\":\"General\"},{\"id\":3,\"question\":\"How long does a typical project take?\",\"answer\":\"Project timelines vary based on scope, complexity, and regulatory requirements. A commercial renovation might take 6-12 months, while a high-rise development typically requires 24-36 months. We provide detailed schedules during feasibility and maintain transparent communication throughout construction with regular milestone updates.\",\"category\":\"Process\"},{\"id\":4,\"question\":\"What is your approach to project management?\",\"answer\":\"We employ The Kulana Way\\u2014a proven methodology featuring milestone gates, real-time cost tracking, and schedule health checks. Our integrated team approach ensures one point of accountability from concept through completion, with regular reporting and proactive problem-solving.\",\"category\":\"Process\"},{\"id\":5,\"question\":\"Do you handle project financing?\",\"answer\":\"We work closely with investors and can connect you with our network of financing partners, including commercial banks, private equity firms, and institutional lenders. Our team provides comprehensive feasibility studies and financial modeling to support funding decisions and investor presentations.\",\"category\":\"Services\"},{\"id\":6,\"question\":\"Can you work with my existing architect or design team?\",\"answer\":\"Absolutely! We excel at coordinating with architects, engineers, designers, and other stakeholders. Our design coordination services ensure seamless collaboration, value engineering, and constructability reviews to optimize both design intent and project efficiency.\",\"category\":\"Services\"}]}', NULL, '2025-11-02 23:31:52', '2025-11-02 23:32:45'),
(9, 'home', '{\"hero\":{\"enabled\":true,\"backgroundImage\":\"https:\\/\\/images.unsplash.com\\/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1920&q=80\",\"title\":\"Trusted Development, Built to Last\",\"showSeparator\":true},\"introduction\":{\"enabled\":true,\"text\":\"With decades of combined experience, Kulana Development partners with investors, builders, and architects to transform concepts into high-performing assets. From feasibility and design to construction and delivery, we manage each stage with precision, integrity, and a commitment to long-term value.\"},\"sections\":[{\"id\":\"what-we-deliver\",\"enabled\":true,\"title\":\"What We Deliver\",\"description\":\"From Feasibility to Turnkey Delivery, we manage entitlements, design coordination, procurement, and site execution\\u2014one accountable team focused on outcomes that endure and schedule health checks keep your project on time, on spec, and built to last.\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80\",\"imagePosition\":\"right\",\"backgroundColor\":\"white\"},{\"id\":\"how-we-build\",\"enabled\":true,\"title\":\"How We Build - The Kulana Way\",\"description\":\"Results You Can Measure \\u2014 Milestone gates, cost tracking, and schedule health checks keep your project on time, on spec, and built to last.\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80\",\"imagePosition\":\"right\",\"backgroundColor\":\"ivory\"},{\"id\":\"culture\",\"enabled\":true,\"title\":\"A Culture Built to Last\",\"description\":\"Lessons learned feed every new project\\u2014so each delivery is stronger than the last. We put people first\\u2014safety, respect, and accountability\\u2014that is how quality, schedule, and budget follow.\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&q=80\",\"imagePosition\":\"left\",\"backgroundColor\":\"white\"}]}', NULL, '2025-11-02 23:40:15', '2025-11-02 23:43:32'),
(10, 'team', '{\"hero\":{\"enabled\":true,\"backgroundImage\":\"https:\\/\\/images.unsplash.com\\/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=80\",\"title\":\"Management Team\",\"titleHighlight\":\"Team\"},\"members\":[{\"id\":1762127304141,\"name\":\"123123\",\"title\":\"CEP\",\"bio\":\"q\\u01b0eqweqwe\",\"image\":\"http:\\/\\/localhost\\/kulana-uploads\\/img_6907edd2788af9.41453452.jpg\"}]}', NULL, '2025-11-02 23:48:36', '2025-11-02 23:48:36'),
(12, 'page_settings', '{\"home\":true,\"team\":true,\"projects\":true,\"faq\":true}', NULL, '2025-11-03 07:25:36', '2025-11-03 17:38:24'),
(13, 'projects', '{\"projects\":[{\"id\":1,\"name\":\"Modern Office Complex\",\"location\":\"Downtown Kansas City, Missouri\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80\",\"description\":\"State-of-the-art office complex with sustainable design\",\"status\":\"Completed\",\"size\":\"150,000 sq ft\",\"link\":\"\",\"detailDescription\":\"This premium office complex represents the pinnacle of modern commercial architecture. Featuring cutting-edge sustainable design, energy-efficient systems, and collaborative workspaces, it sets a new standard for business environments in the Midwest. The building incorporates smart building technology, green roofing systems, and natural lighting throughout to create an optimal work environment.\",\"completionDate\":\"December 2023\",\"clientName\":\"Metro Development Group\",\"imageGallery\":[\"https:\\/\\/images.unsplash.com\\/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80\"],\"specifications\":[{\"key\":\"Total Floors\",\"value\":\"12 floors\"},{\"key\":\"Parking Capacity\",\"value\":\"500 vehicles\"},{\"key\":\"Energy Rating\",\"value\":\"LEED Platinum\"},{\"key\":\"Construction Duration\",\"value\":\"24 months\"}]},{\"id\":2,\"name\":\"Riverside Residential Tower\",\"location\":\"Kansas City, Missouri\",\"image\":\"https:\\/\\/images.unsplash.com\\/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80\",\"description\":\"Luxury residential tower with panoramic city views\",\"status\":\"In Progress\",\"size\":\"200,000 sq ft\",\"link\":\"\",\"detailDescription\":\"An iconic residential tower offering unparalleled luxury living in the heart of Kansas City. With breathtaking views of the Missouri River and downtown skyline, this development features premium amenities including a rooftop infinity pool, state-of-the-art fitness center, and concierge services.\",\"completionDate\":\"June 2025\",\"clientName\":\"Riverside Living LLC\",\"imageGallery\":[\"https:\\/\\/images.unsplash.com\\/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80\",\"https:\\/\\/images.unsplash.com\\/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80\"],\"specifications\":[{\"key\":\"Total Units\",\"value\":\"180 apartments\"},{\"key\":\"Floors\",\"value\":\"25 floors\"},{\"key\":\"Amenities\",\"value\":\"Pool, Gym, Lounge, Parking\"},{\"key\":\"Expected Completion\",\"value\":\"Q2 2025\"}]},{\"id\":3,\"name\":\"aaaa\",\"location\":\"Texas\",\"image\":\"http:\\/\\/localhost\\/kulana-uploads\\/6908e7f595674_1762191349.jpg\",\"description\":\"aaaaaaa\",\"status\":\"Completed\",\"size\":\"123\",\"link\":\"\",\"imageGallery\":[\"http:\\/\\/localhost\\/kulana-uploads\\/6908e7f97a1da_1762191353.jpg\",\"http:\\/\\/localhost\\/kulana-uploads\\/6908e7fc5345b_1762191356.png\",\"http:\\/\\/localhost\\/kulana-uploads\\/6908e7fec5f4e_1762191358.jpg\"],\"completionDate\":\"2025\"}]}', NULL, '2025-11-03 07:25:58', '2025-11-03 17:36:50');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `faqs`
--

CREATE TABLE `faqs` (
  `id` int(11) NOT NULL,
  `question` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `faqs`
--

INSERT INTO `faqs` (`id`, `question`, `answer`, `category`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'What services does Kulana Development provide?', 'Kulana Development offers comprehensive development services from initial feasibility studies through turnkey delivery. Our services include site acquisition, entitlements, design coordination, procurement, and construction management.', 'Services', 1, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11'),
(2, 'What types of projects does Kulana Development specialize in?', 'We specialize in commercial, residential, and mixed-use developments. Our portfolio includes office buildings, retail spaces, residential towers, and large-scale master-planned communities.', 'Services', 2, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11'),
(3, 'How does Kulana Development ensure project quality?', 'Quality is ensured through rigorous vendor selection, continuous site oversight, detailed specifications, and a commitment to sustainable building practices. Every project phase undergoes thorough review by our experienced team.', 'Process', 3, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11'),
(4, 'What is the typical timeline for a development project?', 'Timelines vary based on project scope and complexity. A typical commercial development ranges from 18-36 months from feasibility to completion. We provide detailed schedules during the planning phase.', 'Process', 4, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11'),
(5, 'Does Kulana Development work with existing properties?', 'Yes, we handle both ground-up developments and adaptive reuse projects. We evaluate existing structures for renovation potential and can execute historic preservation alongside modern upgrades.', 'Services', 5, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11'),
(6, 'What regions does Kulana Development serve?', 'We primarily serve Texas and surrounding states, with recent expansion into Missouri. Our team has the capability to manage projects across multiple regions simultaneously.', 'Company', 6, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11'),
(7, 'How does Kulana Development approach sustainability?', 'Sustainability is integrated into every project. We pursue energy-efficient designs, sustainable materials, and certifications like LEED when appropriate. Our goal is to create lasting value while minimizing environmental impact.', 'Process', 7, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11'),
(8, 'Can Kulana Development assist with financing?', 'While we don\'t provide direct financing, we work closely with financial institutions and investors. Our feasibility studies and market analysis support financing applications and investor presentations.', 'Partnerships', 8, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11'),
(9, 'What makes Kulana Development different from other developers?', 'Our integrated approach means one accountable team manages your project from concept to completion. We combine development expertise with construction management, eliminating coordination gaps and ensuring consistent quality.', 'Company', 9, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11'),
(10, 'How can I discuss a potential project with Kulana Development?', 'Contact us through our website or call directly. We\'ll schedule an initial consultation to understand your vision, assess feasibility, and outline how we can bring your project to life.', 'Partnerships', 10, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `projects`
--

INSERT INTO `projects` (`id`, `name`, `location`, `image`, `description`, `status`, `size`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Coming Soon', 'Missouri', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', 'Premium apartment development project in progress', 'In Progress', NULL, 1, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `team_members`
--

CREATE TABLE `team_members` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bio` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `display_order` int(11) DEFAULT 0,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `team_members`
--

INSERT INTO `team_members` (`id`, `name`, `role`, `bio`, `image`, `display_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Lana Petrovich', 'Chief Executive Officer', 'With over two decades of experience in real estate development and strategic leadership, Lana has successfully guided numerous high-profile projects from conception to completion.', '/Lana Petrovich.jpg', 1, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11'),
(2, 'Mike Shrum', 'Managing Partner', 'Mike brings extensive expertise in project financing and strategic planning. His background in investment banking and real estate development drives our financial strategy and growth initiatives.', '/Mike Shrum.jpg', 2, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11'),
(3, 'Dr. Danielle Nguyen', 'Director of Operation', 'Dr. Nguyen oversees all operational aspects of our projects. Her background in civil engineering and project management ensures excellence in execution and timely delivery.', '/Danielle Nguyen.jpg', 3, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11'),
(4, 'Christian Petrovich', 'Managing Partner', 'Christian specializes in construction management and vendor relations. His hands-on approach and deep industry knowledge ensure quality control throughout the building process.', '/Christian Petrovich.jpg', 4, 1, '2025-11-02 21:08:11', '2025-11-02 21:08:11');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `created_at`, `updated_at`) VALUES
(2, 'admin', '$2y$10$vVdql.ARvgT9CGttVNFyjeF4c7moWzCHMGaa/MKb95x0ds87.3Q6q', 'admin@kulana.com', '2025-11-02 21:17:40', '2025-11-03 17:35:18');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `configs`
--
ALTER TABLE `configs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `config_key` (`config_key`),
  ADD KEY `updated_by` (`updated_by`);

--
-- Chỉ mục cho bảng `faqs`
--
ALTER TABLE `faqs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `team_members`
--
ALTER TABLE `team_members`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `configs`
--
ALTER TABLE `configs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `faqs`
--
ALTER TABLE `faqs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `team_members`
--
ALTER TABLE `team_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `configs`
--
ALTER TABLE `configs`
  ADD CONSTRAINT `configs_ibfk_1` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
