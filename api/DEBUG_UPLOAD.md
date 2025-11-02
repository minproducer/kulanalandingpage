# Debug Logo Upload Error

## Lỗi: 500 Internal Server Error

### Bước 1: Kiểm tra PHP Error Log

1. Mở XAMPP Control Panel
2. Click "Logs" bên cạnh Apache
3. Click "PHP Error Log" (php_error_log)
4. Xem lỗi mới nhất

### Bước 2: Test API trực tiếp

Mở trình duyệt và truy cập:

```
http://localhost/kulana-api/endpoints/test-upload-simple.php
```

Nếu thấy JSON response như này thì PHP đang hoạt động:

```json
{
  "success": true,
  "message": "PHP file is working!"
}
```

### Bước 3: Test Upload với HTML

1. Mở file: `api/endpoints/test-upload.html` trong trình duyệt
2. Chọn một file ảnh
3. Click "Upload"
4. Xem kết quả

### Bước 4: Kiểm tra uploads directory

Chạy lệnh trong PowerShell:

```powershell
Test-Path "d:\Development\Landing page Kulana\public\uploads\"
```

Phải return `True`

### Bước 5: Kiểm tra quyền ghi

Windows thường không có vấn đề về quyền. Nhưng nếu cần:

1. Right-click folder `public\uploads`
2. Properties > Security
3. Edit > Add > Everyone > Full Control

### Bước 6: Kiểm tra PHP upload settings

Mở file: `C:\xampp\php\php.ini`

Tìm và kiểm tra:

```ini
upload_max_filesize = 10M
post_max_size = 10M
file_uploads = On
upload_tmp_dir = "C:\xampp\tmp"
```

Sau khi sửa, restart Apache trong XAMPP.

### Bước 7: Kiểm tra XAMPP tmp folder

```powershell
Test-Path "C:\xampp\tmp"
```

Nếu không tồn tại, tạo mới:

```powershell
New-Item -Path "C:\xampp\tmp" -ItemType Directory -Force
```

### Các lỗi thường gặp:

#### 1. "Failed to execute 'json' on 'Response'"

- PHP file có syntax error
- PHP file return HTML thay vì JSON
- Kiểm tra PHP error log

#### 2. "Unauthorized"

- Token không đúng
- Check localStorage có 'adminToken' không

#### 3. "Failed to save uploaded file"

- Folder uploads không có quyền ghi
- Upload tmp directory không tồn tại
- Kiểm tra PHP error log

#### 4. "No file uploaded"

- FormData không đúng format
- File input name không match với PHP $\_FILES['image']

### Solution nhanh:

Nếu vẫn lỗi, thử disable authentication tạm:

Sửa file `upload-image.php`:

```php
// Comment out authentication check
/*
if (empty($authHeader) || substr($authHeader, 0, 7) !== 'Bearer ') {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}
*/
```

Test lại. Nếu work thì vấn đề là authentication. Nếu vẫn lỗi thì là file upload logic.
