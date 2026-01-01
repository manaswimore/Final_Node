const mongoose = require("mongoose");

const unitSchema = new mongoose.Schema({
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  unitNumber: { type: Number, min: 1, max: 6 },
  title: String
});

module.exports = mongoose.model("Unit", unitSchema);
