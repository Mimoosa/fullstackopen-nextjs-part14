import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { filterBlogs } from "../actions/blogs";

const Blogs = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const allBlogs = await getBlogs();
  const sortedBlogs = [...allBlogs].sort((a, b) => b.likes - a.likes);

  const blogs = filter
    ? sortedBlogs.filter((blog) =>
        blog.title.toLowerCase().includes(filter.toLowerCase()),
      )
    : sortedBlogs;

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <p>enter a searching keyword</p>
        <form action={filterBlogs}>
          <input type="text" name="keyword" required />
          <button type="submit">submit</button>
        </form>
      </div>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>
              {blog.title} by {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blogs;
