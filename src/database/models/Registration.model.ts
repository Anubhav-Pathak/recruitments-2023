import mongoose from "mongoose";

const registrationFormSchema = new mongoose.Schema({
  fields: {
    type: [Object],
  },
  tasks: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.RegistrationForm ||
  mongoose.model("RegistrationForm", registrationFormSchema);
