const express = require("express");
const {authorizeRetailer,authorizeUser}=require("../middleware/authorize");
const { getCurrentRetailer, addProductController }=require("../controllers/retailerController");
const router=express.Router();

//to get the current user which has been loggedin
router.get("/getretailer",authorizeRetailer,getCurrentRetailer);

//to add the product for the saleby that company
router.post("/addproduct",authorizeRetailer,addProductController);

module.exports=router;