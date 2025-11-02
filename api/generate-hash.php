<!DOCTYPE html>
<html>
<head>
    <title>Password Hash Generator</title>
    <style>
        body { font-family: Arial; padding: 40px; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        input, button { padding: 12px; margin: 10px 0; width: 100%; box-sizing: border-box; font-size: 16px; }
        button { background: #bc934a; color: white; border: none; cursor: pointer; border-radius: 4px; }
        button:hover { background: #a37f3e; }
        .result { background: #f0f0f0; padding: 15px; margin-top: 20px; border-radius: 4px; word-break: break-all; }
        h2 { color: #091d30; }
    </style>
</head>
<body>
    <div class="container">
        <h2>🔐 Password Hash Generator</h2>
        <form method="post">
            <input type="text" name="password" placeholder="Enter password" required>
            <button type="submit">Generate Hash</button>
        </form>
        
        <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['password'])) {
            $password = $_POST['password'];
            $hash = password_hash($password, PASSWORD_BCRYPT);
            
            echo '<div class="result">';
            echo '<strong>Password:</strong> ' . htmlspecialchars($password) . '<br><br>';
            echo '<strong>Hash:</strong><br>' . htmlspecialchars($hash) . '<br><br>';
            echo '<strong>SQL Update Query:</strong><br>';
            echo '<code>UPDATE users SET password = \'' . htmlspecialchars($hash) . '\' WHERE username = \'admin\';</code>';
            echo '</div>';
            
            // Test verification
            if (password_verify($password, $hash)) {
                echo '<p style="color: green; margin-top: 10px;">✓ Hash verified successfully!</p>';
            }
        }
        ?>
        
        <div style="margin-top: 30px; padding: 15px; background: #e8f4f8; border-radius: 4px;">
            <strong>Quick Fix for kulana2025:</strong><br><br>
            Run this SQL in phpMyAdmin:<br>
            <code style="display: block; background: white; padding: 10px; margin-top: 10px; border-radius: 4px;">
            UPDATE users SET password = '<?php echo password_hash('kulana2025', PASSWORD_BCRYPT); ?>' WHERE username = 'admin';
            </code>
        </div>
    </div>
</body>
</html>
