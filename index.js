const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./database/database");
const http = require("http");
const cors = require("cors");
const setupSocket = require("./socket");

const app = express();
const server = http.createServer(app);
app.use(cors());
const io = setupSocket(server);

const PORT = 5000;


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
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const supportAccountRoutes = require("./routes/supportAccountRoutes");
const messageRoutes = require("./routes/messageRoutes");
app.use(
  "/api",
  userRoutes,
  productRoutes,
  vendorRoute,
  orderRoutes,
  reviewRoutes,
  supportAccountRoutes,
  messageRoutes
);

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server is running on port " + PORT);
});
