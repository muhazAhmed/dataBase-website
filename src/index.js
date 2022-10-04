const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/connection");
const registerController = require ("./controller/userConroller")
const middleware = require("./middleware/auth")
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "/templates/views");
const partial_path = path.join(__dirname, "/templates/partials");

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partial_path);

// ============================URL=========================
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", registerController.createUser)

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", registerController.loginUser)

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/feedback", (req, res) => {
  res.render("feedback");
});


// ===========================================================
app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});
