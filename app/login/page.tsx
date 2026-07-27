"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const result = await signIn("credentials", {
      username: formData.get("username"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="font-bold text-3xl mb-5">Login</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-[150px_1fr] items-center gap-3">
          <label className="font-medium">Username</label>
          <input
            type="text"
            name="username"
            required
            className="border rounded p-3"
          />
        </div>

        <div className="grid grid-cols-[150px_1fr] items-center gap-3">
          <label className="font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            className="border rounded p-3"
          />
        </div>

        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="border rounded py-3 px-8 hover:bg-gray-700"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
