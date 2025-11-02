<?php
/**
 * Password Hash Generator
 * Use this to generate password hash for database
 */

if (php_sapi_name() !== 'cli') {
    die('This script must be run from command line');
}

$password = $argv[1] ?? 'kulana2025';

$hash = password_hash($password, PASSWORD_BCRYPT);

echo "Password: $password\n";
echo "Hash: $hash\n";
echo "\nUse this hash in database INSERT query\n";
?>
