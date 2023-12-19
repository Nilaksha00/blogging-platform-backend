import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Middleware to verify token 
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);
      req.body.user = decodedToken;
    } else {
      throw new Error("Missing Token");
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
