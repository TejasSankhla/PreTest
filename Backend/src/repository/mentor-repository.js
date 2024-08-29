import Mentor from "../models/mentor.js";
import CrudRepository from "./crud-repository.js";
import Booking from "../models/booking.js";
import {
  convertToLowerCase,
  formatString,
  camelCase,
  trimBlankSpace,
} from "../utils/helper.js";
import moment from "moment";

class MentorRepository extends CrudRepository {
  constructor() {
    super(Mentor);
  }
  async signUp(user) {
    try {
      user.username = convertToLowerCase(user.username);
      user.name = trimBlankSpace(user.name);
      user.college = trimBlankSpace(user.college);
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
      if (!mentor) {
        throw { message: "mentor doesn't exist, Please Sign-Up" };
      }
      return mentor;
    } catch (error) {
      console.log("something went wrong in the Mentor repository :  ", error);
      throw error;
    }
  }
  async getAllMentorsFromCollege(college) {
    try {
      const mentor = await Mentor.find({ college });
      return mentor;
    } catch (error) {
      console.log("something went wrong in the Mentor repository : ", error);
      throw error;
    }
  }
  async getAllMentors() {
    try {
      const mentor = await Mentor.find();
      return mentor;
    } catch (error) {
      console.log("something went wrong in the Mentor repository : ", error);
      throw error;
    }
  }
  // update available slots by a mentor
  async updateMentorAvailability(mentorId, updatedSlots) {
    try {
      const updatedMentor = await Mentor.findByIdAndUpdate(
        mentorId,
        {
          selectedSlots: updatedSlots,
        },
        { new: true }
      );
      return updatedMentor;
    } catch (error) {
      console.log("something went wrong in the Mentor repository : ", error);
      throw error;
    }
  }
  async getAllFutureBookings(mentorId, currDate) {
    try {
      const AllFutureBookings = await Booking.find({
        mentor: mentorId,
        slot: { $gt: currDate },
      });
      // sending only slots ( Date objects)
      const AllFutureSlots = AllFutureBookings.map((booking) => {
        return moment(booking.slot).toDate();
      });

      return AllFutureSlots;
    } catch (error) {
      console.log("something went wrong in the Mentor repository : ", error);
      throw error;
    }
  }
  // fetch mentor profile along with available slots of next 7 days
  async fetchMentorProfile(mentorId) {
    try {
      var mentor = await Mentor.findById(mentorId).lean();
      // first check if mentor has available slots
      let availableDays = 0; // no of days mentor is awailable in a week
      const selectedSlots = Object.values(mentor.selectedSlots); // array of array of Dates
      for (var slot of selectedSlots) {
        if (slot.length > 0) availableDays++;
      }
      // no slots available in week
      if (availableDays == 0) {
        mentor.isAvailable = false;
        mentor.availableSlots = null;
        return mentor;
      }
      // Start iterating from currDay to find next 7 availableDays
      let currDate = moment(); // present date
      let currWeekDay = currDate.weekday(); // curr Week Day index
      // get all future bookings to remove booked slots from  All availableSlots
      const bookedSlots = await this.getAllFutureBookings(mentorId, currDate);

      var availableslots = []; // all next 7 available dates with slots
      availableDays = 0;
      // offsetDays-> no of days ahead from current Date
      // until we find 7 availableSlots dates we keep on iterating
      for (var offsetDays = 0; availableDays < 7; offsetDays++) {
        const weekday = (currWeekDay + offsetDays) % 7;

        if (selectedSlots[weekday].length > 0) {
          // get Date on this day which is offsetDays ahead from currDate
          const date = moment(currDate).add(offsetDays, "days");
          // AllSlotsOnDay are mentor available slots including booked ones
          const AllslotsOnDay = selectedSlots[weekday];
          // now we need to find slots which are not booked
          const availableSlotsOnDay = [];
          AllslotsOnDay.forEach((slot) => {
            // for the date match time with all slots to check is there is a booking
            const slotOnDate = moment(date)
              .set({
                hour: slot.getHours(),
                minute: slot.getMinutes(),
                second: slot.getSeconds(),
                millisecond: 0,
              })
              .toDate();

            if (
              !bookedSlots.some(
                (date) => date.getTime() === slotOnDate.getTime()
              )
            ) {
              availableSlotsOnDay.push(slotOnDate);
            }
          });
          if (availableSlotsOnDay.length > 0) {
            availableslots.push({
              date: date.format("YYYY-MM-DD"),
              slots: availableSlotsOnDay,
            });
            // this day is available so we will increase  availableDays
            availableDays++;
          }
        }
      }
      mentor.isAvailable = true;
      mentor.slots = availableslots;
      return mentor;
    } catch (error) {
      console.log("something went wrong in the Mentor repository : ", error);
      throw error;
    }
  }
  async updateMentor(mentorId, updateData) {
    try {
      const updatedMentor = await Mentor.findByIdAndUpdate(
        mentorId,
        { $set: updateData },
        { new: true, runValidators: true }
      );
      return updatedMentor;
    } catch (error) {
      console.log("something went wrong in the Mentor repository : ", error);
      throw error;
    }
  }
}
export default MentorRepository;
