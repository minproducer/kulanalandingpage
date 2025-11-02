# Logo Upload Feature

## Overview

Admin can now upload a custom logo for the footer through the Footer Settings page.

## Features

- Upload logo image (PNG, JPG, GIF, WebP, SVG)
- Maximum file size: 5MB
- Preview uploaded logo
- Remove logo option
- Logo displays in footer on all public pages

## Setup Instructions

### 1. Database Update

Run the SQL script to add logoUrl field to footer config:

```sql
-- File: api/add-logo-to-footer.sql
UPDATE configs
SET config_value = JSON_SET(
    config_value,
    '$.sections.companyInfo.logoUrl', '/KulanaDev Logo - center.png'
)
WHERE config_key = 'footer';
```

Run this in phpMyAdmin:

1. Open phpMyAdmin
2. Select database `kulana_dev`
3. Go to SQL tab
4. Copy and paste the SQL from `api/add-logo-to-footer.sql`
5. Click "Go" to execute

### 2. Uploads Directory

The uploads directory has been created at:

```
public/uploads/
```

Make sure this directory has write permissions:

- Windows: No action needed
- Linux/Mac: `chmod 755 public/uploads`

### 3. API Endpoint

New endpoint created: `api/endpoints/upload-image.php`

- Handles file upload
- Validates file type and size
- Generates unique filename
- Returns uploaded image URL

## Usage

### Admin Panel

1. Login to admin panel: http://localhost:5173/admin/login
2. Navigate to Footer Settings
3. Scroll to Company Info section
4. Click "Upload Logo" button
5. Select an image file
6. Preview the uploaded logo
7. Click "Save Changes" to apply

### Remove Logo

1. Go to Footer Settings
2. Click "Remove" button next to the logo preview
3. Click "Save Changes"

## Technical Details

### Files Modified

- `src/admin/pages/FooterSettings.tsx` - Added logo upload UI
- `src/components/Footer.tsx` - Display logo from API
- `src/services/apiService.ts` - Added uploadImage method
- `src/config/footerConfig.ts` - Changed logo to logoUrl
- `api/endpoints/upload-image.php` - New upload endpoint

### Image Storage

- Uploaded images are stored in: `public/uploads/`
- Filename format: `img_{unique_id}.{extension}`
- Images are accessible via: `/uploads/filename.ext`

### Security

- File type validation (only images allowed)
- File size limit: 5MB
- Authentication required (Bearer token)
- Unique filename generation to prevent conflicts

## API Reference

### Upload Image

**Endpoint:** `POST /api/endpoints/upload-image.php`

**Headers:**

```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Body:**

```
image: File (image file)
```

**Response Success:**

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "/uploads/img_12345.png",
    "filename": "img_12345.png"
  }
}
```

**Response Error:**

```json
{
  "success": false,
  "message": "Error message"
}
```

## Troubleshooting

### Upload Fails

- Check uploads directory exists and has write permissions
- Verify file size is under 5MB
- Ensure file type is an image (PNG, JPG, GIF, WebP, SVG)
- Check PHP upload_max_filesize and post_max_size in php.ini

### Image Not Displaying

- Verify image uploaded successfully (check public/uploads/)
- Check console for CORS errors
- Ensure .htaccess in uploads folder is present
- Clear browser cache

### Permission Denied

- Windows: Right-click folder > Properties > Security > Edit permissions
- Linux/Mac: `chmod 755 public/uploads`
