
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'contact-api-handler',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: false,
                error: 'Method Not Allowed',
              }));
              return;
            }

            let body = '';

            req.on('data', (chunk) => {
              body += chunk;
            });

            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}');

                const name = typeof parsed.name === 'string'
                  ? parsed.name.trim() : '';

                const email = typeof parsed.email === 'string'
                  ? parsed.email.trim() : '';

                const message = typeof parsed.message === 'string'
                  ? parsed.message.trim() : '';

                // Validation
                if (!name || name.length < 2) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: false,
                    error: 'Please enter your name (at least 2 characters).',
                  }));
                  return;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!email || !emailRegex.test(email)) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: false,
                    error: 'Please enter a valid email address.',
                  }));
                  return;
                }

                if (!message || message.length < 10) {
                  res.statusCode = 400;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: false,
                    error: 'Please enter a message of at least 10 characters.',
                  }));
                  return;
                }

                // Secure environment variables
                const apiKey =
                  env.RESEND_API_KEY || process.env.RESEND_API_KEY;

                const recipientEmail =
                  env.CONTACT_EMAIL ||
                  process.env.CONTACT_EMAIL ||
                  'deepumahapatro2006@gmail.com';

                if (!apiKey) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: false,
                    error: 'Email service is not configured.',
                  }));
                  return;
                }

                // Send email through Resend
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
                      reply_to: email,
                      subject: `[Portfolio Inquiry] from ${name}`,
                      html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 12px; border: 1px solid #334155;">
                          <h2 style="color: #ef4444;">New Project Inquiry</h2>

                          <div style="margin: 16px 0; padding: 16px; background: #1e293b; border-radius: 8px;">
                            <p style="color: #94a3b8;">Sender</p>
                            <p style="color: #ffffff;">${name}</p>

                            <p style="color: #94a3b8;">Email</p>
                            <p>
                              <a href="mailto:${email}" style="color: #38bdf8;">
                                ${email}
                              </a>
                            </p>
                          </div>

                          <div style="margin: 16px 0;">
                            <p style="color: #94a3b8;">Message / Project Scope</p>
                            <div style="padding: 16px; background: #1e293b; border-left: 4px solid #ef4444; white-space: pre-wrap;">
                              ${message}
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
                  res.statusCode = resendResponse.status;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({
                    success: false,
                    error: resData.message ||
                      'Email delivery failed via provider.',
                  }));
                  return;
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: true,
                  message: 'Your message has been sent successfully!',
                  id: resData.id,
                }));

              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({
                  success: false,
                  error: err?.message ||
                    'Internal server error while dispatching message.',
                }));
              }
            });
          });
        },
      },
    ],
  };
});
