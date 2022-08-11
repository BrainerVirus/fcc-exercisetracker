import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import url from "url";

import {
  createUser,
  getUserByIdThroughBodyReq,
  getUsers,
} from "./controllers/userController.js";
import {
  createExercise,
  getExercises,
} from "./controllers/exerciseController.js";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
//basic route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//user routes
app.post("/api/users", createUser);
app.get("/api/users", getUsers);
//exercise routes
app.post(
  "/api/users/:_id/exercises",
  getUserByIdThroughBodyReq,
  createExercise
);
//logs
app.get("/api/users/:_id/logs", getUserByIdThroughBodyReq, getExercises);

const port = 8080;
const listener = app.listen(process.env.PORT || port, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
