const express = require("express");
const router = express.Router();

//Importing jobs controller methods
const {
  getJobs,
  getJob,
  newJob,
  getJobsInRadius,
  updateJob,
  deleteJob,
  jobStats,
} = require("../controllers/jobsController");

const { isAuthenticatedUser } = require("../middlewares/auth");

router.route("/jobs").get(getJobs);
router.route("/job/:id/:slug").get(getJob);
router.route("/jobs/:zipcode/:distance").get(getJobsInRadius);
router.route("/stats/:topic").get(jobStats);

router.route("/job/new").post(isAuthenticatedUser, newJob);

router
  .route("/job/:id")
  .put(isAuthenticatedUser, updateJob)
  .delete(isAuthenticatedUser, deleteJob);
module.exports = router;
