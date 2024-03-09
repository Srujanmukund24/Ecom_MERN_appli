const express = require("express");
const {authorizeRetailer,authorizeUser}=require("../middleware/authorize");
const { getCurrentRetailer }=require("../controllers/retailerController");
const router=express.Router();

//to get the current user which has been loggedin
router.get("/getretailer",authorizeRetailer,getCurrentRetailer);

module.exports=router;