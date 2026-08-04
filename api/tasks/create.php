<?php
require __DIR__ . '/../../config/db.php';
session_start();

$input_titulo = $_POST['titulo'];
$user_id = $_SESSION['usuario_id'];

$sql = "INSERT INTO tareas (titulo, usuario_id) VALUES ('$input_titulo', '$user_id');";

$result = pg_query($connection, $sql);


exit;
