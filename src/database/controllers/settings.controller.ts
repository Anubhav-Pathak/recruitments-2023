import dbConnect from "@/database/connection";
import Settings from "@/database/models/Settings.model";

export const getSettings = async () => {
  dbConnect()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

  let settings = await Settings.findOne({});

  if (!settings) {
    console.log("creating settings");
    await Settings.create({
      recruitmentStatus: false,
      maxApplicants: { status: false, value: 100 },
      validGmailDomains: ["srmist.edu.in"],
    });
    settings = await Settings.findOne({});
  }

  return settings;
};

export const updateSettings = async ({
  recruitmentStatus = true,
  maxApplicants = { status: true, value: 100 },
  validGmailDomains = ["srmist.edu.in"],
}) => {
  console.log({ recruitmentStatus, maxApplicants, validGmailDomains });
  dbConnect()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

  const updatedSettings = await Settings.findOneAndUpdate(
    {},
    { recruitmentStatus, maxApplicants, validGmailDomains },
    { new: true, upsert: true }
  );
  console.log({ updatedSettings });
  return updatedSettings;
};
