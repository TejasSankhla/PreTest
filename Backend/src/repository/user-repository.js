import User from "../models/user.js";
import CrudRepository from "./crud-repository.js";
import { convertToLowerCase } from "../utils/helper.js";
class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async signUp(user) {
    try {
      const newUser = await User.create(user);
      return newUser;
    } catch (error) {
      if (error.code == 11000) {
        throw { ...error, message: "Email already exists" };
      }
      console.log("something went wrong in the User repository : ", error);
      throw error;
    }
  }
  async getUserByEmail(userEmail) {
    try {
      const user = await User.findOne({ email: userEmail });
      if (!user) {
        throw { code: 404, message: "User doesn't exist, Please Sign-up" };
      }
      return user;
    } catch (error) {
      console.log("something went wrong in the User repository : ", error);
      throw error;
    }
  }
}
export default UserRepository;
