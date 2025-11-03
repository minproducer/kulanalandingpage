<?php
require_once '../config/cors.php';
require_once '../middleware/auth.php';

// Require authentication
requireAuth();

$response = array();

// Validate file upload
if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "No image file provided"
    ));
    exit();
}

$file = $_FILES['image'];

// Validate file size (max 5MB)
$maxSize = 5 * 1024 * 1024; // 5MB
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "File size exceeds 5MB limit"
    ));
    exit();
}

// Validate MIME type (not just extension)
$allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, $allowedMimeTypes)) {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "Invalid file type. Only images are allowed (JPEG, PNG, GIF, WebP)"
    ));
    exit();
}

// Sanitize filename
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

if (!in_array($extension, $allowedExtensions)) {
    http_response_code(400);
    echo json_encode(array(
        "success" => false,
        "message" => "Invalid file extension"
    ));
    exit();
}

// Generate unique filename
$newFilename = uniqid() . '_' . time() . '.' . $extension;

// Auto-detect environment (local vs production)
$isLocal = (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false || strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false);

if ($isLocal) {
    // Local development
    $uploadDir = 'C:/xampp/htdocs/kulana-uploads/';
    $baseUrl = 'http://localhost/kulana-uploads/';
} else {
    // Production hosting (auto-detect document root)
    $uploadDir = $_SERVER['DOCUMENT_ROOT'] . '/uploads/';
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $baseUrl = $protocol . '://' . $_SERVER['HTTP_HOST'] . '/uploads/';
}

// Create directory if not exists
if (!file_exists($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$targetPath = $uploadDir . $newFilename;

// Move uploaded file
if (move_uploaded_file($file['tmp_name'], $targetPath)) {
    $url = $baseUrl . $newFilename;
    
    http_response_code(200);
    echo json_encode(array(
        "success" => true,
        "message" => "Image uploaded successfully",
        "data" => array(
            "url" => $url,
            "filename" => $newFilename
        )
    ));
} else {
    http_response_code(500);
    echo json_encode(array(
        "success" => false,
        "message" => "Failed to save image file"
    ));
}
?>
