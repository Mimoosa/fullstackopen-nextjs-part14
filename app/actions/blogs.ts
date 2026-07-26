"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, addLikes } from "../services/blogs";

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  await addBlog(title, author, url);

  revalidatePath("/blogs");
  redirect("/blogs");
};

export const addBlogLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await addLikes(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};

export const filterBlogs = async (formData: FormData) => {
  const word = formData.get("keyword") as string;

  redirect(`/blogs?filter=${word}`);
};
