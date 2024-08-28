import express from "express";
import connect_Database from "./config/database.js";
import {
  PORT,
  Client_Frontend_URL,
  Mentor_Frontend_URL,
} from "./config/server-config.js";
import apiroutes from "./routes/index.js";
import bodyParser from "body-parser";
import cors from "cors";
const setUpAndStartServer = async () => {
  const app = express();
  const corsOptions = {
    origin: [Client_Frontend_URL, Mentor_Frontend_URL],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  };

  app.use(cors(corsOptions));
  await connect_Database();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/api", apiroutes);
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
};
setUpAndStartServer();
