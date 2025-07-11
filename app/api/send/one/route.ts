import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { to, subject, greeting, body, callToAction } = await req.json();

        if (!Array.isArray(to) || to.length === 0) {
            return NextResponse.json(
                { success: false, error: "'to' must be a non-empty array" },
                { status: 400 }
            );
        }

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const failed: string[] = [];
        let sent = 0;

        for (const recipient of to) {
            const { email, name } = recipient;

            try {
                const personalizedGreeting = greeting.replace('{{name}}', name);
                const htmlContent = `
                    <p>${personalizedGreeting}</p>
                    <p>${body}</p>
                    <p><strong>${callToAction}</strong></p>
                `;
                const textContent = `${personalizedGreeting}\n\n${body}\n\n${callToAction}`;

                await transporter.sendMail({
                    from: `"Rua Store" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject,
                    text: textContent,
                    html: htmlContent,
                });

                sent++;
            } catch {
                failed.push(email);
            }
        }

        return NextResponse.json({
            success: true,
            sent,
            failed,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Server error', details: error },
            { status: 500 }
        );
    }
}
