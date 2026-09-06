import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Login = () => {
  const { loginUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await loginUser(email, password);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError("Invalid email or password");
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    try {
      const result = await googleSignIn();
      const user = result.user;

      // Save/check user in database (in case first-time Google login)
      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "supporter", // default role for Google sign-in
      };

      try {
        await axios.post("http://localhost:5000/users", userInfo);
      } catch (err) {
        // if user already exists, backend returns 400 - that's fine, ignore
      }

      navigate("/");
    } catch (err) {
      setError("Google sign-in failed. Try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-4">
          <div className="flex-1 border-t"></div>
          <span className="px-3 text-gray-400 text-sm">OR</span>
          <div className="flex-1 border-t"></div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full border py-2 rounded flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;