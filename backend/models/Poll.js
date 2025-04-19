const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  options: [{ type: String, required: true }],
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['open', 'closed'], default: 'open' }
});

module.exports = mongoose.model('Poll', pollSchema);
