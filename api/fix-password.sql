-- Quick Fix: Reset admin password to 'kulana2025'
-- Copy and run this in phpMyAdmin

USE kulana_dev;

-- Delete old user
DELETE FROM users WHERE username = 'admin';

-- Insert with PLAIN TEXT password (will be auto-hashed on first login)
INSERT INTO users (username, password, email) VALUES 
('admin', 'kulana2025', 'admin@kulana.com');

-- After first login, password will be automatically converted to bcrypt hash
