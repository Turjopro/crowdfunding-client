import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/login";
import PrivateRoute from "./PrivateRoute";
import ExploreCampaigns from "../pages/ExploreCampaigns";
import CampaignDetails from "../pages/CampaignDetails";
import SupporterHome from "../pages/dashboard/SupporterHome";
import CreatorHome from "../pages/dashboard/CreatorHome";
import AdminHome from "../pages/dashboard/AdminHome";
import AddCampaign from "../pages/dashboard/AddCampaign";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "explore-campaigns", element: <ExploreCampaigns /> },
      {
        path: "campaign/:id",
        element: (
          <PrivateRoute>
            <CampaignDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <div>Welcome to your dashboard</div> },
      { path: "supporter-home", element: <SupporterHome /> },
      { path: "creator-home", element: <CreatorHome /> },
      { path: "admin-home", element: <AdminHome /> },
      { path: "my-contributions", element: <div>My Contributions (Coming Soon)</div> },
      { path: "purchase-credit", element: <div>Purchase Credit (Coming Soon)</div> },
      { path: "payment-history", element: <div>Payment History (Coming Soon)</div> },
      { path: "add-campaign", element: <AddCampaign /> },
      { path: "my-campaigns", element: <div>My Campaigns (Coming Soon)</div> },
      { path: "withdrawals", element: <div>Withdrawals (Coming Soon)</div> },
      { path: "manage-users", element: <div>Manage Users (Coming Soon)</div> },
      { path: "manage-campaigns", element: <div>Manage Campaigns (Coming Soon)</div> },
      { path: "withdrawal-requests", element: <div>Withdrawal Requests (Coming Soon)</div> },
      { path: "reports", element: <div>Reports (Coming Soon)</div> },
    ],
  },
]);

export default router;