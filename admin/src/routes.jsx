import App from "./App";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";

const routes = [
  { path: "/login", element: <Login /> },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  //   {
  //     path: "/create",
  //     element: (
  //       <ProtectedRoute>
  //         <CreatePost />
  //       </ProtectedRoute>
  //     ),
  //   },
];

export default routes;
