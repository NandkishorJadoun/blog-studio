import { redirect } from "react-router";

const signUpAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    email: data.get("email"),
    password: data.get("password"),
    confirmPassword: data.get("confirmPassword"),
  };

  const response = await fetch("http://localhost:3000/api/v1/accounts/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    const data = await response.json();
    return data.errors;
  }

  return redirect("/login");
};

const logInAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://localhost:3000/api/v1/accounts/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    const error = await response.json();
    return error.info;
  }

  const json = await response.json();

  const { user } = json;
  const fullName = user.firstName + " " + user.lastName;

  localStorage.setItem("token", json.token);
  localStorage.setItem("userid", user.id);
  localStorage.setItem("fullName", fullName);

  return redirect("/");
};

const createPostAction = async ({ request }) => {
  const token = localStorage.getItem("token");
  const data = await request.formData();
  const submission = {
    title: data.get("title"),
    content: data.get("content"),
    status: data.get("visibility"),
  };

  const response = await fetch("http://localhost:3000/api/v1/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    const json = await response.json();
    return json.errors;
  }

  return redirect("/");
};

const editPostAction = async ({ params, request }) => {
  const { postId } = params;
  const data = await request.formData();
  const submission = {
    title: data.get("title"),
    content: data.get("content"),
    status: data.get("visibility"),
  };

  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    const json = await response.json();

    // Convert error message in array to make consistency in error handling

    return response.status === 403 ? [json] : json.errors;
  }

  return redirect("/");
};

const deletePostAction = async ({ request }) => {
  const token = localStorage.getItem("token");
  const data = await request.formData();
  const postId = data.get("postId");

  const response = await fetch(`http://localhost:3000/api/v1/posts/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const json = await response.json();
    return { ok: false, msg: json.msg };
  }

  return { ok: true };
};

const deleteCommentAction = async ({ request }) => {
  const token = localStorage.getItem("token");
  const data = await request.formData();
  const postId = data.get("postId");
  const commentId = data.get("commentId");

  const response = await fetch(
    `http://localhost:3000/api/v1/posts/${postId}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const json = await response.json();
    const { msg } = json;
    return { ok: false, msg };
  }

  return { ok: true };
};

export {
  signUpAction,
  logInAction,
  createPostAction,
  editPostAction,
  deletePostAction,
  deleteCommentAction,
};
