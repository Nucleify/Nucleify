<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: #ffffff;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #10b981;
            margin-bottom: 20px;
        }
        .header h1 {
            color: #10b981;
            margin: 0;
            font-size: 24px;
        }
        .field {
            margin-bottom: 15px;
        }
        .field-label {
            font-weight: 600;
            color: #555;
            display: block;
            margin-bottom: 5px;
        }
        .field-value {
            background-color: #f9f9f9;
            padding: 12px;
            border-radius: 4px;
            border-left: 3px solid #10b981;
        }
        .message-content {
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #888;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📬 New Contact Form Submission</h1>
        </div>

        <div class="field">
            <span class="field-label">Name:</span>
            <div class="field-value">{{ $formData['name'] }}</div>
        </div>

        <div class="field">
            <span class="field-label">Email:</span>
            <div class="field-value">
                <a href="mailto:{{ $formData['email'] }}">{{ $formData['email'] }}</a>
            </div>
        </div>

        @if(!empty($formData['phone']))
        <div class="field">
            <span class="field-label">Phone:</span>
            <div class="field-value">
                <a href="tel:{{ $formData['phone'] }}">{{ $formData['phone'] }}</a>
            </div>
        </div>
        @endif

        <div class="field">
            <span class="field-label">Message:</span>
            <div class="field-value message-content">{{ $formData['message'] }}</div>
        </div>

        <div class="footer">
            <p>This message was sent from the contact form on your website.</p>
            <p>Sent at: {{ now()->format('Y-m-d H:i:s') }}</p>
        </div>
    </div>
</body>
</html>

