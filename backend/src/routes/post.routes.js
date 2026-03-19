import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  createPost,
  getPosts,
  toggleLike,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", authMiddleware, createPost);
router.get("/", getPosts);
router.post("/:id/like", authMiddleware, toggleLike);

export default router;