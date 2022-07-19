<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
      .verify-email-button {
        border: 1px solid black;
        padding: .5em;
        background-color: dodgerblue;
        color: white !important;
        border-radius: 4px;
        text-decoration: none;
      }
    </style>
</head>

<body>
    <h1>Email Verification</h1>

    <p>Hello, {{ $full_name }} thank you for signing up to our website, please click the button below to verify your
        email address.</p>
    <a class="verify-email-button"
      href="{{ env('APP_FRONTEND_URL', 'https://peachcommerce.masuk.id') }}/mail/verification?token={{ $email_verification_token }}">Verify Email
    </a>

    <p>This token will be valid for 15 minutes. If the button on top is not working, please click this link: <a
      href="{{ env('APP_FRONTEND_URL', 'https://peachcommerce.masuk.id') }}/mail/verification?token={{ $email_verification_token }}">{{ $email_verification_token }}</a>
    </p>
</body>

</html>
