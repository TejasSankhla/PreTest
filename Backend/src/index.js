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
import { startCronJob } from "./utils/cron-job.js";
const setUpAndStartServer = async () => {
  const app = express();
  const corsOptions = {
    origin: [Client_Frontend_URL, Mentor_Frontend_URL],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  };
  startCronJob("https://pretest-nvyk.onrender.com");
  app.use(cors(corsOptions));
  await connect_Database();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.get("/dummy", (req, res) => {
    return res.status(200).json({
      message: "response from backend service",
    });
  });

  app.use("/api", apiroutes);
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
};
setUpAndStartServer();
