import App from "./App";
import ErrorPage from "./components/ErrorPage";
import IndexPage from "./components/IndexPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <IndexPage /> }],
  },
];

export default routes;
