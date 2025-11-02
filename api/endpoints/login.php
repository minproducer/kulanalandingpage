<?php
require_once '../config/cors.php';
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

$response = array();

if (!empty($data->username) && !empty($data->password)) {
    $query = "SELECT id, username, password FROM users WHERE username = :username LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":username", $data->username);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Verify password - with debug info
        $isValid = false;
        $dbPassword = $row['password'];
        $inputPassword = $data->password;
        
        // Try multiple verification methods
        
        // Method 1: Bcrypt hash
        if (password_verify($inputPassword, $dbPassword)) {
            $isValid = true;
        }
        // Method 2: Plain text comparison
        elseif ($inputPassword === $dbPassword) {
            $isValid = true;
            
            // Auto-hash for next time
            $newHash = password_hash($inputPassword, PASSWORD_BCRYPT);
            $updateQuery = "UPDATE users SET password = :password WHERE id = :id";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->bindParam(":password", $newHash);
            $updateStmt->bindParam(":id", $row['id']);
            $updateStmt->execute();
        }
        // Method 3: MySQL PASSWORD() hash (old format)
        elseif ($dbPassword === '*' . strtoupper(sha1(sha1($inputPassword, true)))) {
            $isValid = true;
            
            // Update to bcrypt
            $newHash = password_hash($inputPassword, PASSWORD_BCRYPT);
            $updateQuery = "UPDATE users SET password = :password WHERE id = :id";
            $updateStmt = $db->prepare($updateQuery);
            $updateStmt->bindParam(":password", $newHash);
            $updateStmt->bindParam(":id", $row['id']);
            $updateStmt->execute();
        }
        
        if ($isValid) {
            // Generate simple token (in production, use JWT)
            $token = bin2hex(random_bytes(32));
            
            $response["success"] = true;
            $response["message"] = "Login successful";
            $response["data"] = array(
                "user_id" => $row['id'],
                "username" => $row['username'],
                "token" => $token
            );
            http_response_code(200);
        } else {
            $response["success"] = false;
            $response["message"] = "Invalid username or password";
            http_response_code(401);
        }
    } else {
        $response["success"] = false;
        $response["message"] = "Invalid username or password";
        http_response_code(401);
    }
} else {
    $response["success"] = false;
    $response["message"] = "Username and password are required";
    http_response_code(400);
}

echo json_encode($response);
?>
