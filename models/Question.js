const mongoose = require('mongoose')

const QuesSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
})

const Questions = mongoose.model('Questions', QuesSchema)
module.exports = Questions