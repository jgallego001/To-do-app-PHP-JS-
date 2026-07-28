<?php
require __DIR__ . '/../config/db.php';
session_start();

$sql = "SELECT * FROM tareas WHERE usuario_id = $1;";

$result = pg_query_params($connection, $sql, [$_SESSION['usuario_id']]);

$tareas = pg_fetch_all($result);

echo json_encode($tareas);