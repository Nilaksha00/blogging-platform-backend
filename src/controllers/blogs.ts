import { RequestHandler } from "express";
import BlogModel from "../models/blog";

// Get all blogs controller
export const getBlogs: RequestHandler = async (req, res, next) => {
  try {
    const blogs = await BlogModel.find({}).exec();
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

// Get single blog controller
export const getBlog: RequestHandler = async (req, res, next) => {
  const blogId = req.params.blogId;
  try {
    const blog = await BlogModel.findById(blogId).exec();
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

// Create blog controller
export const createBlog: RequestHandler = async (req, res, next) => {
  const { title, author, content } = req.body;

  try {
    const newBlog = await BlogModel.create({
      title: title,
      author: author,
      content: content,
    });
    res.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
};

// Update blog controller
export const updateBlog: RequestHandler = async (req, res, next) => {
  const blogId = req.params.blogId;
  const { title, author, content } = req.body;

  try {
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      blogId,
      { title, author, content },
      { new: true }
    ).exec();

    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

// Delete blog controller
export const deleteBlog: RequestHandler = async (req, res, next) => {
  const blogId = req.params.blogId;

  try {
    const deletedBlog = await BlogModel.findByIdAndDelete(blogId).exec();

    if (!deletedBlog) {
      res.status(404).json({ error: "Blog not found" });
      return;
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    next(error);
  }
};
