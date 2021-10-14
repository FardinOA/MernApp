const express = require("express");
const errorMiddleware = require("./middleware/error");
const app = express();
app.use(express.json());

//all routes
const productRoute = require("./src/routes/productRoute");
const userRoute = require("./src/routes/userRoute");

app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);

//middleware for error
app.use(errorMiddleware);
module.exports = app;
