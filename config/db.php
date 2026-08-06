<?php
require __DIR__ . '/../vendor/autoload.php';

$envPath = __DIR__ . '/../.env';

if (file_exists($envPath)) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../');
    $dotenv->load();
}

$host = $_ENV['DB_HOST'];
$port = $_ENV['DB_PORT'];
$dbname = $_ENV['DB_NAME'];
$user = $_ENV['DB_USER'];
$password = $_ENV['DB_PASSWORD'];

$conn_string = "host=$host port=$port dbname=$dbname user=$user password=$password";

$connection = pg_connect($conn_string);
