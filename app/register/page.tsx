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
        <div className="grid grid-cols-[150px_1fr] items-center gap-3">
          <label htmlFor="username" className="font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            name="username"
            defaultValue={state.values?.username}
            className="border rounded p-3"
          />
        </div>
        {state.errors?.username && (
          <p data-testid="username-error" className="text-red-500">
            {state.errors.username}
          </p>
        )}

        <div className="grid grid-cols-[150px_1fr] items-center gap-3">
          <label htmlFor="name" className="font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            defaultValue={state.values?.name}
            className="border rounded p-3"
          />
        </div>

        <div className="grid grid-cols-[150px_1fr] items-center gap-3">
          <label htmlFor="password" className="font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="border rounded p-3"
          />
        </div>
        {state.errors?.password && (
          <p className="text-red-500">{state.errors.password}</p>
        )}

        <div className="grid grid-cols-[150px_1fr] items-center gap-3">
          <label htmlFor="passwordConfirm" className="font-medium">
            Confirm Password
          </label>
          <input
            id="passwordConfirm"
            type="password"
            name="passwordConfirm"
            className="border rounded p-3"
          />
        </div>
        {state.errors?.passwordConfirm && (
          <p data-testid="passwordConfirm-error" className="text-red-500">
            {state.errors.passwordConfirm}
          </p>
        )}

        {/* Submit button */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            data-testid="register-button"
            className="border rounded py-3 px-8 hover:bg-gray-700"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
