import { Router } from "express";

import userController from "../handlers/user.handler";
import { verifyAuthToken } from "../middleware/verifyToken";

const router = Router();

router.post("/signup", userController.signupAccount);
router.post("/login", userController.loginAccount);
router.get("/auth", verifyAuthToken, userController.getUsers);
router.get("/auth/:id", verifyAuthToken, userController.getOneUsers);
router.post("/auth/add/user", verifyAuthToken, userController.addUser);

export default router;
