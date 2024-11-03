const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAysnc.js");
const Listing = require("../models/listing.js");
const { listingSchema } = require("../schema.js");
const {isLoggedIn,isOwner ,validateListing}= require("../middleware.js");

const listingController= require("../controllers/listings.js");
const multer = require("multer");

const {storage}=require("../cloudConfig.js");

const upload =multer({storage});



//New Route
router.get("/new", isLoggedIn,listingController.renderNewForm);
  
  //Index Route
  router.get("/", wrapAsync(listingController.index));
  
  
  //Show Route
  router.get("/:id", wrapAsync(listingController.showListing));
  
  //Create Route
  router.post("/",isLoggedIn,upload.single("listing[image]"), wrapAsync(listingController.createListing));
  
  
  //Edit Route
  router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

  //Update Route
  router.put("/:id", isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing));
  
  //Delete Route
  router.delete("/:id", isLoggedIn,isOwner,wrapAsync(listingController.deleteListing));
 module.exports= router;

  