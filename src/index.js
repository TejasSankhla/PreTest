import express from "express";
import connect from "./config/database.js";
import PORT from "./config/server-config.js";
import apiroutes from "./routes/index.js";
import bodyParser from "body-parser";
const setUpAndStartServer = async () => {
  const app = express();
  await connect().catch((err) => console.log(err));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use("/api", apiroutes);
  app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });
};
setUpAndStartServer();
