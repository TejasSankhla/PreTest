import Express from "express";
const router = Express.Router();
import * as OrderController from "../../controllers/order-controller.js";

router.post("/create-order", OrderController.createOrder);

export default router;
