<?php
$host = 'localhost';
$port = '5432';
$dbname = 'nombre_base_de_datos';
$user = 'tu_usuario';
$password = 'tu_contraseña';

$conn_string = "host=$host port=$port dbname=$dbname user=$user password=$password";

$connection = pg_connect($conn_string);



?>