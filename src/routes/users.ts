import express from "express";
import * as UsersController from "../controllers/users";

const router = express.Router();

router.post("/signup", UsersController.signUp);
router.post("/signin", UsersController.signIn);

export default router;