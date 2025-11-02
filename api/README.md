# Kulana Development - Backend API

Backend PHP với MySQL cho Kulana Development Admin Panel.

## Setup

### 1. Cài đặt XAMPP/WAMP/LAMP

- Download và cài đặt XAMPP: https://www.apachefriends.org/
- Khởi động Apache và MySQL

### 2. Tạo Database

1. Mở phpMyAdmin: http://localhost/phpmyadmin
2. Import file `api/database.sql`
3. Database `kulana_dev` sẽ được tạo với tables và sample data

### 3. Cấu hình Database

Chỉnh sửa `api/config/database.php` nếu cần:

```php
private $host = "localhost";
private $db_name = "kulana_dev";
private $username = "root";
private $password = ""; // Thay đổi nếu có password
```

### 4. Copy API folder

Copy folder `api/` vào thư mục `htdocs` (XAMPP) hoặc `www` (WAMP):

- Windows XAMPP: `C:\xampp\htdocs\kulana-api\`
- Mac XAMPP: `/Applications/XAMPP/htdocs/kulana-api/`

### 5. Test API

Truy cập: http://localhost/kulana-api/endpoints/get-config.php

## API Endpoints

### Authentication

#### POST /endpoints/login.php

Login admin user

```json
Request:
{
  "username": "admin",
  "password": "kulana2025"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user_id": 1,
    "username": "admin",
    "token": "abc123..."
  }
}
```

### Configuration Management

#### GET /endpoints/get-config.php?key=footer

Get specific config

```json
Response:
{
  "success": true,
  "data": {
    "key": "footer",
    "value": { /* JSON config */ },
    "updated_at": "2025-11-03 10:00:00"
  }
}
```

#### GET /endpoints/get-config.php

Get all configs

```json
Response:
{
  "success": true,
  "data": {
    "footer": {
      "value": { /* JSON config */ },
      "updated_at": "2025-11-03 10:00:00"
    },
    "faq": { /* ... */ }
  }
}
```

#### POST /endpoints/update-config.php

Update config

```json
Request:
{
  "key": "footer",
  "value": {
    "sections": {
      "companyInfo": { "enabled": true },
      "navigation": { "enabled": true },
      "contact": { "enabled": false },
      "social": { "enabled": false }
    }
  }
}

Response:
{
  "success": true,
  "message": "Config updated successfully"
}
```

## Default Credentials

- Username: `admin`
- Password: `kulana2025`

## Database Schema

### Tables:

- `users` - Admin users
- `configs` - JSON configurations (footer, faq)
- `projects` - Project listings
- `faqs` - FAQ items
- `team_members` - Team member profiles

## Security Notes

⚠️ **For Production:**

1. Thay đổi database credentials
2. Implement JWT authentication
3. Add rate limiting
4. Use HTTPS
5. Validate và sanitize inputs
6. Add proper authentication middleware

## Frontend Integration

Update frontend code để call API:

```typescript
const API_BASE = "http://localhost/kulana-api/endpoints";

// Login
const response = await fetch(`${API_BASE}/login.php`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username, password }),
});
```
