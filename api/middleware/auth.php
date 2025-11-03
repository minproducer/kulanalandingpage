<?php
// Auth Middleware - Check for valid token
// Usage: require_once '../middleware/auth.php';

function requireAuth() {
    $headers = getallheaders();
    $token = null;
    
    // Get token from Authorization header
    if (isset($headers['Authorization'])) {
        $authHeader = $headers['Authorization'];
        if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
            $token = $matches[1];
        }
    }
    
    // Also check for token in POST data (for backward compatibility)
    if (!$token) {
        $input = json_decode(file_get_contents("php://input"), true);
        if (isset($input['token'])) {
            $token = $input['token'];
        }
    }
    
    if (!$token) {
        http_response_code(401);
        echo json_encode(array(
            "success" => false,
            "message" => "Authentication required. Please login."
        ));
        exit();
    }
    
    // In production, validate token against database or JWT
    // For now, just check if token exists and has correct format
    if (strlen($token) < 32) {
        http_response_code(401);
        echo json_encode(array(
            "success" => false,
            "message" => "Invalid authentication token."
        ));
        exit();
    }
    
    return $token;
}

// Optional: Validate token against database
function validateToken($token) {
    require_once '../config/database.php';
    
    $database = new Database();
    $db = $database->getConnection();
    
    // Check if token exists in sessions table (if you have one)
    // For now, return true if token format is valid
    return strlen($token) >= 32;
}
?>
