

interface SignUpFormProps {
  username: string;
  email: string;
  password: string;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  toggleForm: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  username,
  email,
  password,
  setUsername,
  setEmail,
  setPassword,
  onSubmit,
  toggleForm,
}) => {
  return (
    <div className="dark:text-neutral-900">
      <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="yourusername"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
      </form>

      <p className="text-sm text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <button
          onClick={toggleForm}
          className="text-blue-600 hover:underline cursor-pointer"
          type="button"
        >
          Log in
        </button>
      </p>
    </div>
  );
};

export default SignUpForm;
