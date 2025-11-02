<?php
require_once '../config/cors.php';
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

$response = array();

if (!empty($data->key) && isset($data->value)) {
    // Check if config exists
    $query = "SELECT id FROM configs WHERE config_key = :config_key LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":config_key", $data->key);
    $stmt->execute();
    
    $config_value = json_encode($data->value);
    
    if ($stmt->rowCount() > 0) {
        // Update existing config
        $query = "UPDATE configs SET config_value = :config_value WHERE config_key = :config_key";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":config_value", $config_value);
        $stmt->bindParam(":config_key", $data->key);
        
        if ($stmt->execute()) {
            $response["success"] = true;
            $response["message"] = "Config updated successfully";
            http_response_code(200);
        } else {
            $response["success"] = false;
            $response["message"] = "Failed to update config";
            http_response_code(500);
        }
    } else {
        // Insert new config
        $query = "INSERT INTO configs (config_key, config_value) VALUES (:config_key, :config_value)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":config_key", $data->key);
        $stmt->bindParam(":config_value", $config_value);
        
        if ($stmt->execute()) {
            $response["success"] = true;
            $response["message"] = "Config created successfully";
            http_response_code(201);
        } else {
            $response["success"] = false;
            $response["message"] = "Failed to create config";
            http_response_code(500);
        }
    }
} else {
    $response["success"] = false;
    $response["message"] = "Config key and value are required";
    http_response_code(400);
}

echo json_encode($response);
?>
