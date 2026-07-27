import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { addBlogLikes } from "../../actions/blogs";

const BlogPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="font-bold text-3xl mb-5">{blog.title}</h2>
      <p>author: {blog.author}</p>
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes}</p>
      <form action={addBlogLikes}>
        <input type="hidden" name="id" value={blog.id} />
        <button
          type="submit"
          className="border rounded p-3 hover:bg-gray-700 mt-5"
        >
          like the blog
        </button>
      </form>
    </div>
  );
};

export default BlogPage;
