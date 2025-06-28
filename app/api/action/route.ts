    "use server";

import { connectDB } from "@/lib/db";
import Client from "@/models/users";
import bcrypt from "bcryptjs";

interface User {
    username: string;
    email: string;
    password: string;
    }

export const register = async (values: User) => {
    const { email, password, username } = values;

    if (!email || !password || !username) {
        return { error: "All fields are required." };
    }

    try {
        await connectDB();

        const existingUser = await Client.findOne({ email });
        if (existingUser) return { error: "Email already exists!" };

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Client({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();

        return {
        message: "User registered successfully",
        user: {
            username: savedUser.username,
            email: savedUser.email,
            password: savedUser.password
        },
        };
    } catch (error) {
        console.error("Registration error:", error);
        return { error: "Something went wrong. Please try again later." };
    }
};
