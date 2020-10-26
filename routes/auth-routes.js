const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt")

const bcryptSalt = 10;


const routeGuard = require("../configs/route-guard.config");
const User = require("../models/User.model");

router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup");
});

router.post("/signup", (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;
  
  //If form is empty remember to specify name in each input of form otherwise the form is going to be empty
  if (
    firstName === "" ||
    lastName === "" ||
    username === "" ||
    password === "" ||
    email === ""
    ) {
      res.render("auth-views/signup", {
        errorMessage: "Please fill up all the form."
      });
      return;
    }
    
    //If user already exist or username is already taken
    
    User.findOne({
      email,
    })
    .then(user => {
      if (user !== null) {
        res.render("auth-views/signup", {
          errorMessage: "The email already exists!"
        })
        return;
      }
      
      //Set up security
      
      
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    //We are going to create the new user

    User.create({ firstName, lastName, username, email, passwordHash: hashPass })
    .then(() => {
      res.redirect("/login")
    })
    .catch(error => console.log(error))    
  })
  .catch(error => next(error))
});

router.get("/login", (req, res, next) => {
  res.render("auth-views/login")
})

router.post("/login", (req, res, next) => {
  const userEmail = req.body.email;
  const userPasswd = req.body.password

  if (userEmail === "" || userPasswd === "") {
    res.render('auth-views/login', {
      errorMessage: "Please enter both, email and password"
    });
    return
  }

  User.findOne({
    email: userEmail
  })

  //If user is not on DB
  .then(userFromDB => {
    console.log("USERFROM DB", userFromDB)
    if (userFromDB === null) {
      res.render("auth-views/login", {
        errorMessage: "That username was not found in the system"
      })
      return
    }

    //If the user is in the DB we compare passwords
    if (bcrypt.compare(userPasswd, userFromDB.password)) {
      // console.log("REQ.SESSION", req.session)
      req.session.user = userFromDB
      res.redirect("/products")
    } else {
      res.render("auth-views/login", {
        errorMessage: "Incorrect Password"
      })
      return
    }
  })
  .catch(err => next(err))
})

module.exports = router;

