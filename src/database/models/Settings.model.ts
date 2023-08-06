const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  recruitmentStatus: {
    type: Boolean,
    default: false,
  },
  maxApplicants: {
    status: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 100,
    },
  },
  validGmailDomains: {
    type: [String],
    default: ["srmist.edu.in"],
  },
  domains: {
    type: [String],
    default: ["creative", "technical", "corporate"],
  },
});

const Settings =
  mongoose.models.Settings || mongoose.model("Settings", settingsSchema);

export default Settings;
