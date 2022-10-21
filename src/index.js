const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const multer = require ('multer');
require("./db/connection");
const registerController = require("./controller/userConroller");
// const middleware = require("./middleware/auth");
const main = require ("./controller/main")
const  dotenv = require ('dotenv');
const port = process.env.PORT || 3000;
// ============================URL=========================

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "/templates/views");
const partial_path = path.join(__dirname, "/templates/partials");

// ============================URL=========================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

dotenv.config();

app.use( multer().any())

// ============================URL=========================
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

// ============================URL=========================
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/main", (req, res) => {
  res.render("main");
});
// =========================================================
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", registerController.createUser);
// =========================================================
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", registerController.loginUser);
// =========================================================

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});
// ===============================> api for AWS    <=======================

app.post('/upload',main.uploadimage);

// ===========================================================
app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});
