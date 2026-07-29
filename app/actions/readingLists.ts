"use server";

import { auth } from "@/auth";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addReadingList, markAsRead } from "../services/readingLists";

export const addMyReadingList = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const id = Number(formData.get("id"));
  await addReadingList(id);
  revalidatePath("/me");
};

export const markReadingListAsRead = async (formData: FormData) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const id = Number(formData.get("id"));
  await markAsRead(id);
  revalidatePath("/me");
};
