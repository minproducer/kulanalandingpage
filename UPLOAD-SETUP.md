# 📤 Upload Setup Guide for Hosting

## Vấn đề đã fix:

✅ **Auto-detect environment** - API tự động nhận biết local vs production
✅ **Dynamic upload path** - Tự động dùng đúng đường dẫn theo môi trường
✅ **Dynamic URL generation** - URL ảnh tự động theo domain
✅ **CORS security** - Chỉ cho phép domain được whitelist

---

## 🗂️ Cấu trúc folder trên hosting:

```
public_html/
├── index.html              (từ dist/)
├── assets/                 (từ dist/assets/)
├── uploads/                ⭐ TẠO FOLDER NÀY (permissions 755)
├── .htaccess              (từ dist/.htaccess)
├── api/                    (upload toàn bộ folder api/)
│   ├── .htaccess
│   ├── config/
│   │   ├── cors.php
│   │   └── database.php
│   ├── endpoints/
│   │   ├── get-config.php
│   │   ├── login.php
│   │   ├── upload-image-secure.php
│   │   ├── update-config-secure.php
│   │   └── ...
│   ├── middleware/
│   │   └── auth.php
│   └── models/
└── (các file khác từ dist/)
```

---

## 🚀 Các bước deploy:

### 1️⃣ **Upload Backend (API)**

Upload toàn bộ folder `api/` lên `public_html/api/`:

```bash
# Via FTP/FileZilla:
Local:  D:\Development\Landing page Kulana\api\
Remote: /public_html/api/
```

### 2️⃣ **Upload Frontend (React Build)**

Build và upload:

```powershell
# Build production
npm run build

# Upload toàn bộ nội dung folder dist/ lên public_html/
Local:  D:\Development\Landing page Kulana\dist\*
Remote: /public_html/
```

### 3️⃣ **Tạo folder uploads**

Via cPanel File Manager hoặc FTP:

1. Tạo folder: `public_html/uploads/`
2. Set permissions: **755** (rwxr-xr-x)
3. Test write permission (upload 1 file thử)

**Via SSH (nếu có):**

```bash
mkdir -p /home/username/public_html/uploads
chmod 755 /home/username/public_html/uploads
```

### 4️⃣ **Cấu hình Database**

Edit `api/config/database.php`:

```php
<?php
class Database {
    private $host = "localhost";  // GoDaddy thường là localhost
    private $db_name = "YOUR_DB_NAME";     // Tên database
    private $username = "YOUR_DB_USER";    // User database
    private $password = "YOUR_DB_PASSWORD"; // Password database
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}
?>
```

### 5️⃣ **Import Database**

1. Go to cPanel → phpMyAdmin
2. Chọn database
3. Import file: `api/Production.sql`

### 6️⃣ **Verify Permissions**

Kiểm tra permissions các folder/file:

```
uploads/           → 755 (rwxr-xr-x)
api/               → 755
api/config/        → 755
api/config/*.php   → 644 (rw-r--r--)
api/endpoints/*.php → 644
.htaccess          → 644
```

---

## ✅ Test sau khi deploy:

### Test 1: Truy cập trang chủ

```
✅ https://kulanadevelopment.com/
```

### Test 2: Truy cập admin

```
✅ https://kulanadevelopment.com/admin/login
```

### Test 3: Login admin

```
Username: admin
Password: (your password)
✅ Should redirect to /admin/dashboard
```

### Test 4: Upload ảnh

```
1. Login → Footer Settings
2. Upload logo
3. ✅ URL should be: https://kulanadevelopment.com/uploads/xxxxx.jpg
4. ✅ Image should display correctly
```

### Test 5: API endpoints

```bash
# Test get config (public)
curl https://kulanadevelopment.com/api/endpoints/get-config.php?key=footer

# Should return JSON with config data
```

---

## 🔧 Troubleshooting:

### ❌ Ảnh upload nhưng không hiển thị

**Nguyên nhân:** Permissions folder uploads

**Fix:**

```bash
chmod 755 /home/username/public_html/uploads
```

### ❌ CORS error

**Nguyên nhân:** Domain chưa được whitelist

**Fix:** Edit `api/config/cors.php`, thêm domain vào `$allowedOrigins`:

```php
$allowedOrigins = [
    'https://kulanadevelopment.com',
    'https://www.kulanadevelopment.com',  // Thêm www nếu cần
];
```

### ❌ Upload fail "Failed to save image file"

**Nguyên nhân:** PHP không có quyền write vào folder

**Fix:**

1. Check folder exists: `ls -la /home/username/public_html/uploads`
2. Check permissions: Should be 755 or 777
3. Check PHP error log: cPanel → Error Logs

### ❌ 500 Internal Server Error

**Check:**

1. PHP version (cần >= 7.4)
2. `.htaccess` syntax
3. Error logs: cPanel → Error Logs

### ❌ Database connection error

**Check:**

1. Database exists
2. User có quyền truy cập database
3. Credentials đúng trong `database.php`
4. MySQL service đang chạy

---

## 📋 Checklist deploy:

- [ ] Upload folder `api/` lên `public_html/api/`
- [ ] Upload nội dung `dist/` lên `public_html/`
- [ ] Tạo folder `uploads/` với permissions 755
- [ ] Cấu hình `database.php` với credentials thật
- [ ] Import database `Production.sql`
- [ ] Test login admin
- [ ] Test upload ảnh
- [ ] Kiểm tra CORS (F12 console không có lỗi)
- [ ] Test tất cả pages (Home, Projects, Team, FAQ)

---

## 🎯 Cách hoạt động:

### Local Development:

```
Upload → C:/xampp/htdocs/kulana-uploads/xxx.jpg
URL → http://localhost/kulana-uploads/xxx.jpg
```

### Production Hosting:

```
Upload → /home/username/public_html/uploads/xxx.jpg
URL → https://kulanadevelopment.com/uploads/xxx.jpg
```

**API tự động detect environment dựa vào `$_SERVER['HTTP_HOST']`:**

- Có chứa "localhost" → Local
- Không có "localhost" → Production

---

## 🔐 Security Notes:

✅ CORS chỉ cho phép origins được whitelist
✅ All endpoints yêu cầu authentication (trừ get-config)
✅ File upload validate MIME type
✅ Max file size: 5MB
✅ Config files protected by .htaccess
✅ SQL injection prevented (PDO prepared statements)

---

Need help? Check error logs:

- cPanel → Error Logs
- Browser Console (F12)
- Network tab (F12)
