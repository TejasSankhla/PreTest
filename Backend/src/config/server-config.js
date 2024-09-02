import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;
const Mentor_Frontend_URL = process.env.Mentor_Frontend_URL;
const Client_Frontend_URL = process.env.Client_Frontend_URL;
const Mongo_URL = process.env.Mongo_URL;
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const redirectUri = process.env.redirectUri;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const Resend_API_KEY = process.env.Resend_API_KEY;
export {
  PORT,
  Client_Frontend_URL,
  Mentor_Frontend_URL,
  Mongo_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  REFRESH_TOKEN,
  Resend_API_KEY
};
