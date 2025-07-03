

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const { customers } = await request.json();

        if (!Array.isArray(customers)) {
        return NextResponse.json(
            { error: "Expected an array of customers" },
            { status: 400 }
        );
        }

        const results = await Promise.all(
        customers.map(({ name, email }) =>
            resend.emails.send({
            from: "noreply@ruastore.com",
            to: email,
            subject: "Bienvenue chez Rua Web Store!",
            html: `<p>Salut ${name}, merci d’avoir rejoint Rua Web Store 🙌</p>`,
            })
        )
        );

        return NextResponse.json({ success: true, sent: results.length });
    }
    catch (error) {
            return NextResponse.json({ message: "Server error", error }, { status: 500 });

    }
}
