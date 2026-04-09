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
      if (data.message) {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="glass p-10 rounded-3xl w-full max-w-sm relative overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black tracking-tight mb-1 bg-gradient-to-r from-blue-400 to-pink-500 bg-clip-text text-transparent">Join Nexus</h1>
            <p className="text-slate-400 text-sm">Become part of the lattice</p>
          </div>

          {error && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 px-4 py-3 rounded-xl mb-6 text-sm font-medium animate-pulse">
              {error}
            </div>
          )}

          <div className="space-y-4 mb-8">
             <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Username</label>
              <input
                placeholder="ZeroCool"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Email</label>
              <input
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1 mb-1 block">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-slate-900/50 border border-white/10 rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={register}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-3 rounded-xl text-white font-semibold shadow-lg shadow-indigo-500/30 transition-all active:scale-[0.98]"
          >
            Create Identity
          </button>

          <p className="mt-8 text-center text-sm text-slate-400">
            Already verified?{" "}
            <Link to="/" className="text-pink-400 hover:text-pink-300 font-medium transition-colors">
              Access Terminal
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
