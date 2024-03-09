const express = require("express");
const {authorizeRetailer,authorizeUser}=require("../middleware/authorize");
const {getCurrentUser}=require("../controllers/userController");
const router=express.Router();

//to get the current user which has been loggedin
router.get("/getuser",authorizeUser,getCurrentUser);

module.exports=router;