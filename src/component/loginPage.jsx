import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    // hard-coded credentials
    if (username === "admin" && password === "admin123") {
      setError("");
      setSuccess(true);
      alert("Login successful ✅");

      navigate("/Users");
    } else {
      setSuccess(false);
      setError("Invalid username or password ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md border p-8">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-xl bg-[#c8a25a] flex items-center justify-center text-white text-2xl font-bold">
            A
          </div>
        </div>

        {/* Title */}
        <h2 className="text-center text-xl font-bold">Admin Panel</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Sign in to your account
        </p>

        <form onSubmit={handleLogin}>
          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                👤
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a25a]"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔒
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c8a25a]"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[#c8a25a] hover:bg-[#b08f4a] text-white py-2 rounded-lg font-semibold transition"
          >
            Sign In
          </button>
        </form>

        {/* Demo Box */}
        <div className="mt-5 bg-gray-100 text-center py-2 rounded-lg text-sm">
          Demo: <span className="font-semibold">admin</span> /{" "}
          <span className="font-semibold">admin123</span>
        </div>

        {success && (
          <p className="text-green-600 text-center text-sm mt-3">
            Welcome Admin 🎉
          </p>
        )}
      </div>
    </div>
  );
}
