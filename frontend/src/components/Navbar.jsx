import { useNavigate } from "react-router-dom";

function Navbar({ user }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center border-b border-gray-800 px-6 py-4">

      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/home")}
      >
        InstaClone
      </h1>

      <div className="flex gap-4">

        <button
          onClick={() => navigate("/home")}
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
        >
          Home
        </button>

        <button
          onClick={() => navigate(`/profile/${user.username}`)}
          className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700"
        >
          Profile
        </button>

        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-500"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;