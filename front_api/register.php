<?php
require __DIR__ . '/../config/db.php';

$input_name = $_POST['name'];
$input_email = $_POST['email'];
$input_pswrd = $_POST['pswrd'];

$sql = "INSERT INTO usuarios (nombre, email, password) VALUES ('$input_name', '$input_email', '$input_pswrd')";

$result = pg_query($connection, $sql);

if (!$result) {
    die(pg_last_error($connection));
}
