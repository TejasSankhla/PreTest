import User from "../models/user.js";
import CrudRepository from "./crud-repository.js";
import { convertToLowerCase } from "../utils/helper.js";
class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async signUp(user) {
    try {
      user.college = convertToLowerCase(user.college);
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
      return user;
    } catch (error) {
      console.log("something went wrong in the User repository : ", error);
      throw error;
    }
  }
}
export default UserRepository;
