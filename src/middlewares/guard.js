import jwt from "jsonwebtoken";
import { JWT_Secrete } from "../utils/constants";
import User from "../models/user";
export async function authGuard(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw { message: "token not found" };
    }
    const decodedToken = jwt.verify(token, JWT_Secrete);
    const user = await getUserByEmail(decodedToken.email);
    req.user = user;
    next();
  } catch (error) {
    return res.status(200).json({
      data: null,
      success: false,
      msg: error?.message || "Please try again",
      err: error,
    });
  }
}
