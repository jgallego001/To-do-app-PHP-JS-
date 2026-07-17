<?php
require __DIR__ . '/../config/db.php';

$id = $_POST['id'];
$sql = "DELETE FROM tareas WHERE id = $1";
$result = pg_query_params($connection, $sql, [$id]);

if (!$result) {
    die(pg_last_error($connection));
}
