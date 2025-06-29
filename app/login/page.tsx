
"use client"

import { useState, FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AuthForm() {


  const [error, setError] = useState("");
  const router = useRouter();



  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    if (res?.error) {
      setError(res.error as string);
    }
    if (res?.ok) {
      const email = formData.get("email")
      if(email === "admin@gmail.com"){
        return router.push("/dashboard");
      }else{
        return router.push("/");
      }
      
    }
};

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-300">
        <form
          className="p-8 w-full max-w-[400px] flex flex-col gap-4 bg-white border border-gray-300 rounded-2xl shadow-xl"
          onSubmit={handleSubmit}
        >
          {error && (
            <div className="w-full p-2 text-red-700 bg-red-100 rounded text-sm text-center">
              {error}
            </div>
          )}

          <h1 className="text-3xl font-extrabold text-center mb-2">Sign In</h1>

          <label className="w-full text-sm font-medium">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            name="email"
          />

          <label className="w-full text-sm font-medium">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black transition"
            name="password"
          />

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded mt-2 hover:bg-gray-800 transition"
          >
            Sign In
          </button>

          <Link
            href="/login/register"
            className="text-sm text-gray-500 hover:text-black text-center mt-2 transition"
          >
            Don&apos;t have an account?
          </Link>
        </form>
      </section>


);
}
