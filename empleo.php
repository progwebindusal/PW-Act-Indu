<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

$destino = 'recursoshumanos@indusalca.com.ve';

$cargo     = htmlspecialchars(strip_tags(trim($_POST['cargo']      ?? 'CV Espontáneo')));
$nombre    = htmlspecialchars(strip_tags(trim($_POST['nombre']     ?? '')));
$cedula    = htmlspecialchars(strip_tags(trim($_POST['cedula']     ?? '')));
$email     = filter_var(trim($_POST['email']      ?? ''), FILTER_SANITIZE_EMAIL);
$telefono  = htmlspecialchars(strip_tags(trim($_POST['telefono']   ?? '')));
$educacion = htmlspecialchars(strip_tags(trim($_POST['educacion']  ?? '')));
$experiencia = htmlspecialchars(strip_tags(trim($_POST['experiencia'] ?? '')));
$mensaje   = htmlspecialchars(strip_tags(trim($_POST['mensaje']    ?? '')));

if (!$nombre || !$email || !$telefono) {
    echo json_encode(['ok' => false, 'msg' => 'Campos requeridos incompletos.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['ok' => false, 'msg' => 'Correo inválido.']);
    exit;
}

$asunto = "Aplicación de empleo: $cargo - $nombre";
$cuerpo = "
CARGO APLICADO: $cargo

Nombre:     $nombre
Cédula:     $cedula
Correo:     $email
Teléfono:   $telefono
Educación:  $educacion

Experiencia:
$experiencia

Mensaje adicional:
$mensaje
";

// Adjuntar CV si se envió
$headers  = "From: noreply@indusalca.com\r\n";
$headers .= "Reply-To: $email\r\n";

if (!empty($_FILES['cv']['tmp_name']) && $_FILES['cv']['error'] === UPLOAD_ERR_OK) {
    $cvNombre = basename($_FILES['cv']['name']);
    $cvTipo   = mime_content_type($_FILES['cv']['tmp_name']);
    $cvData   = chunk_split(base64_encode(file_get_contents($_FILES['cv']['tmp_name'])));
    $boundary = md5(time());

    $headers  = "From: noreply@indusalca.com\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

    $body  = "--$boundary\r\n";
    $body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $body .= $cuerpo . "\r\n";
    $body .= "--$boundary\r\n";
    $body .= "Content-Type: $cvTipo; name=\"$cvNombre\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"$cvNombre\"\r\n\r\n";
    $body .= $cvData . "\r\n";
    $body .= "--$boundary--";

    $ok = mail($destino, $asunto, $body, $headers);
} else {
    $headers .= "X-Mailer: PHP/" . phpversion();
    $ok = mail($destino, $asunto, $cuerpo, $headers);
}

echo json_encode(['ok' => $ok, 'msg' => $ok ? 'Aplicación enviada.' : 'Error al enviar.']);
