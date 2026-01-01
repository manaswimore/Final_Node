const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const {
  getAllAttempts,
  getAttemptsByCourse,
  getAttemptsByUnit,
  createCourse,
  createUnit,
  createQuestion
} = require("../controllers/adminController");
// 👇 ALL HANDLERS MUST BE FUNCTIONS
router.get("/attempts", auth, admin, getAllAttempts);
router.get("/attempts/course/:courseId", auth, admin, getAttemptsByCourse);
router.get("/attempts/unit/:unitId", auth, admin, getAttemptsByUnit);
router.post("/course", auth, admin, createCourse);
router.post("/unit", auth, admin, createUnit);
router.post("/question", auth, admin, createQuestion);

module.exports = router;
