import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfile, getMe } from "../api/api";
import Navbar from "../components/Navbar";

function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadProfile();
    loadCurrentUser();
  }, [username]);

  const loadProfile = async () => {
    const data = await getProfile(username);
    setProfile(data);
  };

  const loadCurrentUser = async () => {
    if (token) {
        try {
            const me = await getMe(token);
            setCurrentUser(me);
        } catch(err) {
            console.log(err);
        }
    }
  };

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-medium uppercase tracking-widest text-sm">Accessing Node...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-xl mx-auto">
        {currentUser && <Navbar user={currentUser} />}

        {/* Profile Header Header */}
        <div className="glass p-8 rounded-3xl mb-8 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-indigo-900/50 to-purple-900/50"></div>
          
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-pink-500 flex items-center justify-center text-4xl font-black shadow-xl shadow-indigo-500/20 z-10 border-4 border-slate-900 mb-4">
            {profile.username[0].toUpperCase()}
          </div>
          
          <h1 className="text-3xl font-black tracking-tight mb-6 z-10">
            @{profile.username}
          </h1>

          <div className="flex gap-12 z-10 bg-slate-900/50 px-8 py-4 rounded-2xl border border-white/5">
            <div className="flex flex-col">
              <span className="text-3xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">{profile.followers}</span>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1">Followers</span>
            </div>
            <div className="w-px bg-white/10"></div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">{profile.following}</span>
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mt-1">Following</span>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500 mb-4 px-2">Broadcast History</h2>
        
        <div className="grid gap-4">
          {profile.posts.map((post) => (
            <div
              key={post._id}
              className="glass p-5 rounded-2xl hover:bg-white/5 transition-colors border-l-4 border-l-indigo-500/50"
            >
              <p className="text-slate-200 text-lg">{post.caption}</p>
            </div>
          ))}
          {profile.posts.length === 0 && (
             <div className="glass p-8 rounded-2xl text-center text-slate-500 font-medium border-dashed border-white/10 border-2 bg-transparent">
               This node has no broadcast history.
             </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profile;