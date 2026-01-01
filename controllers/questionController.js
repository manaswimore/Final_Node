const mongoose = require("mongoose");
const Question = require("../models/Question");

exports.createQuestion = async (req, res) => {
  try {
    const {
      questionText,
      options,
      correctAnswerIndex,
      unitId,
      courseId
    } = req.body;

    if (!unitId || !courseId) {
      return res.status(400).json({ msg: "Unit or Course missing" });
    }

    const question = await Question.create({
      questionText,
      options,
      correctAnswerIndex,
      unit: new mongoose.Types.ObjectId(unitId),   // ✅ IMPORTANT
      course: new mongoose.Types.ObjectId(courseId)
    });

    res.status(201).json(question);
  } catch (err) {
    console.error("CREATE QUESTION ERROR:", err);
    res.status(500).json({ msg: "Failed to create question" });
  }
};
