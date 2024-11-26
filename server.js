const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();

app.use(express.static(path.join(__dirname, "public")));

// body middelware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// cors middleware
app.use(
  cors({
    origin: ["http://localhost:5000", "http://localhost:3000"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("welcome to local machine");
});

// router of ideas
const rounterIdeas = require("./routes/ideas");
app.use("/api/ideas", rounterIdeas);

app.listen(port, () => {
  console.log("port is turn", port);
});
