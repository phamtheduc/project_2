import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(" ")[1] || "";
    jwt.verify(token, process.env.JWT_SECRET || "");
    next();
  } catch (error) {
    res.status(401).json("Authenticate failed")
    throw new Error ((error as { message: string }).message);
  }
};

export { verifyAuthToken };
