import express from "express";
import * as BlogsController from "../controllers/blogsController";

const router = express.Router();

router.get("/", BlogsController.getBlogs);
router.get("/:blogId", BlogsController.getBlog);
router.post("/", BlogsController.createBlog);
router.put("/:blogId", BlogsController.updateBlog); 
router.delete("/:blogId", BlogsController.deleteBlog);

export default router;