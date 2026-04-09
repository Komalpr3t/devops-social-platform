import { useState, useEffect } from "react";
import { getPosts, createPost, toggleLike, toggleFollow, getMe } from "../api/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [caption, setCaption] = useState("");
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadPosts();
    loadUser();
  }, []);

  const loadPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  const loadUser = async () => {
    try {
      const me = await getMe(token);
      setUser(me);
    } catch {
      // Failed to load user, likely invalid token
      navigate('/');
    }
  };

  const addPost = async () => {
    if (!caption.trim()) return;
    await createPost(token, caption);
    setCaption("");
    loadPosts();
  };

  const likePost = async (id) => {
    await toggleLike(token, id);
    loadPosts();
  };

  const followUser = async (id) => {
    await toggleFollow(token, id);
    loadPosts();
  };

  return (
    <div className="min-h-screen pb-20">
      <div className="max-w-xl mx-auto">
        {user && <Navbar user={user} />}

        {/* New Post Container */}
        <div className="glass p-5 rounded-2xl mb-8 flex gap-3 shadow-lg shadow-black/20 transform transition hover:shadow-indigo-500/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 flex items-center justify-center font-bold shadow-inner">
            {user?.username?.[0]?.toUpperCase() || "?"}
          </div>
          <div className="flex-1 flex gap-2">
            <input
              className="flex-1 bg-transparent px-2 py-2 text-slate-100 placeholder-slate-500 focus:outline-none"
              placeholder="Broadcast a message to the lattice..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addPost()}
            />
            <button
              onClick={addPost}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-xl font-medium transition-all active:scale-95 shadow-md shadow-indigo-500/20 disabled:opacity-50"
              disabled={!caption.trim()}
            >
              Post
            </button>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post._id} className="glass p-6 rounded-2xl flex flex-col gap-4 transform transition-all duration-300 hover:translate-y-[-2px] hover:shadow-indigo-500/10 hover:border-white/20">
              
              {/* Post Header */}
              <div className="flex justify-between items-center">
                <div 
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => navigate(`/profile/${post.user.username}`)}
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center font-bold text-sm shadow-inner group-hover:ring-2 ring-indigo-400 transition-all">
                    {post.user.username[0].toUpperCase()}
                  </div>
                  <span className="font-semibold text-slate-200 group-hover:text-indigo-300 transition-colors">
                    @{post.user.username}
                  </span>
                </div>

                {user && post.user._id !== user._id && (
                  <button
                    onClick={() => followUser(post.user._id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all active:scale-95 ${
                      post.user.followers?.includes(user._id)
                        ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                        : "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/30"
                    }`}
                  >
                    {post.user.followers?.includes(user._id) ? "Following" : "Follow"}
                  </button>
                )}
              </div>

              {/* Post Content */}
              <p className="text-slate-100 text-lg leading-relaxed ml-1">{post.caption}</p>

              {/* Post Actions */}
              <div className="flex items-center gap-4 mt-2 border-t border-white/5 pt-4">
                <button
                  onClick={() => likePost(post._id)}
                  className="group flex items-center gap-2 text-sm text-slate-400 hover:text-pink-400 transition-colors"
                >
                  <div className={`p-2 rounded-full transition-all group-active:scale-75 ${post.likes?.includes(user?._id) ? 'bg-pink-500/20 text-pink-500' : 'bg-slate-800 group-hover:bg-pink-500/10'}`}>
                    ❤️
                  </div>
                  <span className="font-semibold">{post.likes?.length || 0}</span>
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
             <div className="text-center py-20 text-slate-500 font-medium">
               The lattice is quiet... Be the first to broadcast.
             </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Home;