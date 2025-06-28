
import { connectDB } from "./db";
import Client from "@/models/users";
import type { NextAuthOptions } from "next-auth";
import credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions  = {
    providers: [
        credentials({
        name: "Credentials",
        id: "credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
            await connectDB();
            const user = await Client.findOne({
            email: credentials?.email,
            }).select("+password");

            if (!user) throw new Error("Wrong Email");

            const passwordMatch = await bcrypt.compare(
                    credentials!.password,
                    user.password
            );

            if (!passwordMatch) throw new Error("Wrong Password");
            return  {
                        id: user._id.toString(),
                        name: user.username,
                        email: user.email,
                    };

        },
        }),
    ],
    session: {
        strategy: "jwt",
    }
};