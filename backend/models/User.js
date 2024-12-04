const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const DreamSchema = new mongoose.Schema({
  content: { 
    type: String, 
    required: [true, 'Dream content is required'] 
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
});

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function(value) {
        return validator.isEmail(value);
      },
      message: 'Please provide a valid email address'
    }
  },
  password: { 
    type: String, 
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  dreams: [DreamSchema], // Array to store dreams
}, { timestamps: true });

// Hash the password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    return next();
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

// Optional: Add a method to generate a public profile
UserSchema.methods.toPublicProfile = function() {
  return {
    id: this._id,
    email: this.email,
    createdAt: this.createdAt
  };
};

module.exports = mongoose.model('User', UserSchema);
