const express = require("express");
const {authorizeRetailer,authorizeUser}=require("../middleware/authorize");
const {getCurrentUser, getAllProductsController, addToCartController, addOrderController, searchByNameController, searchByCategoryController, getOrderHistoryController}=require("../controllers/userController");
const router=express.Router();

//to get the current user which has been loggedin
router.get("/getuser",authorizeUser,getCurrentUser);

// all product routes along with the filters 
router.get("/getallproduct",authorizeUser,getAllProductsController);
router.get("/searchbyname",authorizeUser,searchByNameController);
router.get("/searchbycategory",authorizeUser,searchByCategoryController);
router.get("/searchbyprice",authorizeUser,);

//add to the cart
router.post("/addtocart",authorizeUser,addToCartController);

//add an Order Place after procedd and addresss
router.post("/placeorder",authorizeUser,addOrderController);
router.get("/myorder",authorizeUser,getOrderHistoryController);

module.exports=router;