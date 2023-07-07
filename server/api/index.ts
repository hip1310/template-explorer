import express from "express";
import homeRouter from "./routes/home";
import pkg from "body-parser";
import errorHandler from "./exception/ErrorHandler";
const { json } = pkg;
const app = express();
const port = 8000;

app.use(json());
app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
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
