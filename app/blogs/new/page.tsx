"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createBlog } from "@/app/actions/blogs";
import { useNotification } from "../../components/NotificationContext";

const NewBlog = () => {
  const [state, formAction] = useActionState(createBlog, {
    errors: {},
    values: {
      title: "",
      author: "",
      url: "",
    },
    success: false,
  });
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="font-bold text-3xl mb-5">Create a new blog</h2>
      <form action={formAction}>
        <div className="grid grid-cols-2 items-center mb-5">
          <label htmlFor="title" className="font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            defaultValue={state.values.title}
            className="border rounded p-3"
          />
        </div>
        {state.errors.title && (
          <p className="text-red-500">{state.errors.title}</p>
        )}

        <div className="grid grid-cols-2 items-center mb-5">
          <label htmlFor="author" className="font-medium">
            Author
          </label>
          <input
            id="author"
            type="text"
            name="author"
            defaultValue={state.values.author}
            className="border rounded p-3"
          />
        </div>
        {state.errors.author && (
          <p className="text-red-500">{state.errors.author}</p>
        )}

        <div className="grid grid-cols-2 items-center mb-5">
          <label htmlFor="url" className="font-medium">
            URL
          </label>
          <input
            id="url"
            type="text"
            name="url"
            defaultValue={state.values.url}
            className="border rounded p-3"
          />
        </div>
        {state.errors.url && <p className="text-red-500">{state.errors.url}</p>}

        <div className="flex justify-center">
          <button
            type="submit"
            data-testid="create-blog-button"
            className="border rounded py-3 px-8 hover:bg-gray-700"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewBlog;
