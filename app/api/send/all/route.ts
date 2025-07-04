

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const { customers, emailContent } = await request.json();

        if (!Array.isArray(customers)) {
        return NextResponse.json(
            { error: "Expected an array of customers" },
            { status: 400 }
        );
        }

        const results = await Promise.all(
        customers.map(({ name, email }) =>
            resend.emails.send({
            from: "Display Name <contact.ruastore@gmail.com>",
            to: email,
            subject: emailContent.subject,
            html: `<h2>${emailContent.greeting.replace("{{name}}", name)}</h2>
            <p>${emailContent.body}</p>
            <p><strong>${emailContent.callToAction}</strong></p>`,
            })
        )
        );

        return NextResponse.json({ success: true, sent: results.length });
    }
    catch (error) {
            return NextResponse.json({ message: "Server error", error }, { status: 500 });

    }
}
