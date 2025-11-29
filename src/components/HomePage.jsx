import { Suspense, useState } from "react";
import { useLoaderData, Await } from "react-router";

function HomePage() {
  const [activeSection, setActiveSection] = useState(0);
  const { publicPosts, privatePostsPromise } = useLoaderData();

  /* const { data } = publicPosts; */

  const fullName = localStorage.getItem("fullName");

  return (
    <main>
      <h2>Welcome to the Studio, {fullName}</h2>

      <h3>Posts</h3>
      <div>
        <button onClick={() => setActiveSection(0)}>Public</button>
        <button onClick={() => setActiveSection(1)}>Private</button>
      </div>

      {activeSection === 0 && <div>{JSON.stringify(publicPosts)}</div>}
      {activeSection === 1 && (
        <Suspense fallback={<p>Loading Private Posts...</p>}>
          <Await resolve={privatePostsPromise}>
            {(privatePosts) => JSON.stringify(privatePosts)}
          </Await>
        </Suspense>
      )}
    </main>
  );
}

export default HomePage;
