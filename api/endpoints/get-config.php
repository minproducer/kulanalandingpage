<?php
require_once '../config/cors.php';
require_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

$response = array();

// Get config key from URL parameter
$config_key = isset($_GET['key']) ? $_GET['key'] : '';

if (!empty($config_key)) {
    $query = "SELECT config_key, config_value, updated_at FROM configs WHERE config_key = :config_key LIMIT 1";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":config_key", $config_key);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $response["success"] = true;
        $response["data"] = array(
            "key" => $row['config_key'],
            "value" => json_decode($row['config_value']),
            "updated_at" => $row['updated_at']
        );
        http_response_code(200);
    } else {
        $response["success"] = false;
        $response["message"] = "Config not found";
        http_response_code(404);
    }
} else {
    // Get all configs
    $query = "SELECT config_key, config_value, updated_at FROM configs";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $configs = array();
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $configs[$row['config_key']] = array(
            "value" => json_decode($row['config_value']),
            "updated_at" => $row['updated_at']
        );
    }
    
    $response["success"] = true;
    $response["data"] = $configs;
    http_response_code(200);
}

echo json_encode($response);
?>
