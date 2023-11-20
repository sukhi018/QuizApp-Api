const mongoose = require('mongoose')

const scoreboardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  tag: {
    type: String,
    required: true,
  },
})

const Scoreboard = mongoose.model('Scoreboard', scoreboardSchema);
