"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { db } from "../../db";
import { users } from "../../db/schema";
import { getUserByUsername } from "../services/users";

export const registerUser = async (
  prevState: {
    errors: {
      username?: string;
      password?: string;
      passwordConfirm?: string;
    };
    values: {
      username: string;
      name: string;
    };
  },
  formData: FormData,
) => {
  const errors: {
    username?: string;
    password?: string;
    passwordConfirm?: string;
  } = {};

  const username = (formData.get("username") as string)?.trim();
  if (!username || username.length < 4) {
    errors.username = "username must be at least 4 characters long";
  }

  const otherUser = await getUserByUsername(username);
  if (otherUser) {
    errors.username = "The username already exists, use another username";
  }

  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  if (!password || password.length < 4) {
    errors.password = "password must be at least 4 characters long";
  }
  const passwordConfirm = formData.get("passwordConfirm") as string;
  if (!passwordConfirm || password !== passwordConfirm) {
    errors.passwordConfirm =
      "password confirmation value must match password value ";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { username, name } };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};
