const Attempt = require("../models/Attempt");
const Course = require("../models/Course");
const Unit = require("../models/Unit");
const Question = require("../models/Question");

exports.getAllAttempts = async (req, res) => {
  const attempts = await Attempt.find()
    .populate("userId", "name email")
    .populate("courseId", "title")
    .populate("unitId", "title")
    .sort({ createdAt: -1 });

  res.json(attempts);
};

exports.getAttemptsByCourse = async (req, res) => {
  const attempts = await Attempt.find({
    courseId: req.params.courseId
  })
    .populate("userId", "name email")
    .populate("unitId", "title");

  res.json(attempts);
};

exports.getAttemptsByUnit = async (req, res) => {
  const attempts = await Attempt.find({
    unitId: req.params.unitId
  })
    .populate("userId", "name email");

  res.json(attempts);
};
exports.createCourse = async (req, res) => {
  const { title, description } = req.body;

  const course = await Course.create({ title, description });
  res.json(course);
};

exports.createUnit = async (req, res) => {
  const { title, courseId } = req.body;

  const unit = await Unit.create({
    title,
    course: courseId
  });

  res.json(unit);
};

exports.createQuestion = async (req, res) => {
  const { unitId, questionText, options, correctAnswerIndex } = req.body;

  const question = await Question.create({
    unit: unitId,
    questionText,
    options,
    correctAnswerIndex
  });

  res.json(question);
};