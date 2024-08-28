import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const Mentor_Frontend_URL = process.env.Mentor_Frontend_URL;
const Client_Frontend_URL = process.env.Client_Frontend_URL;
const Mongo_URL = process.env.Mongo_URL;
export { PORT, Client_Frontend_URL, Mentor_Frontend_URL, Mongo_URL };
