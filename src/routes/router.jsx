import { createBrowserRouter } from "react-router-dom";
import Register from "../pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Home Page Coming Soon</div>,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default router;