import { redirect } from "react-router";

const loadAuthorPosts = async () => {
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

const loadPostById = async ({ params }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw redirect("/login");
  }

  const { postId } = params;
  const postResponse = await fetch(
    `http://localhost:3000/api/v1/posts/${postId}`
  );

  const data = await postResponse.json();
  return data;
};

const loadCommentsByPostId = async ({ params }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw redirect("/login");
  }

  const { postId } = params;

  const res = await fetch(
    `http://localhost:3000/api/v1/posts/${postId}/comments`
  );

  const data = await res.json();
  return data;
};

export { loadAuthorPosts, loadPostById, loadCommentsByPostId };
