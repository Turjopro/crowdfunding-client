import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/login";
import PrivateRoute from "./PrivateRoute";
import ExploreCampaigns from "../pages/ExploreCampaigns";
import CampaignDetails from "../pages/CampaignDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "explore-campaigns",
        element: <ExploreCampaigns />,
      },
      {
        path: "campaign/:id",
        element: (
          <PrivateRoute>
            <CampaignDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <div>Dashboard Coming Soon (Private Page)</div>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;