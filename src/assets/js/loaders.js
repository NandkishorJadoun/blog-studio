import { redirect } from "react-router";

const posts = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw redirect("/login");
  }

  const publicPostsRes = await fetch(
    "http://localhost:3000/api/v1/posts/author?type=PUBLIC",
    { headers: { Authorization: `Bearer ${token}` } }
  );

  const publicPosts = await publicPostsRes.json();

  const privatePostsPromise = fetch(
    "http://localhost:3000/api/v1/posts/author?type=PRIVATE",
    { headers: { Authorization: `Bearer ${token}` } }
  ).then((r) => r.json());

  return { publicPosts, privatePostsPromise };
};

export default { posts };
