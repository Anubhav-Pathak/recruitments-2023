import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  registrationForm: {
    type: [Object],
    ref: "RegistrationForm",
    required: true,
  },
  task: [
    {
      type: Object,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Application ||
  mongoose.model("Application", applicationSchema);
