import { useLoaderData, useFetcher, Link } from "react-router";

function PostComments() {
  const { data } = useLoaderData();

  return (
    <main>
      <h2>Comments</h2>
      <div>
        {data.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </main>
  );
}

function Comment({ comment }) {
  const fetcher = useFetcher();

  const error = fetcher.data;

  const isDeleting = fetcher.state !== "idle";

  const { id, postId, content, createdAt, updatedAt, authorId } = comment;

  const userUrl = `someUrl/${authorId}`;
  const createTime = new Date(createdAt).toLocaleString();
  const updateTime = new Date(updatedAt).toLocaleString();
  const isUpdated = createTime !== updateTime;

  return (
    <div>
      <h3>{content}</h3>
      <p>Created At {createTime}</p>
      {isUpdated && <p>Updated At {updateTime}</p>}
      <Link to={userUrl}>User</Link>
      <fetcher.Form method="DELETE">
        <input type="hidden" name="commentId" value={id} />
        <input type="hidden" name="postId" value={postId} />
        <button type="submit" disabled={isDeleting}>
          {isDeleting ? "DELETING" : "DELETE"}
        </button>
        {error && <p>{error.msg}</p>}
      </fetcher.Form>
    </div>
  );
}

export default PostComments;
