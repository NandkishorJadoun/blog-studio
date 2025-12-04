import { useLoaderData } from "react-router";

function PostLoadError() {
  const error = useLoaderData();
  return <div>{error.msg}</div>;
}

export default PostLoadError;
