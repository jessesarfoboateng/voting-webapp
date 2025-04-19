const mongoose = require('mongoose');
const crypto = require('crypto');  // For generating secure codes

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  votingCode: { type: String, unique: true },  // Secure code for voting
  codeUsed: { type: Boolean, default: false }  // Whether the code has been used
});

// Generate a random code for each new user
userSchema.pre('save', function(next) {
  if (this.isNew) {
    this.votingCode = crypto.randomBytes(4).toString('hex');  // 8 character code
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
