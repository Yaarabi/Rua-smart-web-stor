

import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const { customers, emailContent } = await request.json();

        if (!customers || !emailContent) {
        return NextResponse.json({ error: 'Missing name or email' }, { status: 400 });
        }

        const result = await resend.emails.send({
            from: "Display Name <contact.ruastore@gmail.com>",
            to: customers[0].email, 
            subject: emailContent.subject,
            html: `<h2>${emailContent.greeting.replace("{{name}}", customers[0].name)}</h2>
            <p>${emailContent.body}</p>
            <p><strong>${emailContent.callToAction}</strong></p>`,
            })
        

    return NextResponse.json({ success: true, data: result });
    } catch (error) {
                return NextResponse.json({ message: "Server error", error }, { status: 500 });
}
}
