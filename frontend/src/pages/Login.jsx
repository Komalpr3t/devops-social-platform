import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {

    const data = await loginUser(email, password);

    localStorage.setItem("token", data.token);

    navigate("/home");
  };

  return (

    <div className="flex items-center justify-center h-screen">

      <div className="bg-gray-900 p-8 rounded-lg w-80">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 bg-gray-800 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 bg-gray-800 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 py-2 rounded hover:bg-blue-500"
        >
          Login
        </button>

      </div>

    </div>

  );
}

export default Login;