<?php
// Simplified version for testing - NO AUTH CHECK
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: *");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}

header("Content-Type: application/json; charset=UTF-8");

try {
    if (!isset($_FILES['image'])) {
        throw new Exception('No file uploaded');
    }
    
    $file = $_FILES['image'];
    
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Upload error: ' . $file['error']);
    }
    
    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    
    if (!in_array($extension, $allowed)) {
        throw new Exception('Invalid file type');
    }
    
    if ($file['size'] > 5 * 1024 * 1024) {
        throw new Exception('File too large');
    }
    
    // Try to create uploads folder in multiple locations
    $uploadDir = 'C:/xampp/htdocs/kulana-uploads/';
    if (!file_exists($uploadDir)) {
        if (!mkdir($uploadDir, 0755, true)) {
            throw new Exception('Failed to create directory: ' . $uploadDir);
        }
    }
    
    if (!is_writable($uploadDir)) {
        throw new Exception('Directory not writable: ' . $uploadDir);
    }
    
    $filename = uniqid('img_', true) . '.' . $extension;
    $uploadPath = $uploadDir . $filename;
    
    if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
        throw new Exception('Failed to move file from ' . $file['tmp_name'] . ' to ' . $uploadPath);
    }
    
    // Return FULL URL pointing to Apache server (port 80)
    $imageUrl = 'http://localhost/kulana-uploads/' . $filename;
    
    echo json_encode([
        'success' => true,
        'message' => 'Upload successful',
        'data' => [
            'url' => $imageUrl,
            'filename' => $filename,
            'path' => $uploadPath,
            'tmp_name' => $file['tmp_name']
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
