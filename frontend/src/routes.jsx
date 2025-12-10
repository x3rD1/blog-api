import App from "./App";
import ErrorPage from "./components/ErrorPage";
import IndexPage from "./components/IndexPage";
import BlogsPage from "./components/BlogsPage";
import Post from "./components/Post";
import Signin from "./components/Signin";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <IndexPage /> },
      { path: "blogs", element: <BlogsPage /> },
      { path: "post/:slug", element: <Post /> },
      { path: "/signin", element: <Signin /> },
    ],
  },
];

export default routes;
