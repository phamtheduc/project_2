// import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./router/index";

dotenv.config();
const app = express();
app.use(cors());
import AppDataSource from "./data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Data source have been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = Number(process.env.PORT) || 3001;

app.use("/api/v1", router);

app.listen(port, () => {
  console.log("App is running at port " + port);
});

export default app;
