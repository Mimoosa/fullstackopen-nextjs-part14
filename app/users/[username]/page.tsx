import Link from "next/link";
import { notFound } from "next/navigation";
import { getUserWithNotes } from "../../services/users";

const UserPage = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserWithNotes(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="font-bold text-3xl mb-5">{user.name}</h2>
      <p>Username: {user.username}</p>
      <h3 className="text-lg mt-5">Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li
            key={blog.id}
            className="border rounded p-3 hover:bg-gray-700 mb-5"
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

export default UserPage;
