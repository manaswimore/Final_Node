const Course = require("../models/Course");
const Unit = require("../models/Unit");
const Question = require("../models/Question");
const Attempt = require("../models/Attempt");
const mongoose = require("mongoose");

exports.getUnits = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const units = await Unit.find({
      course: new mongoose.Types.ObjectId(courseId)
    }).sort({ createdAt: 1 });

    res.json(units);
  } catch (err) {
    console.error("GET UNITS ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/* =========================
   GET COURSES
========================= */
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
/* =========================
   START QUIZ
========================= */
exports.startQuiz = async (req, res) => {
  try {
    const { unitId } = req.body;

    console.log("UNIT ID RECEIVED:", unitId);

    const questions = await Question.find({
      unit: new mongoose.Types.ObjectId(unitId)
    })
      .sort({ createdAt: 1 })
      .limit(10);

    console.log("QUESTIONS FOUND:", questions.length);

    res.json(
      questions.map(q => ({
        _id: q._id,
        questionText: q.questionText,
        options: q.options
      }))
    );
  } catch (err) {
    console.error("START QUIZ ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
exports.submitQuiz = async (req, res) => {
  try {
    const { unitId, answers } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    if (!unitId) {
      return res.status(400).json({ msg: "Unit ID missing" });
    }

    if (!answers || typeof answers !== "object") {
      return res.status(400).json({ msg: "Invalid answers format" });
    }

    const questions = await Question.find({ unit: unitId });

    if (!questions.length) {
      return res.status(400).json({ msg: "No questions for this unit" });
    }

    let score = 0;

    questions.forEach(q => {
      const userAnswer = answers[q._id.toString()];
      if (userAnswer === q.correctAnswerIndex) {
        score++;
      }
    });

    await Attempt.create({
      userId: req.user.id,
      unitId,
      courseId: questions[0].course,
      score,
      total: questions.length
    });

    res.json({
      score,
      total: questions.length
    });
  } catch (err) {
    console.error("QUIZ SUBMIT ERROR:", err);
    res.status(500).json({ msg: "Quiz submit failed" });
  }
};