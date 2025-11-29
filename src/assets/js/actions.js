import { redirect } from "react-router";

const signUp = async ({ request }) => {
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

const logIn = async ({ request }) => {
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

export default { signUp, logIn };
