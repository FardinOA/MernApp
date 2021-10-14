const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Handling uncaught Error exceptions
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Error exceptions`);

    process.exit(1);
});

const res = dotenv.config({ path: "backend/.env" });

//connect database
const url = process.env.MONGO_URL;

mongoose
    .connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((data) => {
        console.log(`Mongo db connected with server ${data.connection.host}`);
    });

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejection`);
    server.close(() => {
        process.exit(1);
    });
});
