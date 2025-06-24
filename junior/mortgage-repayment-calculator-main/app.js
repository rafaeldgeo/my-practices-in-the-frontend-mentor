const express = require("express");
const app = express();
const path = require("path");
const siteRoutes = require("./routes/siteRoutes");

// configuration of the express

app.use(express.urlencoded({ extended: true })); // read datas of the form
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", siteRoutes); // connect the routes of the site

module.exports = app;
