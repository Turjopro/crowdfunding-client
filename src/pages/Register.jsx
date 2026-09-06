import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const role = form.role.value;
    const imageFile = form.image.files[0];

    // Password validation
    if (password.length < 6) {
      return setError("Password must be at least 6 characters");
    }
    if (!/[A-Z]/.test(password)) {
      return setError("Password must have at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      return setError("Password must have at least one lowercase letter");
    }

    try {
      setUploading(true);

      // Upload image to imgBB
      const imageFormData = new FormData();
      imageFormData.append("image", imageFile);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        imageFormData
      );
      const photoURL = imgRes.data.data.display_url;

      // Create user in Firebase
      await createUser(email, password);
      await updateUserProfile(name, photoURL);

      // Save user in database
      const userInfo = {
        name,
        email,
        photo: photoURL,
        role,
      };

      await axios.post("http://localhost:5000/users", userInfo);

      // Get JWT token
      const jwtRes = await axios.post("http://localhost:5000/jwt", { email });
      localStorage.setItem("access-token", jwtRes.data.token);

      setUploading(false);
      navigate("/");
    } catch (err) {
      setUploading(false);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Profile Picture</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Register as</label>
          <select
            name="role"
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="supporter">Supporter</option>
            <option value="creator">Creator</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {uploading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;