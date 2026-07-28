import { db } from "../../db";
import { eq } from "drizzle-orm";
import { users, blogs } from "../../db/schema";

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
