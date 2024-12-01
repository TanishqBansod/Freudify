const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Hash the password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  console.log('COMPARE PASSWORD METHOD CALLED:', {
    candidatePassword,
    storedPasswordHash: this.password
  });
  
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    console.log('BCRYPT COMPARE RESULT:', isMatch);
    return isMatch;
  } catch (error) {
    console.error('PASSWORD COMPARISON ERROR:', error);
    return false;
  }
};

module.exports = mongoose.model('User', UserSchema);
