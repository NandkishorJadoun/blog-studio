import { userContext } from "./context";

const API_BASE = "http://localhost:3000/api/v1";

const loadAuthorPosts = async ({ context }) => {
  const token = context.get(userContext);
  const publicPostsRes = await fetch(`${API_BASE}/posts/author?type=PUBLIC`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  const publicPosts = await publicPostsRes.json();

  const privatePostsPromise = fetch(`${API_BASE}/posts/author?type=PRIVATE`, {
    headers: { Authorization: `Bearer ${token}` },
  }).then((r) => r.json());

  return { publicPosts, privatePostsPromise };
};

const loadPostById = async ({ params }) => {
  const { postId } = params;
  const postResponse = await fetch(`${API_BASE}/posts/${postId}`);

  return await postResponse.json();
};

const loadCommentsByPostId = async ({ params }) => {
  const { postId } = params;

  const res = await fetch(`${API_BASE}/posts/${postId}/comments`);

  return await res.json();
};

export { loadAuthorPosts, loadPostById, loadCommentsByPostId };
