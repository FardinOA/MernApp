const express = require("express");
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
app.use(cors());
//all routes
const productRoute = require("./src/routes/productRoute");
const userRoute = require("./src/routes/userRoute");
const orderRoute = require("./src/routes/orderRoute");

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", orderRoute);

//middleware for error
app.use(errorMiddleware);
module.exports = app;
