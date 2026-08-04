<?php
require __DIR__ . '/../../config/db.php';

session_start();
$email = $_SESSION['pending_email'];
$codigo = $_POST['verif-code'];

$sql = "SELECT * FROM cod_verificacion WHERE email = $1 AND codigo = $2 AND expiracion >= NOW();";
$result = pg_query_params($connection, $sql, [$email, $codigo]);
$registro = pg_fetch_assoc($result);

if ($registro) {
    $_SESSION['verified_email'] = $email;
    echo "OK";
} else {
    echo "INVALID";
}
