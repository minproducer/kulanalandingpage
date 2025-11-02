<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$uploadDir = __DIR__ . '/../../public/uploads/';
$realPath = realpath(__DIR__ . '/../../public/uploads/');

echo json_encode([
    '__DIR__' => __DIR__,
    'uploadDir' => $uploadDir,
    'realPath' => $realPath,
    'exists' => file_exists($uploadDir),
    'writable' => is_writable($uploadDir),
    'parent_dir' => dirname(__DIR__),
    'project_root' => dirname(dirname(__DIR__))
], JSON_PRETTY_PRINT);
