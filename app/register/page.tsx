"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";

export default function RegisterPage() {
  const [state, formAction] = useActionState(registerUser, {
    errors: {},
    values: {
      username: "",
      name: "",
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="font-bold text-3xl mb-5">Register</h2>

      <form action={formAction} className="space-y-6">
        {/* Username */}
        <div className="grid grid-cols-[150px_1fr] items-center gap-3">
          <label className="font-medium">Username</label>
          <input
            type="text"
            name="username"
            defaultValue={state.values?.username}
            className="border rounded p-3"
          />
        </div>
        {state.errors?.username && (
          <p className="text-red-500">{state.errors.username}</p>
        )}

        {/* Name */}
        <div className="grid grid-cols-[150px_1fr] items-center gap-3">
          <label className="font-medium">Name</label>
          <input
            type="text"
            name="name"
            defaultValue={state.values?.name}
            className="border rounded p-3"
          />
        </div>

        {/* Password */}
        <div className="grid grid-cols-[150px_1fr] items-center gap-3">
          <label className="font-medium">Password</label>
          <input
            type="password"
            name="password"
            className="border rounded p-3"
          />
        </div>
        {state.errors?.password && (
          <p className="text-red-500">{state.errors.password}</p>
        )}

        {/* Password confirmation */}
        <div className="grid grid-cols-[150px_1fr] items-center gap-3">
          <label className="font-medium">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirm"
            className="border rounded p-3"
          />
        </div>
        {state.errors?.passwordConfirm && (
          <p className="text-red-500">{state.errors.passwordConfirm}</p>
        )}

        {/* Submit button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="border rounded py-3 px-8 hover:bg-gray-700"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
