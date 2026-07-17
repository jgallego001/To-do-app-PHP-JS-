<?php
require __DIR__ . '/../config/db.php';

$input_titulo = $_POST['titulo'];

$sql = "INSERT INTO tareas (titulo) VALUES ('$input_titulo');";

$result = pg_query($connection, $sql);


exit;
