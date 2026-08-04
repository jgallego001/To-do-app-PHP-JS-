<?php
require __DIR__ . '/../config/db.php';

$email = $_POST['email'];
$pswrd = $_POST['pswrd'];

$sql = "SELECT * FROM usuarios WHERE email = $1";

$result = pg_query_params($connection, $sql, [$email]);

$usuario = pg_fetch_assoc($result);

if (!$usuario) {
    die("Correo o contraseña incorrectos");
}

if(password_verify($pswrd, $usuario["password"])){
    session_start();
    $_SESSION = [];

    $_SESSION["usuario_id"] = $usuario['id'];
    $_SESSION["user_name"] = $usuario['nombre'];

    echo("OK");
    exit;
} else {
    echo "Correo o contraseña inválidos.";
}