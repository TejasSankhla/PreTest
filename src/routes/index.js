import Express from "express";
const router = Express.Router();
import authroutes from "./auth/auth-routes.js";
router.use("/auth", authroutes);
export default router;
