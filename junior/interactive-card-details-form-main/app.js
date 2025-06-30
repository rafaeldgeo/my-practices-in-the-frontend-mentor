const express = require("express");
const app = express();
const path = require("path");
const siteRoutes = require("./routes/siteRoutes");

app.use(express.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use("/", siteRoutes);

module.exports = app;

