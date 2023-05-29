const express = require("express");
// router adalah instance dari express.Router yang akan kita gunakan untuk membuat route
const router = express.Router();
// import controller
const userController = require("../controllers/userController");

const verifyJWT = require("../middleware/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// export router agar bisa digunakan di file lain
module.exports = router;
