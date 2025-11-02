<?php
// Handle CORS manually for file upload
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Set content type for response
header("Content-Type: application/json; charset=UTF-8");

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Check authentication
$headers = getallheaders();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';

// Use substr instead of str_starts_with for PHP < 8.0 compatibility
if (empty($authHeader) || substr($authHeader, 0, 7) !== 'Bearer ') {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit;
}

// Validate file upload
if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'No file uploaded'
    ]);
    exit;
}

$file = $_FILES['image'];

// Check for upload errors
if ($file['error'] !== UPLOAD_ERR_OK) {
    $errorMessages = [
        UPLOAD_ERR_INI_SIZE => 'File exceeds upload_max_filesize',
        UPLOAD_ERR_FORM_SIZE => 'File exceeds MAX_FILE_SIZE',
        UPLOAD_ERR_PARTIAL => 'File was only partially uploaded',
        UPLOAD_ERR_NO_FILE => 'No file was uploaded',
        UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
        UPLOAD_ERR_EXTENSION => 'Upload stopped by extension'
    ];
    
    $errorMsg = isset($errorMessages[$file['error']]) 
        ? $errorMessages[$file['error']] 
        : 'Unknown upload error';
    
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => $errorMsg
    ]);
    exit;
}

// Validate file type by extension
$allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

if (!in_array($extension, $allowedExtensions)) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'Invalid file type. Only images are allowed (JPEG, PNG, GIF, WebP, SVG)'
    ]);
    exit;
}

// Validate file size (max 5MB)
$maxSize = 5 * 1024 * 1024; // 5MB
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode([
        'success' => false, 
        'message' => 'File too large. Maximum size is 5MB'
    ]);
    exit;
}

// Create uploads directory if it doesn't exist
$uploadDir = __DIR__ . '/../../public/uploads/';
if (!file_exists($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        http_response_code(500);
        echo json_encode([
            'success' => false, 
            'message' => 'Failed to create uploads directory'
        ]);
        exit;
    }
}

// Generate unique filename
$filename = uniqid('img_', true) . '.' . $extension;
$uploadPath = $uploadDir . $filename;

// Move uploaded file
if (!move_uploaded_file($file['tmp_name'], $uploadPath)) {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Failed to save uploaded file. Check directory permissions.'
    ]);
    exit;
}

// Return the URL path
$imageUrl = '/uploads/' . $filename;

echo json_encode([
    'success' => true,
    'message' => 'Image uploaded successfully',
    'data' => [
        'url' => $imageUrl,
        'filename' => $filename
    ]
]);
