
import { NextResponse } from "next/server";
import { register } from "../route"; 

export async function POST(req:Request) {
    const body = await req.json();
    const result = await register(body);

    if (result.error) {
        return NextResponse.json({ message: result.error }, { status: 400 });
    }

    return NextResponse.json({ message: result.message, user: result.user }, { status: 201 });
}
