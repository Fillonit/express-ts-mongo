import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  authentication: {
    password: { type: String, required: true, selected: false },
    salt: { type: String, selected: false },
    sessionToken: { type: String, selected: false },
  },
});
