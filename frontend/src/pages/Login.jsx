import { useState } from "react";
import { loginUser } from "../api/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    try {
      setError("");
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="glass p-10 rounded-3xl w-full max-w-sm relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-tight mb-1 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">Nexus</h1>
            <p className="text-slate-400 text-sm">Welcome back to the grid</p>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-3 rounded-xl mb-6 text-sm font-medium animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-8">
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Email</label>
              <input
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={login}
            className="w-full bg-indigo-600 hover:bg-indigo-500 py-3 rounded-xl text-white font-semibold shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98]"
          >
            Enter Node
          </button>

          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an access code?{" "}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
              Initialize Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;