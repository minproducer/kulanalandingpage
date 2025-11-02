-- Create database
CREATE DATABASE IF NOT EXISTS kulana_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE kulana_dev;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Config table - stores JSON configurations
CREATE TABLE IF NOT EXISTS configs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    config_key VARCHAR(50) UNIQUE NOT NULL,
    config_value TEXT NOT NULL,
    updated_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (updated_by) REFERENCES users(id)
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    image VARCHAR(500),
    description TEXT,
    status VARCHAR(100),
    size VARCHAR(100),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- FAQ table
CREATE TABLE IF NOT EXISTS faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Team members table
CREATE TABLE IF NOT EXISTS team_members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    bio TEXT,
    image VARCHAR(500),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user (password: kulana2025)
-- Note: You can generate new hash by opening http://localhost/kulana-api/generate-hash.php
INSERT INTO users (username, password, email) VALUES 
('admin', '$2y$10$YourNewHashHere', 'admin@kulana.com');

-- Alternative: Run this query to update password
-- UPDATE users SET password = '$2y$10$[new_hash_here]' WHERE username = 'admin';

-- Insert default configs
INSERT INTO configs (config_key, config_value) VALUES
('footer', '{"sections":{"companyInfo":{"enabled":true},"navigation":{"enabled":true},"contact":{"enabled":false},"social":{"enabled":false}},"copyright":{"enabled":true}}'),
('faq', '{"hero":{"enabled":true},"categoryFilter":{"enabled":true,"showAllOption":true},"faqs":{"enabled":true,"showCategoryBadges":true}}');

-- Insert current project
INSERT INTO projects (name, location, image, description, status, display_order) VALUES
('Coming Soon', 'Missouri', 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80', 'Premium apartment development project in progress', 'In Progress', 1);

-- Insert FAQs (từ data hiện tại)
INSERT INTO faqs (question, answer, category, display_order) VALUES
('What services does Kulana Development provide?', 'Kulana Development offers comprehensive development services from initial feasibility studies through turnkey delivery. Our services include site acquisition, entitlements, design coordination, procurement, and construction management.', 'Services', 1),
('What types of projects does Kulana Development specialize in?', 'We specialize in commercial, residential, and mixed-use developments. Our portfolio includes office buildings, retail spaces, residential towers, and large-scale master-planned communities.', 'Services', 2),
('How does Kulana Development ensure project quality?', 'Quality is ensured through rigorous vendor selection, continuous site oversight, detailed specifications, and a commitment to sustainable building practices. Every project phase undergoes thorough review by our experienced team.', 'Process', 3),
('What is the typical timeline for a development project?', 'Timelines vary based on project scope and complexity. A typical commercial development ranges from 18-36 months from feasibility to completion. We provide detailed schedules during the planning phase.', 'Process', 4),
('Does Kulana Development work with existing properties?', 'Yes, we handle both ground-up developments and adaptive reuse projects. We evaluate existing structures for renovation potential and can execute historic preservation alongside modern upgrades.', 'Services', 5),
('What regions does Kulana Development serve?', 'We primarily serve Texas and surrounding states, with recent expansion into Missouri. Our team has the capability to manage projects across multiple regions simultaneously.', 'Company', 6),
('How does Kulana Development approach sustainability?', 'Sustainability is integrated into every project. We pursue energy-efficient designs, sustainable materials, and certifications like LEED when appropriate. Our goal is to create lasting value while minimizing environmental impact.', 'Process', 7),
('Can Kulana Development assist with financing?', 'While we don''t provide direct financing, we work closely with financial institutions and investors. Our feasibility studies and market analysis support financing applications and investor presentations.', 'Partnerships', 8),
('What makes Kulana Development different from other developers?', 'Our integrated approach means one accountable team manages your project from concept to completion. We combine development expertise with construction management, eliminating coordination gaps and ensuring consistent quality.', 'Company', 9),
('How can I discuss a potential project with Kulana Development?', 'Contact us through our website or call directly. We''ll schedule an initial consultation to understand your vision, assess feasibility, and outline how we can bring your project to life.', 'Partnerships', 10);

-- Insert team members
INSERT INTO team_members (name, role, bio, image, display_order) VALUES
('Lana Petrovich', 'Chief Executive Officer', 'With over two decades of experience in real estate development and strategic leadership, Lana has successfully guided numerous high-profile projects from conception to completion.', '/Lana Petrovich.jpg', 1),
('Mike Shrum', 'Managing Partner', 'Mike brings extensive expertise in project financing and strategic planning. His background in investment banking and real estate development drives our financial strategy and growth initiatives.', '/Mike Shrum.jpg', 2),
('Dr. Danielle Nguyen', 'Director of Operation', 'Dr. Nguyen oversees all operational aspects of our projects. Her background in civil engineering and project management ensures excellence in execution and timely delivery.', '/Danielle Nguyen.jpg', 3),
('Christian Petrovich', 'Managing Partner', 'Christian specializes in construction management and vendor relations. His hands-on approach and deep industry knowledge ensure quality control throughout the building process.', '/Christian Petrovich.jpg', 4);
