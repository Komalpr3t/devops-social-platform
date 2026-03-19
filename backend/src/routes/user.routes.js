import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import User from "../models/User.js";
import { getProfile } from "../controllers/profile.controller.js";
import { toggleFollow } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/me", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
});

router.get("/:username", getProfile);

router.post("/:id/follow", authMiddleware, toggleFollow);

export default router;
