import { Link, Outlet, NavLink } from 'react-router-dom';
import useRole from '../hooks/useRole';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
  const [role, roleLoading] = useRole();
  const { user } = useAuth();

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`;

  if (roleLoading) {
    return <p className="text-center py-20">Loading dashboard...</p>;
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-white border-r shadow-sm p-4 flex flex-col">
        <Link to="/" className="text-xl font-bold text-blue-600 mb-6">
          CrowdFund
        </Link>

        <div className="mb-6 text-sm text-gray-500">
          <p className="font-semibold text-gray-800">{user?.displayName}</p>
          <p className="capitalize">{role}</p>
        </div>

        <nav className="flex flex-col gap-1">
          {role === 'supporter' && (
            <>
              <NavLink to="/dashboard/supporter-home" className={linkClass}>Home</NavLink>
              <NavLink to="/explore-campaigns" className={linkClass}>Explore Campaigns</NavLink>
              <NavLink to="/dashboard/my-contributions" className={linkClass}>My Contributions</NavLink>
              <NavLink to="/dashboard/purchase-credit" className={linkClass}>Purchase Credit</NavLink>
              <NavLink to="/dashboard/payment-history" className={linkClass}>Payment History</NavLink>
            </>
          )}

          {role === 'creator' && (
            <>
              <NavLink to="/dashboard/creator-home" className={linkClass}>Home</NavLink>
              <NavLink to="/dashboard/add-campaign" className={linkClass}>Add New Campaign</NavLink>
              <NavLink to="/dashboard/my-campaigns" className={linkClass}>My Campaigns</NavLink>
              <NavLink to="/dashboard/withdrawals" className={linkClass}>Withdrawals</NavLink>
              <NavLink to="/dashboard/payment-history" className={linkClass}>Payment History</NavLink>
            </>
          )}

          {role === 'admin' && (
            <>
              <NavLink to="/dashboard/admin-home" className={linkClass}>Home</NavLink>
              <NavLink to="/dashboard/manage-users" className={linkClass}>Manage Users</NavLink>
              <NavLink to="/dashboard/manage-campaigns" className={linkClass}>Manage Campaigns</NavLink>
              <NavLink to="/dashboard/withdrawal-requests" className={linkClass}>Withdrawal Requests</NavLink>
              <NavLink to="/dashboard/reports" className={linkClass}>Reports</NavLink>
            </>
          )}
        </nav>
      </aside>

      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;