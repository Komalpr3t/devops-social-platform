import User from "../models/User.js";
import Post from "../models/Post.js";

export const getProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ user: user._id })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.json({
      username: user.username,
      followers: user.followers.length,
      following: user.following.length,
      posts
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Profile fetch failed" });
  }
};