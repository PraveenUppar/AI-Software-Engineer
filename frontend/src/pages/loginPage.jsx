import { useState, useContext } from "react";
import axios from "../config/axios.js";
import { useNavigate } from "react-router-dom";
import userContext from "../context/user.context.jsx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/user/login", { email, password })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        setUser(res.data.user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.res.data);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Login to your account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label
              className="block text-sm text-gray-600 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 text-center">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
