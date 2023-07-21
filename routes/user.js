const express = require("express");
const router = express.Router();

const {
  getUserProfile,
  updatePassword,
  updateUser,
  deleteUser,
  getAppliedJobs,
  getPublishedJobs,
  getUsers,
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/me").get(isAuthenticatedUser, getUserProfile);
router
  .route("/jobs/applied")
  .get(isAuthenticatedUser, authorizeRoles("user"), getAppliedJobs);

router
  .route("/jobs/published")
  .get(
    isAuthenticatedUser,
    authorizeRoles("employer", "admin"),
    getPublishedJobs
  );

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateUser);

router.route("/me/delete").delete(isAuthenticatedUser, deleteUser);

//Admin only routes
router
  .route("/users")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUsers);
module.exports = router;
