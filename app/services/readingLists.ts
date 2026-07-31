import { eq, and } from "drizzle-orm";
import { db } from "../../db";
import { blogs, readingLists, users } from "../../db/schema";
import { getCurrentUser } from "./session";

export const getMyReadingLists = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  const lists = await db.query.readingLists.findMany({
    where: eq(readingLists.userId, user.id),
    with: { blog: true },
  });

  return lists;
};

export const addReadingList = async (blogId: number) => {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Not logged in");
  }
  const blog = await db.query.blogs.findFirst({
    where: eq(blogs.id, blogId),
  });

  if (!blog) {
    throw new Error("Blog does not exist");
  }
  const exists = await db.query.readingLists.findFirst({
    where: and(
      eq(readingLists.blogId, blogId),
      eq(readingLists.userId, user.id),
      eq(readingLists.read, false),
    ),
  });

  if (!exists) {
    await db.insert(readingLists).values({
      userId: user.id,
      blogId,
      read: false,
    });
  }
};

export const getReadingListById = async (id: number) => {
  return db.query.readingLists.findFirst({
    where: eq(readingLists.id, id),
    with: {
      blog: true,
    },
  });
};

export const markAsRead = async (id: number) => {
  const readingList = await getReadingListById(id);
  if (readingList) {
    await db
      .update(readingLists)
      .set({ read: true })
      .where(eq(readingLists.id, id));
  }
};

export const resetReadingLists = async () => {
  await db.delete(readingLists);
};
