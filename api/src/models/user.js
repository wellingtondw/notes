const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    bcrypt.hash(this.password, 10, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        this.password = hashedPassword;
        next();
      }
    });
  }
});

module.exports = mongoose.model("User", userSchema);
