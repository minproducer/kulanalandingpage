# ✅ Security Enabled - Testing Checklist

## 🔒 **Security has been enabled!** All API calls now require authentication.

---

## 📋 **Local Testing Steps:**

### 1. Test Authentication Flow

- [ ] Open: `http://localhost:5173/admin/login`
- [ ] Login with your credentials
- [ ] Check browser console - should see token saved
- [ ] Check localStorage: `localStorage.getItem('adminToken')` should return a token

### 2. Test Protected Endpoints

#### Footer Settings:

- [ ] Go to: `http://localhost:5173/admin/footer`
- [ ] Try uploading logo → Should work (with auth)
- [ ] Save changes → Should work

#### Projects:

- [ ] Go to: `http://localhost:5173/admin/projects`
- [ ] Add new project with image upload → Should work
- [ ] Upload gallery images → Should work
- [ ] Add specifications → Should work
- [ ] Save → Should work

#### Team Settings:

- [ ] Go to: `http://localhost:5173/admin/team`
- [ ] Add team member with photo → Should work
- [ ] Save → Should work

#### FAQ Settings:

- [ ] Go to: `http://localhost:5173/admin/faq`
- [ ] Edit FAQ content → Should work
- [ ] Save → Should work

#### Home Settings:

- [ ] Go to: `http://localhost:5173/admin/home`
- [ ] Edit content → Should work
- [ ] Save → Should work

#### Page Settings:

- [ ] Go to: `http://localhost:5173/admin/page-settings`
- [ ] Toggle pages on/off → Should work
- [ ] Save → Should work

### 3. Test Security (Important!)

#### Test Unauthorized Access:

- [ ] Open browser console: `localStorage.clear()`
- [ ] Try to upload image → Should get 401 error and redirect to login
- [ ] Try to save config → Should get 401 error

#### Test Direct API Access:

- [ ] Open in browser: `http://localhost/kulana-api/endpoints/upload-image-secure.php`
- [ ] Should see: `{"success":false,"message":"Authentication required. Please login."}`

#### Test Token Expiry:

- [ ] Login and work normally
- [ ] Clear token: `localStorage.removeItem('adminToken')`
- [ ] Try any admin action → Should redirect to login

---

## 🚀 **Production Deployment Checklist:**

See `DEPLOYMENT.md` for full guide. Quick checklist:

### Before Upload:

- [ ] Update API_BASE_URL in `src/services/apiService.ts` to your domain
- [ ] Build: `npm run build`
- [ ] Update database credentials in `api/config/database.php`
- [ ] Update CORS in `api/config/cors.php` with your domain
- [ ] Update upload path in `api/endpoints/upload-image-secure.php`

### Upload to GoDaddy:

- [ ] Upload `api/` folder to `public_html/kulana-api/`
- [ ] Upload `dist/` contents to `public_html/`
- [ ] Create `kulana-uploads/` folder with 755 permissions
- [ ] Import SQL files to MySQL database
- [ ] Add `.htaccess` files for security

### After Upload:

- [ ] Test login on production
- [ ] Test image upload
- [ ] Test all admin functions
- [ ] Verify HTTPS is working
- [ ] Check security headers
- [ ] Setup automated backups

---

## 🐛 **If Something Breaks:**

### Error: "Authentication required"

**Cause:** Token not being sent or invalid
**Fix:**

1. Check localStorage has token
2. Check Network tab → Request Headers → Authorization
3. Try logging out and back in

### Error: "Failed to upload image"

**Cause:** Upload endpoint or permissions issue
**Fix:**

1. Check `kulana-uploads/` folder exists and has 755 permissions
2. Verify upload path in `upload-image-secure.php`
3. Check browser console for detailed error

### Error: "CORS policy"

**Cause:** CORS not configured for your domain
**Fix:**

1. Edit `api/config/cors.php`
2. Change `Access-Control-Allow-Origin` to your domain
3. Clear browser cache

### Error: "Database connection failed"

**Cause:** Wrong credentials or database doesn't exist
**Fix:**

1. Verify credentials in `api/config/database.php`
2. Check database exists in phpMyAdmin
3. Ensure database user has all privileges

---

## 📊 **What Changed:**

### ✅ Enabled:

- Authentication required for all admin actions
- Token-based authorization (Bearer token)
- Secure file upload with MIME type validation
- File size limits (5MB)
- HTML sanitization to prevent XSS
- Config key whitelist
- JSON size limits (1MB)
- Auto-redirect to login on 401

### 🔐 Security Features:

- HTTPS ready (already enforced by GoDaddy)
- Authentication middleware
- Protected endpoints
- Token validation
- Secure headers ready (.htaccess)

### 📁 Files Modified:

- `src/services/apiService.ts` - Added token to all requests
- `src/admin/pages/ProjectsManagement.tsx` - Secure upload (2 places)
- `src/admin/pages/TeamSettings.tsx` - Secure upload
- `src/admin/pages/FooterSettings.tsx` - Secure upload
- `src/admin/pages/PageSettings.tsx` - Fixed React hook warning

### 📁 Files Created:

- `api/middleware/auth.php` - Authentication middleware
- `api/endpoints/upload-image-secure.php` - Secure upload endpoint
- `api/endpoints/update-config-secure.php` - Secure config endpoint
- `api/SECURITY.md` - Security documentation
- `DEPLOYMENT.md` - Production deployment guide
- `TESTING-CHECKLIST.md` - This file

---

## 🎉 **Ready to Deploy!**

Your application is now production-ready with security enabled!

Follow the deployment guide in `DEPLOYMENT.md` to go live on GoDaddy.

**Need help?** Just ask! 🚀
