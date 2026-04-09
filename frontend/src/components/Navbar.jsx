import { useNavigate } from "react-router-dom";

function Navbar({ user }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 glass border-b-0 border-white/10 px-6 py-4 flex justify-between items-center rounded-b-2xl mb-8">
      <h1
        className="text-2xl font-black tracking-tight cursor-pointer bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent transform transition hover:scale-105"
        onClick={() => navigate("/home")}
      >
        Nexus
      </h1>

      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate("/home")}
          className="px-5 py-2 rounded-full font-medium text-sm transition-all bg-white/5 hover:bg-white/10 text-slate-200"
        >
          Feed
        </button>

        <button
          onClick={() => navigate(`/profile/${user.username}`)}
          className="px-5 py-2 rounded-full font-medium text-sm transition-all bg-white/5 hover:bg-white/10 text-slate-200"
        >
          Profile
        </button>

        <button
          onClick={logout}
          className="px-5 py-2 rounded-full font-medium text-sm transition-all bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 ml-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;