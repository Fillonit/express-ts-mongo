import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import router from "./router";

dotenv.config();

const { PORT, MONGO_URL, NODE_ENV } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

app.use(
  cors({
    credentials: true,
  })
);

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/");
});

mongoose.Promise = global.Promise;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/", router());

app.get("/", (req: express.Request, res: express.Response) => {
  res.status(200).json({
    "vue-api": {
      _desc: "This is the api for my full-stack vue project.",
      _repo: "https://github.com/Fillonit/vue-api",
      _author: "Fillonit",
      _version: "1.0.0",
      _license: "MIT",
    },
  });
});
