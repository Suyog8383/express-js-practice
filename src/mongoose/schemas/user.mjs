import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  name: {
    type: mongoose.Schema.Types.String,
  },
  city: {
    type: mongoose.Schema.Types.String,
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
});

export const User = mongoose.model("User", userSchema);
