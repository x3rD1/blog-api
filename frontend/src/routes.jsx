import App from "./App";
import ErrorPage from "./components/ErrorPage";
import IndexPage from "./components/IndexPage";
import BlogsPage from "./components/BlogsPage";

const routes = [
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <IndexPage /> },
      { path: "blogs", element: <BlogsPage /> },
    ],
  },
];

export default routes;
