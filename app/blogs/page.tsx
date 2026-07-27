import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { filterBlogs } from "../actions/blogs";
import { forbidden } from "next/navigation";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const allBlogs = await getBlogs(filter);
  const sortedBlogs = [...allBlogs].sort((a, b) => b.likes - a.likes);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="font-bold text-3xl mb-5">blogs</h2>
      <div>
        <p>enter a searching keyword</p>
        <form action={filterBlogs}>
          <input
            type="text"
            name="keyword"
            required
            className="border rounded p-3 mt-2"
          />
          <button
            type="submit"
            className="border rounded p-3 hover:bg-gray-700"
          >
            submit
          </button>
        </form>
      </div>
      <ul>
        {sortedBlogs.map((blog) => (
          <li
            key={blog.id}
            className="border rounded p-3 hover:bg-gray-700 mt-5"
          >
            <Link
              href={`/blogs/${blog.id}`}
              className="text-amber-600 hover:underline"
            >
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
