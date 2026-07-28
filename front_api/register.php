<?php
require __DIR__ . '/../config/db.php';

$input_name = $_POST['name'];
$input_email = $_POST['email'];

$password_hash = password_hash($_POST['pswrd'], PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios (nombre, email, password) VALUES ('$input_name', '$input_email', '$password_hash')";

$result = pg_query($connection, $sql);

if (!$result) {
    die(pg_last_error($connection));
}
