import process from 'process';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, email, message } = req.body;

  // Validasi input
  if (!fullName || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Setup transporter Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Set di Vercel dashboard
      pass: process.env.EMAIL_PASS  // Gmail App Password
    }
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // Email kamu (f4.code.work@gmail.com)
      subject: `Portfolio Contact: ${fullName}`,
      text: `
Name: ${fullName}
Email: ${email}

Message:
${message}
      `,
      html: `
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> ${fullName}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong></p>
<p>${message}</p>
      `
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send email' });
  }
}
