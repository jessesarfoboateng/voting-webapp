const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g., "Form 1A"
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Class', classSchema);
