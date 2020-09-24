const express = require("express");
const router = express.Router();

const routeGuard = require("../configs/route-guard.config");
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  console.log("hey :)");
  res.render("auth-views/signup");
});

// authRouter.post("/", (req, res) => {
//   const { firstName, lastName, username, email, password } = req.body;

//   if (
//     firstName === "" ||
//     lastName === "" ||
//     username === "" ||
//     password === "" ||
//     email === ""
//   ) {
//     res.render("auth-views/signup");
//   }
// });

module.exports = router;
