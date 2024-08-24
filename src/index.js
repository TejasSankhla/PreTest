import express from "express";
import connect_Database from "./config/database.js";
import PORT from "./config/server-config.js";
import apiroutes from "./routes/index.js";
import bodyParser from "body-parser";
import cors from "cors";
const setUpAndStartServer = async () => {
  const app = express();
  const corsOptions = {
    origin: ["http://localhost:3000", "http://localhost:3001"], // Allow only frontend requests from this origin
    methods: "GET,POST,PUT,DELETE", // Specify allowed methods
    credentials: true, // If you need to include cookies or authentication headers
  };

  // Use the cors middleware
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
