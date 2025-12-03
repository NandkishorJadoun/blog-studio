import { lazy } from "react";

import AppLayout from "./AppLayout";
import HomePage from "./components/HomePage";
const CreatePost = lazy(() => import("./components/CreatePost"));
const EditPost = lazy(() => import("./components/EditPost"));
const SignUpPage = lazy(() => import("./components/SignupPage"));
const LogInPage = lazy(() => import("./components/LoginPage"));
const EditPostLoadError = lazy(() => import("./components/EditPostLoadError"));

import {
  signUpAction,
  logInAction,
  createPostAction,
  editPostAction,
  deletePostAction,
} from "./assets/js/actions";

import { loadAuthorPosts, loadPostById } from "./assets/js/loaders";

const routes = [
  {
    path: "/",
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: loadAuthorPosts,
        action: deletePostAction,
      },
      {
        path: "create",
        Component: CreatePost,
        action: createPostAction,
      },
      {
        path: "posts/:postId/edit",
        Component: EditPost,
        ErrorBoundary: EditPostLoadError,
        loader: loadPostById,
        action: editPostAction,
      },
    ],
  },
  {
    path: "/signup",
    Component: SignUpPage,
    action: signUpAction,
  },
  {
    path: "/login",
    Component: LogInPage,
    action: logInAction,
  },
];

export default routes;
