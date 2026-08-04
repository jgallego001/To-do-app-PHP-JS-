<?php
require __DIR__ . '/../config/db.php';
session_start();

$email = $_SESSION['verified_email'];
$name = $_POST['name'];
$pswrd = $_POST['pswrd'];
$confirm_pswrd = $_POST['confirm-pswrd'];

if ($pswrd !== $confirm_pswrd) {
    http_response_code(400);
    exit("Las contraseñas no coinciden.");
}

$password_hash = password_hash($pswrd, PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre";
$result = pg_query_params($connection, $sql, [$name, $email, $password_hash]);

if (!$result) {
    die(pg_last_error($connection));
} else {
    echo "OK";
    $row = pg_fetch_assoc($result);

    $_SESSION = [];

    session_regenerate_id(true);

    $_SESSION["usuario_id"] = $row['id'];
    $_SESSION["user_name"] = $row['nombre'];
}
