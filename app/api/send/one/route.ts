

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email } = body;

        if (!name || !email) {
        return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
        }

        const result = await resend.emails.send({
        from: 'noreply@ruastore.com',
        to: email,
        subject: 'Bienvenue chez Rua Web Store!',
        html: `<p>Bonjour ${name}, merci d’avoir rejoint Rua Web Store 🛍️</p>`,
        });

    return NextResponse.json({ success: true, data: result });
    } catch (error) {
                return NextResponse.json({ message: "Server error", error }, { status: 500 });
}
}
