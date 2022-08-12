const express = require("express");
const router = express.Router();
const Controller = require("../controllers/product.controller");
let validationMW = require("../middlewares/validation.MW");
const product = require("../middlewares/product.MW");
// const {imageUpload} = require("../controllers/company.controller.js")
const {
  AdminAndFreelancerAuth,
  adminAuth,
  AdminAndClientAndCompanyAuth
} = require("../middlewares/authAccess.MW");
const authMW = require("../middlewares/auth.MW");

router
  .route("/product")
  //get
  .get(validationMW, Controller.getAllProduct);

//create
router
  .route("/product/upload")
  .post(
    authMW,
    AdminAndFreelancerAuth,
    Controller.productUpload.array("product", 2),
    product.postValidator,
    validationMW,
    Controller.createProduct
  );

//get by id
router
  .route("/product/:id")
  .get(product.paramValidator, validationMW, Controller.getProductById)

  //put by id
  .put(
    authMW,
    AdminAndFreelancerAuth,
    Controller.productUpload.array("product", 2),
    product.paramValidator,
    product.putValidator,
    validationMW,
    Controller.updateProduct
  )
  .delete(authMW, adminAuth, product.paramValidator, Controller.deleteProduct);

router
  .route("/product/:id/buyer")
  .put(
    authMW,
    AdminAndClientAndCompanyAuth,
    product.paramValidator,
    product.putValidator,
    validationMW,
    Controller.updateBuyerId
  );

//delete

module.exports = router;
