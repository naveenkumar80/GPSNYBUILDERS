<?php
// Contact Form Email Handler for Hostinger
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $date = isset($_POST['date']) ? htmlspecialchars(trim($_POST['date'])) : '';
    $time = isset($_POST['time']) ? htmlspecialchars(trim($_POST['time'])) : '';
    $message = htmlspecialchars(trim($_POST['message']));
    $subject = "Website Contact Request";
    
    // Validation
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Name is required";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Valid email is required";
    }
    
    if (empty($message)) {
        $errors[] = "Message is required";
    }
    
    if (!empty($errors)) {
        echo implode("<br>", $errors);
        exit;
    }
    
    // Email configuration for Hostinger
    $to = "info.gpsnybuilders@gmail.com"; // REPLACE WITH YOUR EMAIL
    $email_subject = "Website Contact Form: New Message from $name";
    
    // Build email body
    $email_body = "
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #007bff; color: white; padding: 15px; border-radius: 5px 5px 0 0; }
            .content { background-color: #f8f9fa; padding: 20px; border: 1px solid #dee2e6; }
            .field { margin-bottom: 10px; }
            .label { font-weight: bold; color: #495057; }
            .footer { margin-top: 20px; font-size: 0.9em; color: #6c757d; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h3>New Contact Form Submission</h3>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Name:</div>
                    <div>$name</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div>$email</div>
                </div>";
    
    if (!empty($date)) {
        $email_body .= "
                <div class='field'>
                    <div class='label'>Preferred Call Back Date:</div>
                    <div>$date</div>
                </div>";
    }
    
    if (!empty($time)) {
        $email_body .= "
                <div class='field'>
                    <div class='label'>Preferred Call Back Time:</div>
                    <div>$time</div>
                </div>";
    }
    
    $email_body .= "
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div>" . nl2br($message) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Submitted:</div>
                    <div>" . date('F j, Y, g:i a') . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>This email was sent from your website contact form.</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Email headers
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    
    // For Hostinger, use a domain email as FROM for better deliverability
    $domain = $_SERVER['HTTP_HOST'];
    $from_email = "noreply@$domain";
    
    $headers .= "From: $from_email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    
    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo "success";
        
        // Optional: Log the submission
        $log_data = [
            'timestamp' => date('Y-m-d H:i:s'),
            'name' => $name,
            'email' => $email,
            'ip' => $_SERVER['REMOTE_ADDR']
        ];
        file_put_contents('form_submissions.log', json_encode($log_data) . PHP_EOL, FILE_APPEND);
        
    } else {
        // Try alternative method
        $headers_alt = "From: $from_email\r\n" .
                      "Reply-To: $email\r\n" .
                      "Content-Type: text/html; charset=UTF-8";
        
        if (mail($to, $email_subject, $email_body, $headers_alt)) {
            echo "success";
        } else {
            echo "Failed to send email. Please try again later.";
        }
    }
} else {
    echo "Invalid request method.";
}
?>