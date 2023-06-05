const express = require("express");
const app = express();
const port = 8000;
const homeRouter = require("./routes/home");

// Define routes and middleware here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/home", homeRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
