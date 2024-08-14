import User from "../models/user.js";
import CrudRepository from "./crud-repository.js";

class UserRepository extends CrudRepository {
  constructor() {
    super(User);
  }
  async getUserByEmail(userEmail) {
    try {
      const user = await User.findOne({ email: userEmail });
      return user;
    } catch (error) {
      console.log("something went wrong in the repository layer");
      throw error;
    }
  }
}
export default UserRepository;
