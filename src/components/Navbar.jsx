import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="text-xl font-bold text-blue-600">
          CrowdFund
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/explore" className="hover:text-blue-600">
            Explore Campaigns
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <img
                src={user.photoURL}
                alt="profile"
                className="w-9 h-9 rounded-full object-cover"
                title={user.displayName}
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1.5 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
          <a
          
            href="https://github.com/Turjopro/crowdfunding-client"
            target="_blank"
            rel="noreferrer"
            className="border px-3 py-1.5 rounded hover:bg-gray-50"
          >
            Join as Developer
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;