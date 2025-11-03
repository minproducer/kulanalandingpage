<?php
// Auto-detect allowed origin
$allowedOrigins = [
    'http://localhost:5173',     // Vite dev server
    'http://localhost:3000',     // Alternative dev port
    'http://127.0.0.1:5173',
    'https://kulanadevelopment.com',  // Production domain
    'http://kulanadevelopment.com'    // Production HTTP (will redirect to HTTPS)
];

// Get the request origin
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Check if origin is allowed
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Default to production for direct API access
    header("Access-Control-Allow-Origin: https://kulanadevelopment.com");
}

header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
