import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getProfile } from "../api/api";
import Navbar from "../components/Navbar";

function Profile() {

  const { username } = useParams();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {

    const data = await getProfile(username);

    setProfile(data);
  };

  if (!profile) return <p className="p-6">Loading...</p>;

  return (

    <div className="max-w-xl mx-auto mt-6">

      <h1 className="text-2xl font-bold mb-4">
        @{profile.username}
      </h1>

      <div className="flex gap-6 mb-6">

        <p>Followers: {profile.followers}</p>
        <p>Following: {profile.following}</p>

      </div>

      {profile.posts.map((post) => (

        <div
          key={post._id}
          className="bg-gray-900 border border-gray-800 rounded p-4 mb-3"
        >

          <p>{post.caption}</p>

        </div>

      ))}

    </div>

  );
}

export default Profile;