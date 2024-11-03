const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAysnc.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review= require("../models/review.js");
const {validateReview,isLoggedIn, isReviewAuthor}= require("../middleware.js");

const reviewController= require("../controllers/reviews.js");
const review = require("../models/review.js");

//REVIWS
//post review route
router.post("/",isLoggedIn,validateReview, wrapAsync( reviewController.createReview));
  
  //delete review route
  router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.deleteReview));
  



module.exports= router;