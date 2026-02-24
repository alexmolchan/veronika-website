interface Env {
  TURNSTILE_SECRET_KEY: string
  RESEND_API_KEY: string
  RECIPIENT_EMAIL: string
}

interface FormData {
  name: string
  email: string
  messenger: string
  contact: string
  message: string
  issues: string[]
  turnstileToken: string
}

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context

  try {
    const data: FormData = await request.json()

    // Validate required fields
    if (!data.name || !data.contact) {
      return new Response(
        JSON.stringify({ error: 'Заполните имя и контакт для связи' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Verify Turnstile token
    const turnstileVerification = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${env.TURNSTILE_SECRET_KEY}&response=${data.turnstileToken}`,
      }
    )

    const turnstileResult = await turnstileVerification.json() as { success: boolean; 'error-codes'?: string[] }
    if (!turnstileResult.success) {
      const errorCodes = turnstileResult['error-codes'] || []
      console.error('Turnstile verification failed:', JSON.stringify(turnstileResult))
      console.error('Token received:', data.turnstileToken ? `${data.turnstileToken.substring(0, 20)}...` : 'EMPTY')
      console.error('Secret key present:', !!env.TURNSTILE_SECRET_KEY)
      return new Response(
        JSON.stringify({
          error: 'Проверка безопасности не пройдена. Попробуйте ещё раз.',
          debug: { errorCodes, hasToken: !!data.turnstileToken, hasSecret: !!env.TURNSTILE_SECRET_KEY }
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Format issues list
    const issuesList = data.issues.length > 0
      ? `<p><strong>Выбранные запросы:</strong></p><ul>${data.issues.map(i => `<li>${i}</li>`).join('')}</ul>`
      : ''

    // Format messenger
    const messengerNames: Record<string, string> = {
      telegram: 'Telegram',
      whatsapp: 'WhatsApp',
      phone: 'Телефон'
    }

    // Send email to Veronika via Resend
    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Сайт <noreply@hmelnickaya.com>',
        to: ['verona.khm@yandex.ru', 'alex.molchan@gmail.com'],
        subject: `Новая заявка от ${data.name}`,
        html: `
          <h2>Новая заявка с сайта</h2>
          <p><strong>Имя:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Способ связи:</strong> ${messengerNames[data.messenger] || data.messenger}</p>
          <p><strong>Контакт:</strong> ${data.contact}</p>
          ${data.message ? `<p><strong>Сообщение:</strong></p><p>${data.message}</p>` : ''}
          ${issuesList}
          <hr>
          <p style="color: #666; font-size: 12px;">Это письмо отправлено автоматически с сайта hmelnickaya.com</p>
        `,
      }),
    })

    if (!adminEmailResponse.ok) {
      console.error('Failed to send admin email:', await adminEmailResponse.text())
    }

    // Send confirmation email to client (only if email provided)
    if (data.email) {
      const clientEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Вероника Хмельницкая <noreply@hmelnickaya.com>',
          to: [data.email],
          subject: 'Спасибо за обращение!',
          html: `
            <h2>Здравствуйте, ${data.name}!</h2>
            <p>Спасибо, что обратились ко мне. Я получила вашу заявку и свяжусь с вами в течение 24 часов.</p>
            ${data.issues.length > 0 ? `<p>Вы выбрали следующие темы для работы:</p><ul>${data.issues.map(i => `<li>${i}</li>`).join('')}</ul>` : ''}
            <p>Если у вас есть срочный вопрос, вы можете написать мне напрямую в Telegram: <a href="https://t.me/veronika_hmelnickaya">@veronika_hmelnickaya</a></p>
            <p>С теплом,<br>Вероника Хмельницкая<br>Психолог, коуч</p>
            <hr>
            <p style="color: #666; font-size: 12px;">Это автоматическое письмо, пожалуйста, не отвечайте на него.</p>
          `,
        }),
      })

      if (!clientEmailResponse.ok) {
        console.error('Failed to send client email:', await clientEmailResponse.text())
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Заявка успешно отправлена' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return new Response(
      JSON.stringify({ error: 'Произошла ошибка при отправке. Попробуйте позже.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
