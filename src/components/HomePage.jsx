import { Suspense, useState } from "react";
import {
  Await,
  Link,
  useFetcher,
  useLoaderData,
  useAsyncValue,
} from "react-router";
import styles from "../assets/css/HomePage.module.css";

function HomePage() {
  const [activeSection, setActiveSection] = useState(0);
  const { publicPosts, privatePostsPromise } = useLoaderData();
  const { data: publicPostsArr } = publicPosts;

  return (
    <main className={styles.container}>
      <p className={styles.title}>Posts</p>

      <div className={styles.btnContainer}>
        <button
          className={`${styles.btn} ${
            activeSection === 0 ? styles.activeBtn : ""
          }`}
          onClick={() => setActiveSection(0)}
        >
          Public
        </button>
        <button
          className={`${styles.btn} ${
            activeSection === 1 ? styles.activeBtn : ""
          }`}
          onClick={() => setActiveSection(1)}
        >
          Private
        </button>
      </div>

      {activeSection === 0 && (
        <div>
          {publicPostsArr.map((postData) => (
            <Post key={postData.id} postData={postData} type="public" />
          ))}
        </div>
      )}

      {activeSection === 1 && (
        <Suspense fallback={<p>Loading Private Posts...</p>}>
          <Await resolve={privatePostsPromise}>
            <PrivatePosts />
          </Await>
        </Suspense>
      )}
    </main>
  );
}

function PrivatePosts() {
  const resolvedPrivatePosts = useAsyncValue();
  const { data: privatePostsArr } = resolvedPrivatePosts;
  return (
    <div>
      {privatePostsArr.map((postData) => (
        <Post key={postData.id} postData={postData} type="private" />
      ))}
    </div>
  );
}

function Post({ postData, type }) {
  const { id, title, createdAt, updatedAt } = postData;

  const fetcher = useFetcher();
  const isDeleting = fetcher.state !== "idle";

  const postUrl = `https://blogly.pages.dev/posts/${id}`;
  const createTime = new Date(createdAt).toLocaleString();
  const updateTime = new Date(updatedAt).toLocaleString();
  const isUpdated = createTime !== updateTime;

  return (
    <div className={styles.post}>
      <h4 className={styles.postTitle}>
        {type === "public" ? <Link to={postUrl}>{title}</Link> : title}
      </h4>
      <p className={styles.postInfo}>Created At {createTime}</p>
      {isUpdated && <p className={styles.postInfo}>Updated At {updateTime}</p>}
      <div>
        <hr className={styles.separator} />
        <div className={styles.postActionBar}>
          <Link className={styles.actionLink} to={`/posts/${id}/comments`}>
            Comments
          </Link>
          <Link className={styles.actionLink} to={`/posts/${id}/edit`}>
            Edit
          </Link>
          <fetcher.Form method="DELETE" className={styles.dltForm}>
            <button
              className={styles.deleteBtn}
              type="submit"
              name="postId"
              value={id}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting" : "Delete"}
            </button>
          </fetcher.Form>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
