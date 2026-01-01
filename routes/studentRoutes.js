const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
  getCourses,
  getUnits,
  startQuiz,
  submitQuiz
} = require("../controllers/studentController");

// student routes
router.get("/courses", auth, getCourses);
router.get("/units/:courseId", auth, getUnits);
router.post("/quiz/start", auth, startQuiz);
router.post("/quiz/submit", auth, submitQuiz);

module.exports = router;
