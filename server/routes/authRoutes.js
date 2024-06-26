const express = require("express");
const router=express.Router();
const {userRegisterController, userLoginController, retailerRegisterController, retailerLoginController, logoutController}=require("../controllers/authController");

// Register for User || post request;
router.post("/userregister",userRegisterController)
// Login for User || post request;
router.post("/userlogin",userLoginController)

//Register for retailer;
router.post("/retailerregister",retailerRegisterController);
//Login for retailer;
router.post("/retailerlogin",retailerLoginController); 


//logout
router.post("/logout",logoutController)

module.exports=router;