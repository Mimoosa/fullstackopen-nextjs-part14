import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { addBlogLikes } from "../../actions/blogs";
import { addMyReadingList } from "../../actions/readingLists";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="font-bold text-3xl">{blog.title}</h2>
      <p>by {blog.author}</p>
      <div className="flex gap-5 items-center my-5">
        <p>likes: {blog.likes}</p>
        <form action={addBlogLikes}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="bg-blue-700 rounded px-3 py-2 hover:bg-blue-600"
          >
            like
          </button>
        </form>
        <form action={addMyReadingList}>
          <input type="hidden" name="id" value={blog.id} />
          <button
            type="submit"
            className="bg-green-700 rounded px-3 py-2 hover:bg-green-600"
          >
            add to reading list
          </button>
        </form>
      </div>
      <p>{blog.url}</p>
    </div>
  );
};

export default BlogPage;
