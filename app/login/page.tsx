
"use client"

import { useState } from "react";
import LoginForm from "@/components/loginForm";
import SignUpForm from "@/components/signupForm";

export default function AuthForm() {



  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp((prev) => !prev);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [username, setUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center px-4 w-full"
      style={{ width: "100vw" }}
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {isSignUp ? (
          <SignUpForm
            username={username}
            email={newEmail}
            password={newPassword}
            setUsername={setUsername}
            setEmail={setNewEmail}
            setPassword={setNewPassword}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            toggleForm={toggleForm}
          />
        ) : (
          <LoginForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            onSubmit={(e) => {
              e.preventDefault();
            }}
            toggleForm={toggleForm}
          />
        )}
      </div>
    </div>
  );
}
