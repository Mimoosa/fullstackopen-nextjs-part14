"use server";

import { auth } from "@/auth";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addBlog, addLikes } from "../services/blogs";

export const createBlog = async (
  prevState: {
    errors: {
      title?: string;
      author?: string;
      url?: string;
    };
    values: {
      title: string;
      author: string;
      url: string;
    };
  },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const errors: {
    title?: string;
    author?: string;
    url?: string;
  } = {};

  const title = formData.get("title") as string;
  if (!title || title.length < 5) {
    errors.title = "Blog title must be at least 5 characters long";
  }
  const author = formData.get("author") as string;
  if (!author || author.length < 5) {
    errors.author = "Author's name must be at least 5 characters long";
  }
  const url = formData.get("url") as string;
  if (!url || url.length < 5) {
    errors.url = "Blog url must be at least 5 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false };
  }
  await addBlog(title, author, url);

  revalidatePath("/blogs");
  return {
    errors: {},
    values: { title, author, url },
    success: true,
  };
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
