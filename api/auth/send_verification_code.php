<?php

echo "A<br>";
flush();
require __DIR__ . '/../../config/db.php';
echo "B<br>";
flush();
require __DIR__ . '/../../vendor/autoload.php';
echo "C<br>";
flush();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

echo "D<br>";
flush();
$envPath = __DIR__ . '/../../.env';

if (file_exists($envPath)) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../');
    $dotenv->load();
}



$email = $_POST['email'];
$_SESSION['pending_email'] = $email;

$codigo = '';
for ($i = 1; $i <= 6; $i++) {
    $digit = rand(0, 9);
    $codigo = $codigo . $digit;
}

$consulta_correo = "SELECT * FROM cod_verificacion WHERE email = $1;";
$result = pg_query_params($connection, $consulta_correo, [$email]);
$fila_correo = pg_fetch_assoc($result);


if (!$fila_correo) {
    $sql = "INSERT INTO cod_verificacion(email, codigo, expiracion) VALUES ($1, $2, NOW() + INTERVAL '3 minutes')";
    $result = pg_query_params($connection, $sql, [$email, $codigo]);
} else {
    $sql = "UPDATE cod_verificacion SET codigo = $1, expiracion = NOW() + INTERVAL '3 minutes' WHERE email = $2";
    $result = pg_query_params($connection, $sql, [$codigo, $email]);
}

echo "E<br>";
flush();
$mail = new PHPMailer(true);
try {
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('es');
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $_ENV['SMTP_USER'];
    $mail->Password = $_ENV['SMTP_PASSWORD'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;


    $mail->setFrom('onboarding@resend.dev', 'To Do App');
    $mail->addAddress($email);


    $mail->isHTML(true);
    $mail->Subject = 'Código de verificación';
    $mail->Body = "Tu código de verificación para To Do App es: {$codigo}.";
    $mail->AltBody = 'Este es el cuerpo en texto plano para clientes de correo no HTML';

    echo "F<br>";
    flush();
    $mail->send();

    echo "G<br>";
    flush();
    echo 'El correo fue enviado exitosamente.';
} catch (Exception $e) {
    echo 'El mensaje no pudo ser enviado. Error Mailer: ' . $mail->ErrorInfo;
}
