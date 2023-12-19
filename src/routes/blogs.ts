import express from "express";
import * as BlogsController from "../controllers/blogs";
import authMiddleware from "../middlewares/auth";

const router = express.Router();

router.get("/", authMiddleware, BlogsController.getBlogs);
router.get("/:blogId", authMiddleware, BlogsController.getBlog);
router.post("/", authMiddleware, BlogsController.createBlog);
router.put("/:blogId", authMiddleware, BlogsController.updateBlog);
router.delete("/:blogId", authMiddleware, BlogsController.deleteBlog);

export default router;
