import { db } from "../../db";
import { eq } from "drizzle-orm";
import { users } from "../../db/schema";
import bcrypt from "bcryptjs";

export const getUsers = async () => {
  return db.query.users.findMany();
};

export const getUserWithNotes = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: { blogs: true },
  });
};

export const getUserByUsername = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
  });
};

export const getUserByToken = async (token: string) => {
  return db.query.users.findFirst({
    where: eq(users.token, token),
  });
};

export const resetUsers = async () => {
  await db.delete(users);
};

export const createTestUser = async (
  username: string,
  name: string,
  password: string,
) => {
  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });
};
