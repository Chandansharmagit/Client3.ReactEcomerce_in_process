const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Define the cart item schema


// Define the user schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String},
  password: { type: String, required: true, select: false },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipcode: { type: String },
  image: { type: String },
  tokens: [{ token: { type: String, required: true } }]
});
// Hash the password before saving the user model
// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to generate auth token
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id.toString() }, "thenaemischadnanshamacaslsldthenme");
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (error) {
    console.error('Error generating auth token:', error);
    throw error; // Throw the error to be handled by the calling code
  }
};












const User = mongoose.model("User", userSchema);

module.exports = User;
