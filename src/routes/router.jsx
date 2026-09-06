import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";
import Login from "../pages/login";

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
]);

export default router;