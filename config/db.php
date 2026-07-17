<?php
$host = 'localhost';
$port = '5432';
$dbname = 'apptareas';
$user = 'postgres';
$password = '123456';

$conn_string = "host=$host port=$port dbname=$dbname user=$user password=$password";

$connection = pg_connect($conn_string);



?>