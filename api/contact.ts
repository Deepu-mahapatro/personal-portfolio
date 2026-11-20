
import type { VercelRequest, VercelResponse } from '@vercel/node';

// Escape HTML to prevent HTML injection in email content
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };

    return entities[char];
  });
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      error: 'Method Not Allowed',
    });
  }

  const { name, email, message } = req.body || {};

  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  // Validate name
  if (!trimmedName || trimmedName.length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Please enter your name (at least 2 characters).',
    });
  }

  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a valid email address.',
    });
  }

  // Validate message
  if (!trimmedMessage || trimmedMessage.length < 10) {
    return res.status(400).json({
      success: false,
      error: 'Please enter a message of at least 10 characters.',
    });
  }

  // Environment variables
  const apiKey = process.env.RESEND_API_KEY;
  const recipientEmail =
    process.env.CONTACT_EMAIL || 'deepumahapatro2006@gmail.com';

  if (!apiKey) {
    return res.status(500).json({
      success: false,
      error: 'Email service is not configured.',
    });
  }

  // Escape user-provided content
  const safeName = escapeHtml(trimmedName);
  const safeEmail = escapeHtml(trimmedEmail);
  const safeMessage = escapeHtml(trimmedMessage);

  try {
    const resendResponse = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Portfolio Contact <onboarding@resend.dev>',
          to: [recipientEmail],
          reply_to: trimmedEmail,
          subject: `[Portfolio Inquiry] from ${trimmedName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 12px; border: 1px solid #334155;">

              <h2 style="color: #ef4444;">
                New Project Inquiry
              </h2>

              <div style="margin: 16px 0; padding: 16px; background: #1e293b; border-radius: 8px;">

                <p style="color: #94a3b8;">Sender</p>
                <p style="color: #ffffff;">${safeName}</p>

                <p style="color: #94a3b8;">Email</p>
                <p>
                  <a href="mailto:${safeEmail}" style="color: #38bdf8;">
                    ${safeEmail}
                  </a>
                </p>

              </div>

              <div style="margin: 16px 0;">

                <p style="color: #94a3b8;">
                  Message / Project Scope
                </p>

                <div style="padding: 16px; background: #1e293b; border-left: 4px solid #ef4444; white-space: pre-wrap;">
                  ${safeMessage}
                </div>

              </div>

              <p style="margin-top: 24px; font-size: 12px; color: #64748b; text-align: center;">
                Delivered securely from Deepu Mahapatro's Portfolio Website
              </p>

            </div>
          `,
        }),
      }
    );

    const resData = await resendResponse.json();

    if (!resendResponse.ok) {
      return res.status(resendResponse.status).json({
        success: false,
        error: resData.message || 'Email delivery failed via provider.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your message has been sent successfully!',
      id: resData.id,
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      error:
        err?.message ||
        'Internal server error while dispatching message.',
    });
  }
}
