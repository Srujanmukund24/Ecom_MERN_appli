const express = require("express");
const {authorizeRetailer,authorizeUser}=require("../middleware/authorize");
const { getCurrentRetailer, addProductController, updateProductController, deleteProductController }=require("../controllers/retailerController");
const router=express.Router();

//to get the current user which has been loggedin
router.get("/getretailer",authorizeRetailer,getCurrentRetailer);

//to add the product, update  product and  delete the product 
router.post("/addproduct",authorizeRetailer,addProductController);
router.put("/updateproduct/:productId",authorizeRetailer,updateProductController);
router.delete("/deleteproduct/:productId",authorizeRetailer,deleteProductController);

//other order dispatchroutes anre remaining. some after the frontend willl be taken in charge..
module.exports=router;