import { useState, useEffect } from "react";
import {
  getPosts,
  createPost,
  toggleLike,
  toggleFollow,
  getMe
} from "../api/api";

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

    const me = await getMe(token);
    setUser(me);
  };

  const addPost = async () => {

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

    <div>

      {user && <Navbar user={user} />}

      <div className="max-w-xl mx-auto mt-6">

        <div className="flex gap-2 mb-6">

          <input
            className="flex-1 bg-gray-900 border border-gray-700 px-4 py-2 rounded"
            placeholder="Write caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />

          <button
            onClick={addPost}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Post
          </button>

        </div>

        {posts.map((post) => (

          <div
            key={post._id}
            className="bg-gray-900 border border-gray-800 rounded p-4 mb-4"
          >

            <div className="flex justify-between">

              <span
                className="font-semibold cursor-pointer hover:text-blue-400"
                onClick={() => navigate(`/profile/${post.user.username}`)}
              >
                @{post.user.username}
              </span>

              {user && post.user._id !== user._id && (

                <button
                  onClick={() => followUser(post.user._id)}
                  className={`px-3 py-1 rounded text-sm ${
                    post.user.followers?.includes(user._id)
                      ? "bg-gray-700"
                      : "bg-green-600"
                  }`}
                >
                  {post.user.followers?.includes(user._id)
                    ? "Following"
                    : "Follow"}
                </button>

              )}

            </div>

            <p className="mt-2">{post.caption}</p>

            <button
              onClick={() => likePost(post._id)}
              className="mt-3 bg-pink-600 px-3 py-1 rounded"
            >
              ❤️ {post.likes?.length || 0}
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Home;