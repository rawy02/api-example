import express from "express";
import taskRouter from "./constrollers/task-controller";

const app = express();
app.use(express.json());

app.use("/tasks", taskRouter);

app.listen(3000, () => {
  console.log("Running on port 3000");
});