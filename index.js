const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const {connectDB} = require("./database/database")

const app = express();

const PORT = 3000;

require("dotenv").config({ path: "./config/.env" });

connectDB();

app.use(cookieParser());


// Root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// add routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);


app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is running on port " + PORT);
});
