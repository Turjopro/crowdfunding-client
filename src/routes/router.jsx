import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/login";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page Coming Soon</div>,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <div>Dashboard Coming Soon (Private Page)</div>
      </PrivateRoute>
    ),
  },
]);

export default router;