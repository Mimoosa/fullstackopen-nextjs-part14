const blogs = [
  {
    id: 1,
    title: "title1",
    author: "author1",
    url: "http://url1.com",
    likes: 0,
  },
  {
    id: 2,
    title: "title2",
    author: "author2",
    url: "http://url2.com",
    likes: 0,
  },
  {
    id: 3,
    title: "title3",
    author: "author3",
    url: "http://url3.com",
    likes: 0,
  },
];

let nextId = 4;

export async function getBlogs() {
  return blogs;
}

export const addBlog = (title: string, author: string, url: string) => {
  blogs.push({ id: nextId++, title, author, url, likes: 0 });
};

export const getBlogById = (id: number) => {
  return blogs.find((blog) => blog.id === id);
};

export const addLikes = (id: number) => {
  const blog = blogs.find((blog) => blog.id === id);
  if (blog) {
    blog.likes = blog.likes + 1;
  }
};
