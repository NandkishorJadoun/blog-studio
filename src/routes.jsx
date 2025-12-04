import { lazy } from "react";

import AppLayout from "./AppLayout";
import HomePage from "./components/HomePage";
const CreatePost = lazy(() => import("./components/CreatePost"));
const EditPost = lazy(() => import("./components/EditPost"));
const SignUpPage = lazy(() => import("./components/SignupPage"));
const LogInPage = lazy(() => import("./components/LoginPage"));
const PostLoadError = lazy(() => import("./components/EditPostLoadError"));
const PostComments = lazy(() => import("./components/PostComments"));

import {
  signUpAction,
  logInAction,
  createPostAction,
  editPostAction,
  deletePostAction,
  deleteCommentAction,
} from "./assets/js/actions";

import {
  loadAuthorPosts,
  loadPostById,
  loadCommentsByPostId,
} from "./assets/js/loaders";

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
        ErrorBoundary: PostLoadError,
        loader: loadPostById,
        action: editPostAction,
      },
      {
        path: "posts/:postId/comments",
        Component: PostComments,
        ErrorBoundary: PostLoadError,
        loader: loadCommentsByPostId,
        action: deleteCommentAction,
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
