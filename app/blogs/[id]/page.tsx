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
    <div>
      <h2>{blog.title}</h2>
      <p>author: {blog.author}</p>
      <p>url: {blog.url}</p>
      <p>likes: {blog.likes}</p>
      <form action={addBlogLikes}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">like the blog</button>
      </form>
    </div>
  );
};

export default BlogPage;
