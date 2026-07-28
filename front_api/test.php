<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <?php
    session_start();

    if (isset($_SESSION["usuario_id"])) {
        echo "Usuario autenticado.<br>";
        echo "ID: " . $_SESSION["usuario_id"];
    } else {
        echo "No hay sesión iniciada.";
    }
    ?>

    <div>
        <a href="./../front_api/logout.php">Cerrar sesión</a>
    </div>
</body>

</html>