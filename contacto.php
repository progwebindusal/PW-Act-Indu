<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$destino = 'ventas@indusalca.com.ve';

$nombre  = htmlspecialchars(strip_tags(trim($_POST['name']    ?? '')));
$email   = filter_var(trim($_POST['email']   ?? ''), FILTER_SANITIZE_EMAIL);
$telefono= htmlspecialchars(strip_tags(trim($_POST['phone']   ?? '')));
$mensaje = htmlspecialchars(strip_tags(trim($_POST['message'] ?? '')));

if (!$nombre || !$email || !$mensaje) {
    echo json_encode(['ok' => false, 'msg' => 'Campos requeridos incompletos.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['ok' => false, 'msg' => 'Correo inválido.']);
    exit;
}

$asunto = "Nuevo mensaje de contacto - $nombre";
$cuerpo = "
Nombre:   $nombre
Correo:   $email
Teléfono: $telefono

Mensaje:
$mensaje
";

$headers  = "From: noreply@indusalca.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$ok = mail($destino, $asunto, $cuerpo, $headers);

echo json_encode(['ok' => $ok, 'msg' => $ok ? 'Mensaje enviado.' : 'Error al enviar.']);
