import { Router } from "express";
import productController from "./../handlers/product.handler";
import { verifyAuthToken } from "../middleware/verifyToken";
const router = Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getOneProduct);
router.post("/", verifyAuthToken, productController.addProduct);
router.get("/filter/top5", productController.getTop5Product);
router.get("/category/:category", productController.filterProductByCategory);

export default router;
