    // app/actions/register.ts
    "use server";

import { connectDB } from "@/lib/db";
import Client from "@/models/users";
import bcrypt from "bcryptjs";

interface User {
    name: string;
    email: string;
    password: string;
    }

export const register = async (values: User) => {
    const { email, password, name } = values;

    if (!email || !password || !name) {
        return { error: "All fields are required." };
    }

    try {
        await connectDB();

        const existingUser = await Client.findOne({ email });
        if (existingUser) return { error: "Email already exists!" };

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Client({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        return {
        message: "User registered successfully",
        user: {
            _id: savedUser._id,
            name: savedUser.username,
            email: savedUser.email,
        },
        };
    } catch (error) {
        console.error("Registration error:", error);
        return { error: "Something went wrong. Please try again later." };
    }
};
