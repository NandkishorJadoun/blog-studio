import { useLoaderData } from "react-router";

function EditPostLoadError() {
  const error = useLoaderData();
  return <div>{error.msg}</div>;
}

export default EditPostLoadError;
