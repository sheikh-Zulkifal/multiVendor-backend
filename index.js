const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./database/database");

const app = express();

const PORT = 3000;

require("dotenv").config({ path: "./config/.env" });

connectDB();

app.use(cookieParser());

// Root route
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// add routes
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const { vendorRoute } = require("./routes/vendorRoutes");
const orderRoutes =require("./routes/orderRoutes");
app.use("/api", userRoutes, productRoutes,vendorRoute, orderRoutes );


app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is running on port " + PORT)
});
