const express = require("express");
const router = express.Router();
const User= require("../models/user");
const passport= require("passport");
const wrapAsync= require("../utils/wrapAysnc.js");
const {saveRedirectUrl}= require("../middleware.js");

const userController= require("../controllers/users.js");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup", wrapAsync(userController.signup));

router.get("/login",userController.renderLoginForm);

router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true,}),userController.login);

router.get("/logout",userController.logout);

module.exports= router;