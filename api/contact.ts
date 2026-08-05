import { readBody, sendJson, methodNotAllowed } from './_shared';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Extend global for rate limiting
declare global {
  var contactRateLimitBuckets: Map<string, { count: number; windowStart: number }> | undefined;
}

function validateContactForm(data: ContactFormData): string[] {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email is required');
  }

  if (!data.subject || data.subject.trim().length < 5) {
    errors.push('Subject must be at least 5 characters');
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push('Message must be at least 10 characters');
  }

  return errors;
}

async function sendContactEmail(data: ContactFormData): Promise<boolean> {
  // TODO: Configure your email service here
  // Examples:
  //
  // Using Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'Portfolio Contact <onboarding@resend.dev>',
  //   to: 'sanurudh938@gmail.com',
  //   subject: `Portfolio Contact: ${data.subject}`,
  //   html: `
  //     <h2>New Contact Form Submission</h2>
  //     <p><strong>Name:</strong> ${data.name}</p>
  //     <p><strong>Email:</strong> ${data.email}</p>
  //     <p><strong>Subject:</strong> ${data.subject}</p>
  //     <p><strong>Message:</strong></p>
  //     <p>${data.message.replace(/\n/g, '<br>')}</p>
  //   `,
  // });
  //
  // Using SendGrid:
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // await sgMail.send({
  //   to: 'sanurudh938@gmail.com',
  //   from: 'noreply@yourdomain.com',
  //   subject: `Portfolio Contact: ${data.subject}`,
  //   text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
  // });
  //
  // Using Nodemailer with SMTP:
  // const nodemailer = require('nodemailer');
  // const transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: parseInt(process.env.SMTP_PORT || '587'),
  //   secure: false,
  //   auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  // });
  // await transporter.sendMail({
  //   from: '"Portfolio Contact" <noreply@yourdomain.com>',
  //   to: 'sanurudh938@gmail.com',
  //   subject: `Portfolio Contact: ${data.subject}`,
  //   text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\nMessage:\n${data.message}`,
  // });

  // For demo purposes, log to console
  console.log('Contact form submission:', {
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    timestamp: new Date().toISOString(),
  });

  return true;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    methodNotAllowed(res, ['POST']);
    return;
  }

  // Apply rate limiting (stricter for contact form)
  const forwarded = String(req.headers['x-forwarded-for'] || '');
  const ip = forwarded.split(',')[0]?.trim() || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();

  // Simple in-memory rate limit for contact form (5 per hour per IP)
  const CONTACT_RATE_LIMIT = 5;
  const CONTACT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

  if (!global.contactRateLimitBuckets) {
    global.contactRateLimitBuckets = new Map();
  }

  const bucket = global.contactRateLimitBuckets.get(ip) || { count: 0, windowStart: now };

  if (now - bucket.windowStart > CONTACT_WINDOW_MS) {
    bucket.count = 0;
    bucket.windowStart = now;
  }

  if (bucket.count >= CONTACT_RATE_LIMIT) {
    sendJson(res, 429, {
      error: 'Too many requests. Please try again later.',
      retryAfter: Math.ceil((CONTACT_WINDOW_MS - (now - bucket.windowStart)) / 1000 / 60),
    });
    return;
  }

  bucket.count++;
  global.contactRateLimitBuckets.set(ip, bucket);

  try {
    const data = await readBody(req);
    const { name, email, subject, message } = data as ContactFormData;

    const validationErrors = validateContactForm({ name, email, subject, message });
    if (validationErrors.length > 0) {
      sendJson(res, 400, { error: 'Validation failed', details: validationErrors });
      return;
    }

    // Sanitize inputs
    const sanitizedData: ContactFormData = {
      name: name.trim().slice(0, 100),
      email: email.trim().slice(0, 254).toLowerCase(),
      subject: subject.trim().slice(0, 200),
      message: message.trim().slice(0, 5000),
    };

    await sendContactEmail(sanitizedData);

    sendJson(res, 200, {
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (error) {
    console.error('Contact form error:', error);
    sendJson(res, 500, { error: 'Failed to send message. Please try again or email directly.' });
  }
}
