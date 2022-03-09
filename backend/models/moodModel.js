const mongoose = require('mongoose')

const moodSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please explaing your MoOd'],
    },
    mood: {
      type: String,
      required: [true, 'which mood are you today?'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Mood', moodSchema)
