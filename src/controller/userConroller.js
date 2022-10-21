const express = require("express");
const app = express();
const path = require("path");
// const JWT = require("jsonwebtoken");

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "/templates/views");
const registerModel = require("../models/registerModel");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

// ===================================register=====================

const createUser = async function (req, res) {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    // ------------------first name validation---------------
    if (!firstname) {
      return res
        .status(400)
        .send({ status: false, message: "required first name" });
    }

    if (!/^[a-zA-Z ]{3,}$/.test(firstname))
      return res
        .status(400)
        .send({ status: false, message: "Only alphabets in name!!" });
    //------------------last name validation---------------
    if (!lastname) {
      return res
        .status(400)
        .send({ status: false, message: "required last name" });
    }

    if (!/^[a-zA-Z ]{1,}$/.test(lastname))
      return res
        .status(400)
        .send({ status: false, message: "Only alphabets in name!!" });

    // -----------------for email validation------------------
    if (!email) {
      return res.status(400).send({ status: false, message: "required email" });
    }

    const findEmail = await registerModel.find({ email: email });

    if (findEmail.length > 0) {
      return res
        .status(400)
        .send({ status: false, message: "email is aldready taken" });
    }

    // ================for password ========
    const validPassword = (password) => {
      return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&])[a-zA-Z0-9@#$%&]{8,15}$/.test(
        password
      );
    };

    if (!validPassword(password)) {
      return res.status(400).send({
        status: false,
        message:
          "Password must have one uppercase letter, one lowercase letter, one special charecter and one number and must consist of 8 to 15 charectors.",
      });
    }
    if (!(password === confirmpassword)) {
      return res.status(400).send({
        status: false,
        msg: "password is not matching",
      });
    }
    let newData = { firstname, lastname, email, password, confirmpassword };
    await registerModel.create(newData);

    return res.status(201).render("main");
  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: "500", error: err.message });
  }
};

// =====================================login==================================

const loginUser = async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;
    
    const User = await registerModel.findOne({ email });
    console.log(User);
    if(User == null)
    return res.send("email or password is wrong");

    if (password === User.password) {
      return res.status(201).render("main");
    } else {
      return res.send("email or password is wrong");
    }
  } catch (err) {
    return res.status(401).send({ status: false, message: err.message });
  }
};

module.exports = { createUser, loginUser };
