import AppLayout from "./AppLayout";
import LogInPage from "./components/LoginPage";
import SignUpPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import CreatePost from "./components/CreatePost";
import actions from "./assets/js/actions";
import loaders from "./assets/js/loaders";

const routes = [
  {
    path: "/",
    element: <AppLayout />,
    /* errorElement: <ErrorPage />, */
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: loaders.posts,
      },
      {
        path: "create",
        element: <CreatePost />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    action: actions.signUp,
  },
  {
    path: "/login",
    element: <LogInPage />,
    action: actions.logIn,
  },
];

export default routes;
