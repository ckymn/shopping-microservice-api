const express = require("express");
const router = express.Router();
const { validate, auth, idChecker } = require("./middleware");
const CustomerValidation = require("./validations/customer.validation");
const CustomerController = require("./controllers/customer.controller");

router.get("/customer/profile", auth, CustomerController.profileController);
router.post(
  "/customer/signup",
  validate(CustomerValidation.createValidation),
  CustomerController.createController
);
router.post(
  "/customer/login",
  validate(CustomerValidation.loginValidation),
  CustomerController.loginController
);
router.patch(
  "/customer/updateProfile",
  auth,
  validate(CustomerValidation.updateValidation),
  CustomerController.updateController
);
router.post(
  "/customer/address",
  auth,
  validate(CustomerValidation.addressValidation),
  CustomerController.addressController
);
router.patch(
  "/customer/reset-password",
  validate(CustomerValidation.resetPasswordValidation),
  CustomerController.resetPasswordContoller
);
router.delete(
  "/customer/delete/:id",
  idChecker(),
  auth,
  CustomerController.deleteController
);
router.post(
  "/customer/update-profile-image",
  auth,
  CustomerController.updateProfileImage
);

module.exports = router;
