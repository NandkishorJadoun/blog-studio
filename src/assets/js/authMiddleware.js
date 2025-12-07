import { userContext } from "./context";
import { redirect } from "react-router";

const authMiddleware = ({ context }) => {
  const user = localStorage.getItem("token");
  if (!user) {
    throw redirect("/login");
  }
  context.set(userContext, user);
};

export default authMiddleware;
