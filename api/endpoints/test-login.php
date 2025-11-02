<?php
require_once '../config/cors.php';
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$response = array();

// Get user from database
$query = "SELECT id, username, password FROM users WHERE username = 'admin' LIMIT 1";
$stmt = $db->prepare($query);
$stmt->execute();

if ($stmt->rowCount() > 0) {
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    $testPassword = 'kulana2025';
    
    $response["debug"] = array(
        "user_id" => $row['id'],
        "username" => $row['username'],
        "password_in_db" => $row['password'],
        "password_length" => strlen($row['password']),
        "test_password" => $testPassword,
        "password_verify_result" => password_verify($testPassword, $row['password']),
        "plain_text_match" => ($testPassword === $row['password']),
        "password_starts_with" => substr($row['password'], 0, 10)
    );
    
    // Test different methods
    $methods = array();
    
    // Bcrypt
    if (password_verify($testPassword, $row['password'])) {
        $methods[] = "bcrypt_hash";
    }
    
    // Plain text
    if ($testPassword === $row['password']) {
        $methods[] = "plain_text";
    }
    
    // MySQL PASSWORD()
    if ($row['password'] === '*' . strtoupper(sha1(sha1($testPassword, true)))) {
        $methods[] = "mysql_password";
    }
    
    $response["working_methods"] = $methods;
    $response["success"] = !empty($methods);
    
} else {
    $response["error"] = "User not found";
    $response["success"] = false;
}

echo json_encode($response, JSON_PRETTY_PRINT);
?>
