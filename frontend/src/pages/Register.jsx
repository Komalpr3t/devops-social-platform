import { useState } from "react";
import { registerUser } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    try {
      setError("");
      const data = await registerUser(username, email, password);
      // Backend registration controller currently doesn't issue a token, it just returns a message
      if (data.message) {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-900 p-8 rounded-lg w-80">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <input
          placeholder="Username"
          className="w-full mb-3 px-4 py-2 bg-gray-800 rounded text-gray-200"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 bg-gray-800 rounded text-gray-200"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 bg-gray-800 rounded text-gray-200"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={register}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500 text-white font-medium"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/" className="text-blue-400 hover:text-blue-300">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
