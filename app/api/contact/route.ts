import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmail } from '@/emails/contactEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not defined in environment variables');
}

if (!process.env.RESEND_FROM_EMAIL) {
  throw new Error('RESEND_FROM_EMAIL is not defined in environment variables');
}

if (!process.env.RESEND_TO_EMAIL) {
  throw new Error('RESEND_TO_EMAIL is not defined in environment variables');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    console.log('Received contact form submission:', {
      name,
      email,
      subject,
      messageLength: message.length
    });

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: [process.env.RESEND_TO_EMAIL!],
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      react: ContactEmail({
        name,
        email,
        subject,
        message,
      }),
    });

    console.log('Resend API response:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Detailed error sending email:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
} 