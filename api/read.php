<?php
require __DIR__ . '/../config/db.php';

$sql = "SELECT * FROM tareas;";

$result = pg_query($connection, $sql);

$tareas = pg_fetch_all($result);

echo json_encode($tareas);