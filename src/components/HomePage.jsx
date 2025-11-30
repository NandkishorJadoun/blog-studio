import { Suspense, useState } from "react";
import { useLoaderData, Await, Link, useAsyncValue } from "react-router";

function Post({ postData, type }) {
  const { id, title, createdAt, updatedAt } = postData;
  const postTitle =
    type === "public" ? (
      <Link to={"the other frontend link" + id}>
        <h4>{title}</h4>
      </Link>
    ) : (
      <h4>{title}</h4>
    );

  const createTime = new Date(createdAt).toLocaleString();
  const updateTime = new Date(updatedAt).toLocaleString();
  const isUpdated = createTime !== updateTime;

  return (
    <div>
      {postTitle}
      <p>Created At {createTime}</p>
      {isUpdated && <p>Updated At {updateTime}</p>}
      <div>
        <Link to={`/posts/${id}`}>Update</Link>
        <Link to={`/posts/${id}/comments`}>Comments</Link>
        <button>{/* gonna be form */}Delete</button>
      </div>
      <br />
    </div>
  );
}

function PrivatePosts() {
  const resolvedPrivatePosts = useAsyncValue();
  const { data: privatePostsArr } = resolvedPrivatePosts;
  return (
    <div>
      {privatePostsArr.map((postData) => Post({ postData, type: "private" }))}
    </div>
  );
}

function HomePage() {
  const [activeSection, setActiveSection] = useState(0);
  const { publicPosts, privatePostsPromise } = useLoaderData();

  const { data: publicPostsArr } = publicPosts;

  const fullName = localStorage.getItem("fullName");

  return (
    <main>
      <h2>Welcome to the Studio, {fullName}</h2>

      <h3>Posts</h3>

      <div>
        <button onClick={() => setActiveSection(0)}>Public</button>
        <button onClick={() => setActiveSection(1)}>Private</button>
      </div>

      {activeSection === 0 && (
        <div>
          {publicPostsArr.map((postData) => Post({ postData, type: "public" }))}
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

export default HomePage;
