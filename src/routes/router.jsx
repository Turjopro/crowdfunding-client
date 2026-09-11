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
import MyCampaigns from "../pages/dashboard/MyCampaigns";
import Withdrawals from "../pages/dashboard/Withdrawals";
import CreatorPaymentHistory from "../pages/dashboard/CreatorPaymentHistory";
import MyContributions from "../pages/dashboard/MyContributions";
import PurchaseCredit from "../pages/dashboard/PurchaseCredit";

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
      { path: "my-contributions", element: <MyContributions /> },
      { path: "purchase-credit", element: <PurchaseCredit /> },
      { path: "payment-history", element: <CreatorPaymentHistory /> },
      { path: "add-campaign", element: <AddCampaign /> },
      { path: "my-campaigns", element: <MyCampaigns /> },
      { path: "withdrawals", element: <Withdrawals /> },
      { path: "manage-users", element: <div>Manage Users (Coming Soon)</div> },
      { path: "manage-campaigns", element: <div>Manage Campaigns (Coming Soon)</div> },
      { path: "withdrawal-requests", element: <div>Withdrawal Requests (Coming Soon)</div> },
      { path: "reports", element: <div>Reports (Coming Soon)</div> },
      
    ],
  },
]);

export default router;