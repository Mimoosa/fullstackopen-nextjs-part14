import { eq } from "drizzle-orm";
import { db } from "../../db";
import { blogs, readingLists, users } from "../../db/schema";
import { getCurrentUser } from "./session";

export const getMyReadingLists = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  return db.query.readingLists.findMany({
    where: eq(readingLists.userId, user.id),
    with: { blog: true },
  });
};

export const addReadingList = async (blogId: number) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not logged in");
  }
  const myReadingLists = await getMyReadingLists();
  if (myReadingLists.filter((list) => list.blogId === blogId).length === 0) {
    await db.insert(readingLists).values({ userId: user.id, blogId: blogId });
  }
};

export const getReadingListById = async (id: number) => {
  return db.query.readingLists.findFirst({
    where: eq(readingLists.id, id),
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
