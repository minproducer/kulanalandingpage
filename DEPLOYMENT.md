# Production Deployment Configuration

## 🚀 Deploy to GoDaddy with HTTPS

### Step 1: Update API Base URL

Edit `src/services/apiService.ts` line 2:

```typescript
// Local Development
// const API_BASE_URL = 'http://localhost/kulana-api/endpoints';

// Production (Replace with your actual domain)
const API_BASE_URL = "https://yourdomain.com/kulana-api/endpoints";
```

---

### Step 2: Upload Files to GoDaddy

#### Backend (PHP API):

Upload entire `api/` folder to your hosting:

```
public_html/
├── kulana-api/
│   ├── config/
│   │   ├── cors.php
│   │   └── database.php
│   ├── endpoints/
│   │   ├── get-config.php
│   │   ├── login.php
│   │   ├── upload-image-secure.php  ← Use this
│   │   └── update-config-secure.php ← Use this
│   └── middleware/
│       └── auth.php
└── kulana-uploads/  ← Create this folder (755 permissions)
```

#### Frontend (React):

1. Build production version:

   ```bash
   npm run build
   ```

2. Upload `dist/` folder contents to `public_html/`:
   ```
   public_html/
   ├── index.html
   ├── assets/
   │   ├── index-xxx.js
   │   └── index-xxx.css
   └── ...
   ```

---

### Step 3: Update Database Config

Edit `api/config/database.php` with your GoDaddy MySQL credentials:

```php
<?php
class Database {
    private $host = "localhost";  // Usually "localhost" on GoDaddy
    private $db_name = "YOUR_DB_NAME";  // Your database name
    private $username = "YOUR_DB_USER";  // Your database username
    private $password = "YOUR_DB_PASSWORD";  // Your database password
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

---

### Step 4: Import Database

1. Go to GoDaddy cPanel → phpMyAdmin
2. Create database (if not exists)
3. Import SQL files in order:
   ```
   - database.sql (tables structure)
   - reset-footer-config.sql
   - reset-projects-config.sql
   - reset-faq-config.sql
   - reset-home-config.sql
   - reset-team-config.sql
   - reset-page-settings.sql
   ```

---

### Step 5: Update CORS Settings (if needed)

**Default:** CORS already configured for `kulanadevelopment.com`

If using different domain, edit `api/config/cors.php`:

```php
$allowedOrigins = [
    'http://localhost:5173',
    'https://yourdomain.com',    // ← Change this
    'http://yourdomain.com'
];
```

✅ CORS now auto-validates origins for security!

---

### Step 6: Create Uploads Folder

⭐ **IMPORTANT:** Create `uploads/` folder in public_html:

```bash
# Via SSH
mkdir -p /home/username/public_html/uploads
chmod 755 /home/username/public_html/uploads

# Via cPanel File Manager:
# 1. Navigate to public_html/
# 2. Create new folder: "uploads"
# 3. Right-click → Change Permissions → 755
```

**Note:** `upload-image-secure.php` now auto-detects environment:

- Local: Uses `C:/xampp/htdocs/kulana-uploads/`
- Production: Uses `$_SERVER['DOCUMENT_ROOT'] . '/uploads/'`

No manual configuration needed! ✅

---

### Step 7: Create .htaccess for Security

Create `public_html/.htaccess`:

```apache
# Force HTTPS (GoDaddy already does this, but for safety)
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Security Headers
<IfModule mod_headers.c>
    Header set X-Content-Type-Options "nosniff"
    Header set X-Frame-Options "SAMEORIGIN"
    Header set X-XSS-Protection "1; mode=block"
    Header set Referrer-Policy "strict-origin-when-cross-origin"
    Header set Permissions-Policy "geolocation=(), microphone=(), camera=()"
</IfModule>

# Prevent directory listing
Options -Indexes

# Protect sensitive files
<FilesMatch "^\.env|composer\.(json|lock)|package(-lock)?\.json|\.git">
    Order allow,deny
    Deny from all
</FilesMatch>

# React Router - Redirect all to index.html
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  RewriteRule . /index.html [L]
</IfModule>
```

Create `public_html/kulana-api/.htaccess`:

```apache
# Prevent direct access to config files
<FilesMatch "^(database|cors)\.php$">
    Order allow,deny
    Deny from all
</FilesMatch>

# Enable PHP error logging (production)
php_flag display_errors off
php_flag log_errors on
php_value error_log /home/username/public_html/kulana-api/error.log
```

---

### Step 8: Set Folder Permissions

Via cPanel File Manager or FTP:

```
kulana-uploads/     → 755 (rwxr-xr-x)
kulana-api/         → 755
kulana-api/config/  → 700 (rwx------)
```

---

### Step 9: Test Deployment

1. **Test Login:**

   ```
   https://yourdomain.com/admin/login
   ```

2. **Test Upload:**

   - Login → Projects → Add Project → Upload Image
   - Should work with authentication

3. **Check Security:**

   - Try accessing: `https://yourdomain.com/kulana-api/endpoints/upload-image-secure.php` directly
   - Should return: `{"success":false,"message":"Authentication required. Please login."}`

4. **Test Public Pages:**
   - Home, Projects, FAQ, Team pages should load normally

---

### Step 10: Monitor & Maintain

#### Check Error Logs:

```
cPanel → Error Logs
OR
/home/username/public_html/kulana-api/error.log
```

#### Backup Schedule:

- Daily: Database backup (cPanel → Backup)
- Weekly: Full file backup
- Keep 30 days of backups

#### Security Checklist:

- [ ] All endpoints use `-secure.php` versions
- [ ] HTTPS enforced
- [ ] Database credentials strong
- [ ] File permissions correct
- [ ] Error display disabled in production
- [ ] CORS limited to your domain only
- [ ] Regular backups configured

---

## 🔧 Quick Troubleshooting

### "Authentication required" error:

1. Check localStorage has token: `localStorage.getItem('adminToken')`
2. Check token is being sent: Network tab → Headers → Authorization
3. Verify middleware is checking token correctly

### Upload fails:

1. Check folder permissions: `kulana-uploads/` must be 755
2. Check upload path in `upload-image-secure.php`
3. Check file size limit in php.ini (usually 2MB on shared hosting)

### Database connection error:

1. Verify credentials in `config/database.php`
2. Check database exists in cPanel → MySQL Databases
3. Ensure user has privileges on database

### CORS errors:

1. Update `config/cors.php` with your actual domain
2. Clear browser cache
3. Check browser console for specific error

---

## 📞 Need Help?

If deployment fails, provide:

1. Error message from browser console (F12)
2. Error from server logs (cPanel → Error Logs)
3. Which step failed

I'll help debug! 🚀
