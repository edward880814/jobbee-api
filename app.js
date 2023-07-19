const express = require("express");
const app = express();

const dotenv = require("dotenv");

const connectDatabase = require("./config/database");
const errorMiddleware = require("./middlewares/errors");

//Setting up config.env file variable
dotenv.config({ path: "./config/config.env" });

//Connecting to database
connectDatabase();

// Setup body parser
app.use(express.json());

//Importing all routes
const jobs = require("./routes/jobs");

app.use("/api/v1", jobs);

//Middleware to handle errors
app.use(errorMiddleware);

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT} in ${process.env.NODE_ENV} mode.`
  );
});

//Handing Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to handled promise rejection.`);
  server.close(() => {
    process.exit(1);
  });
});
