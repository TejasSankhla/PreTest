import Mentor from "../models/mentor.js";
import CrudRepository from "./crud-repository.js";
import { convertToLowerCase, trimBlankSpace } from "../utils/helper.js";
class MentorRepository extends CrudRepository {
  constructor() {
    super(Mentor);
  }
  async signUp(user) {
    try {
      user.username = convertToLowerCase(user.username);
      user.name = trimBlankSpace(user.name);
      user.college = convertToLowerCase(user.college);
      user.branch = trimBlankSpace(user.branch);
      const newMentor = await Mentor.create(user);
      return newMentor;
    } catch (error) {
      if (error.code == 11000) {
        throw { ...error, message: "username/email already exists" };
      }
      console.log("something went wrong in the Mentor repository : ", error);
      throw error;
    }
  }
  async getMentorByEmail(userEmail) {
    try {
      const mentor = await Mentor.findOne({ email: userEmail });
      return mentor;
    } catch (error) {
      console.log("something went wrong in the Mentor repository : ", error);
      throw error;
    }
  }
  async getAllMentorsFromCollege(college) {
    try {
      const mentor = await Mentor.findall({ college: college });
      return mentor;
    } catch (error) {
      console.log("something went wrong in the Mentor repository : ", error);
      throw error;
    }
  }
}
export default MentorRepository;
