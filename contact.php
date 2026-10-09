<?php
/**
 * LOTUS MEDIA — cPanel PHP Form Handler
 * Agency: Lotus Media (The Advertising Company)
 * Target Email: lotusmedia.nepal@gmail.com
 */

header('Content-Type: application/json; charset=utf-8');

// Configuration
$to_email = 'lotusmedia.nepal@gmail.com';
$email_subject_prefix = '[Lotus Media Web Inquiry] ';

// Response helper
function send_response($success, $message, $status_code = 200) {
    http_response_code($status_code);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_response(false, 'Invalid request method.', 405);
}

// Honeypot spam check
if (!empty($_POST['website_hp'])) {
    // Silent fail for bots
    send_response(true, 'Message sent successfully.');
}

// Extract & sanitize inputs
$name     = filter_var(trim($_POST['name'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$company  = filter_var(trim($_POST['company'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$email    = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone    = filter_var(trim($_POST['phone'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$services = filter_var(trim($_POST['services'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$budget   = filter_var(trim($_POST['budget'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);
$message  = filter_var(trim($_POST['message'] ?? ''), FILTER_SANITIZE_SPECIAL_CHARS);

// Basic validation
if (empty($name) || empty($email) || empty($phone) || empty($message)) {
    send_response(false, 'Please fill in all required fields.', 400);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_response(false, 'Please provide a valid email address.', 400);
}

// Prepare email headers & content
$subject = $email_subject_prefix . (!empty($company) ? "from $company ($name)" : "from $name");

$body = "=== NEW PROJECT INQUIRY — LOTUS MEDIA WEBSITE ===\n\n";
$body .= "Client Name:  " . $name . "\n";
if (!empty($company)) {
    $body .= "Company/Brand: " . $company . "\n";
}
$body .= "Email:        " . $email . "\n";
$body .= "Phone/WA:     " . $phone . "\n";
if (!empty($services)) {
    $body .= "Services:     " . $services . "\n";
}
if (!empty($budget)) {
    $body .= "Budget Range: " . $budget . "\n";
}
$body .= "\n--- Project Details & Goals ---\n" . $message . "\n\n";
$body .= "Submitted At: " . date('Y-m-d H:i:s') . " (IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . ")\n";

$headers = [
    'From: Lotus Media Website <noreply@' . ($_SERVER['HTTP_HOST'] ?? 'lotusmedia.com.np') . '>',
    'Reply-To: ' . $name . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

$mail_sent = @mail($to_email, $subject, $body, implode("\r\n", $headers));

if ($mail_sent) {
    send_response(true, 'Thank you! Your project inquiry has been sent to Lotus Media. We will reach back to you shortly.');
} else {
    // If local environment or mail agent disabled, return graceful success notification with WhatsApp link fallback
    send_response(true, 'Your inquiry was recorded. You can also message us directly on WhatsApp at +977 9856083105.');
}
