import AppLayout from "./AppLayout";
import LogInPage from "./components/LoginPage";
import SignUpPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import {
  signUpAction,
  logInAction,
  createPostAction,
  editPostAction,
} from "./assets/js/actions";
import { loadAuthorPosts, loadPostById } from "./assets/js/loaders";

import EditPostLoadError from "./components/EditPostLoadError";

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    /* errorElement: <ErrorPage />, */
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: loadAuthorPosts,
      },
      {
        path: "create",
        element: <CreatePost />,
        action: createPostAction,
      },
      {
        path: "posts/:postId/edit",
        element: <EditPost />,
        errorElement: <EditPostLoadError/>,
        loader: loadPostById,
        action: editPostAction,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    action: signUpAction,
  },
  {
    path: "/login",
    element: <LogInPage />,
    action: logInAction,
  },
];

export default routes;
