def render_verification_email_html(code: str) -> str:
    return f"""
<!DOCTYPE html>
<html lang=\"ru\">
<head>
  <meta charset=\"UTF-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <title>Email</title>
  <style>
    body {{
      margin: 0;
      padding: 0;
      background: #f1f2f9;
      -webkit-font-smoothing: antialiased;
    }}
    .email-body {{
      width: 100%;
      background: radial-gradient(circle at 20% 30%, rgba(65,70,200,0.35), transparent 60%),
                  radial-gradient(circle at 80% 60%, rgba(255,90,120,0.35), transparent 70%),
                  #f1f2f9;
      padding: 40px 0;
    }}
    .container {{
      max-width: 520px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 14px;
      padding: 32px;
      box-shadow: 0 6px 24px rgba(0,0,0,0.06);
      font-family: Arial, sans-serif;
      color: #1a1a1a;
    }}
    h1 {{
      margin: 0 0 20px;
      font-size: 24px;
      text-align: center;
      font-weight: 600;
    }}
    p {{
      font-size: 16px;
      line-height: 1.5;
      margin: 14px 0;
      text-align: center;
    }}
  </style>
</head>
<body>
  <div class=\"email-body\">
    <div class=\"container\">
      <h1>Ваш код подтверждения</h1>
      <p style=\"font-size: 38px; font-weight: bold; letter-spacing: 4px;\">{code}</p>
      <p>Введите этот код, чтобы подтвердить действие в вашем аккаунте.</p>
      <p style=\"margin-top: 32px; font-size: 13px; color:#666;\">Если вы не запрашивали код — просто проигнорируйте это письмо.</p>
    </div>
  </div>
</body>
</html>
"""
