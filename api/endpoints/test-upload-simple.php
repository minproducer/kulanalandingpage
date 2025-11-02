<?php
// Simple test to check if PHP file is working
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

echo json_encode([
    'success' => true,
    'message' => 'PHP file is working!',
    'files' => $_FILES,
    'method' => $_SERVER['REQUEST_METHOD']
]);
