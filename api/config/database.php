<?php
class Database {
    // Production settings for GoDaddy hosting
    private $host = "localhost"; // Usually "localhost" on GoDaddy
    private $db_name = "kulana_dev";
    private $username = "kulanadev";
    private $password = "Kulana@2025";
    public $conn;

    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}
?>
