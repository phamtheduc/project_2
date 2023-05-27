import { Router } from "express";
import { verifyAuthToken } from "../middleware/verifyToken";
import orderController from "../handlers/order.handler";

const router = Router();

router.get("/active/:userid", verifyAuthToken, orderController.activeOrders);
router.get("/completed/:userid", verifyAuthToken, orderController.completedOrders);

export default router;
