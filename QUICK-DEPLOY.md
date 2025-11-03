# 🚀 Quick Deploy Checklist

## ✅ Đã fix các vấn đề:

1. ✅ **Upload path tự động detect** - Không cần sửa hardcode
2. ✅ **URL ảnh dynamic** - Tự động theo domain
3. ✅ **CORS security** - Whitelist origins
4. ✅ **Admin routes** - File .htaccess đã có SPA routing
5. ✅ **API security** - Protected config files

---

## 📦 Upload lên hosting:

### 1. Build Frontend

```powershell
npm run build
```

### 2. Upload Files

**Frontend (dist/ → public_html/):**

```
dist/index.html          → public_html/index.html
dist/assets/*            → public_html/assets/
dist/.htaccess           → public_html/.htaccess
dist/favicon.png         → public_html/favicon.png
(và các file khác)
```

**Backend (api/ → public_html/api/):**

```
api/*                    → public_html/api/
```

### 3. Tạo folder uploads

```
public_html/uploads/     (permissions: 755)
```

### 4. Config Database

Edit `public_html/api/config/database.php`:

```php
private $host = "localhost";
private $db_name = "YOUR_DB_NAME";
private $username = "YOUR_DB_USER";
private $password = "YOUR_DB_PASSWORD";
```

### 5. Import Database

cPanel → phpMyAdmin → Import `api/Production.sql`

---

## 🧪 Test:

1. ✅ https://kulanadevelopment.com/ (trang chủ)
2. ✅ https://kulanadevelopment.com/admin/login (admin login)
3. ✅ Login → Upload ảnh → Check URL có đúng domain không

---

## 📂 Cấu trúc cuối cùng trên hosting:

```
public_html/
├── index.html
├── .htaccess              ← SPA routing
├── assets/
├── uploads/               ← TẠO FOLDER NÀY!
│   └── (uploaded images)
└── api/
    ├── .htaccess          ← Security
    ├── config/
    │   ├── cors.php       ← Auto CORS
    │   └── database.php   ← CẦN CONFIG
    ├── endpoints/
    │   └── upload-image-secure.php ← Auto-detect
    └── ...
```

---

## 🎯 Điểm quan trọng:

### Folder uploads PHẢI:

- ✅ Tên: `uploads` (không phải `kulana-uploads`)
- ✅ Location: `public_html/uploads/`
- ✅ Permissions: **755**

### Không cần thay đổi:

- ❌ `upload-image-secure.php` - Auto-detect rồi!
- ❌ `cors.php` - Đã config cho kulanadevelopment.com
- ❌ Frontend code - Build sẵn rồi!

### CẦN thay đổi:

- ✅ `database.php` - Database credentials
- ✅ Import SQL vào database

---

## 🔧 Nếu có lỗi:

### Upload ảnh bị lỗi:

```bash
# Check permissions
ls -la /home/username/public_html/uploads

# Fix permissions
chmod 755 /home/username/public_html/uploads
```

### Admin route 404:

```
Kiểm tra file .htaccess đã upload chưa
```

### CORS error:

```
Check console (F12) → Network tab → Response headers
```

---

**Done! 🎉 Upload và test thôi!**
