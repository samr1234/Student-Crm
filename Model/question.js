// models/question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  sNo: { type: Number, required: true },
  subject: { type: String, required: true },
  topic: { type: String },
  tags: { type: String },
  questionType: { type: String, required: true },
  questionText: { type: String, required: true },
  option1: { type: String },
  option2: { type: String },
  option3: { type: String },
  option4: { type: String },
  option5: { type: String },
  option6: { type: String },
  option7: { type: String },
  option8: { type: String },
  option9: { type: String },
  option10: { type: String },
  rightAnswer: { type: String, required: true },
  explanation: { type: String },
  correctMarks: { type: Number, required: true },
  negativeMarks: { type: Number, required: true },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
