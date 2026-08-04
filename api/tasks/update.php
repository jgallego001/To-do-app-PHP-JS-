<?php
require __DIR__ . '/../../config/db.php';

$id = $_POST["id"];
$titulo = $_POST["titulo"];

$sql = "UPDATE tareas
        SET titulo = $1
        WHERE id = $2";

$result = pg_query_params(
    $connection,
    $sql,
    [$titulo, $id]
);

if (!$result) {
    die(pg_last_error($connection));
}

echo "ok";