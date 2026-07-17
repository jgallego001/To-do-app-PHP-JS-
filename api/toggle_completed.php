<?php
require __DIR__ . '/../config/db.php';

$id = $_POST['id'];

$sql = 'UPDATE tareas
    SET completada = NOT completada
    WHERE id = $1';

pg_query_params($connection, $sql, [$id]);
