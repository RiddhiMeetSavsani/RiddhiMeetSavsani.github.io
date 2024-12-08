<?php
// submit-form.php

// Enable error reporting for debugging (disable in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set Content-Type header to JSON
header('Content-Type: application/json');

// Initialize response array
$response = ['status' => '', 'message' => ''];

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Function to sanitize input data
    function sanitize_input($data) {
        return htmlspecialchars(stripslashes(trim($data)));
    }

    // Retrieve and sanitize form data
    $firstName = isset($_POST['firstName']) ? sanitize_input($_POST['firstName']) : '';
    $lastName = isset($_POST['lastName']) ? sanitize_input($_POST['lastName']) : '';
    $message = isset($_POST['message']) ? sanitize_input($_POST['message']) : '';

    // Validate required fields
    if (empty($firstName) || empty($lastName) || empty($message)) {
        $response['status'] = 'error';
        $response['message'] = 'Please fill in all required fields.';
        echo json_encode($response);
        exit;
    }

    // Handle file upload if present
    $fileUploaded = false;
    $filePath = '';
    $fileName = '';

    if (isset($_FILES['upload']) && $_FILES['upload']['error'] == UPLOAD_ERR_OK) {
        $allowed = [
            'pdf' => 'application/pdf',
            'doc' => 'application/msword',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        $fileTmpPath = $_FILES['upload']['tmp_name'];
        $fileName = $_FILES['upload']['name'];
        $fileSize = $_FILES['upload']['size'];
        $fileType = mime_content_type($fileTmpPath);
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));

        // Validate file type
        if (array_key_exists($fileExt, $allowed) && in_array($fileType, $allowed)) {
            // Limit file size to 5MB
            if ($fileSize <= 5 * 1024 * 1024) {
                $filePath = $fileTmpPath;
                $fileUploaded = true;
            } else {
                $response['status'] = 'error';
                $response['message'] = 'File size exceeds the 5MB limit.';
                echo json_encode($response);
                exit;
            }
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Invalid file type. Please upload a PDF or Word document.';
            echo json_encode($response);
            exit;
        }
    }

    // Your email address where you want to receive the messages
    $to = "riddhimeet1115@outlook.com"; // Replace with your actual email address

    // Email subject
    $subject = "New Contact Form Submission from $firstName $lastName";

    // Email body
    $emailBody = "You have received a new message from your portfolio contact form.\n\n";
    $emailBody .= "Here are the details:\n";
    $emailBody .= "First Name: $firstName\n";
    $emailBody .= "Last Name: $lastName\n";
    $emailBody .= "Message:\n$message\n";

    // Email headers
    $fromEmail = "riddhimeet1115@gmail.com"; // Replace with a valid email from your domain
    $headers = "From: $firstName $lastName <$fromEmail>\r\n";
    $headers .= "Reply-To: $fromEmail\r\n";

    // Handle file attachment if uploaded
    if ($fileUploaded) {
        $boundary = md5("random"); // Define boundary

        // Headers for attachment
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        // Multipart boundary
        $messageBody = "--$boundary\r\n";
        $messageBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $messageBody .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $messageBody .= $emailBody . "\r\n";

        // Attachment
        $messageBody .= "--$boundary\r\n";
        $messageBody .= "Content-Type: $fileType; name=\"$fileName\"\r\n";
        $messageBody .= "Content-Disposition: attachment; filename=\"$fileName\"\r\n";
        $messageBody .= "Content-Transfer-Encoding: base64\r\n\r\n";
        $messageBody .= chunk_split(base64_encode(file_get_contents($filePath))) . "\r\n";
        $messageBody .= "--$boundary--";

        // Send email with attachment
        $mailSuccess = mail($to, $subject, $messageBody, $headers);
    } else {
        // Send plain email without attachment
        $mailSuccess = mail($to, $subject, $emailBody, $headers);
    }

    // Provide feedback to the user
    if ($mailSuccess) {
        $response['status'] = 'success';
        $response['message'] = 'Thank you for your message!
                                            It has been sent successfully!';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'There was an error sending your message. Please try again later.';
    }

    // Return response as JSON
    echo json_encode($response);
    exit;

} else {
    // If the form was not submitted via POST
    $response['status'] = 'error';
    $response['message'] = 'Invalid request method.';
    echo json_encode($response);
    exit;
}
?>
