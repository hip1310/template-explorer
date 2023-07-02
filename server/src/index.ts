import express from "express";
import homeRouter from "./routes/home";
import pkg from "body-parser";
import errorHandler from "./exception/error-handler.js";
import cors from "cors";
const { json } = pkg;
const app = express();
const port = 8000;

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(json());
app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/api/home", homeRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
