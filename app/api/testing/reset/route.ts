import { NextRequest, NextResponse } from "next/server";
import { resetBlogs } from "../../../services/blogs";
import { resetUsers } from "../../../services/users";
import { resetReadingLists } from "../../../services/readingLists";
import { revalidatePath } from "next/cache";

export const DELETE = async () => {
  console.log("RESET API CALLED");

  await resetReadingLists();
  console.log("readingLists deleted");

  await resetBlogs();
  console.log("blogs deleted");

  await resetUsers();
  console.log("users deleted");

  return new NextResponse(null, { status: 204 });
};
