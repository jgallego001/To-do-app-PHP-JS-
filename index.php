<?php

session_start();

if (isset($_SESSION["usuario_id"])) {
    header("Location: app.html");
} else {
    header("Location: login.html");
}
exit;