<?php
require_once __DIR__ . '/../config/cors.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

// Debug log (remove in production)
error_log("hash-password.php - Raw input: " . $rawInput);
error_log("hash-password.php - Decoded input: " . print_r($input, true));

if (!isset($input['password'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Password is required']);
    exit;
}

$password = $input['password'];

// Generate hash
$hash = password_hash($password, PASSWORD_DEFAULT);

echo json_encode([
    'success' => true,
    'hash' => $hash,
    'algorithm' => 'bcrypt',
    'cost' => 10
]);
?>
