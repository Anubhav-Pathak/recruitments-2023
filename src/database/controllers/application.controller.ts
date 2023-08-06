import dbConnect from "@/database/connection";
import Application from "@/database/models/Application.model";

export const submitTask = async ({ task = [], registrationNumber }) => {
  dbConnect()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
  console.log({ task, registrationNumber });
  const updatedApplication = await Application.findOneAndUpdate(
    { registrationNumber },
    { task }
  );
  console.log({ updatedApplication });
  return updatedApplication;
};

export const submitRegistrationForm = async ({
  registrationForm = [],
  registrationNumber,
}) => {
  console.log({ registrationForm, registrationNumber });
  dbConnect()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
  const application = new Application({ registrationNumber, registrationForm });
  const savedApplication = await application.save();
  return savedApplication;
};

export const getApplication = async ({ registrationNumber }) => {
  dbConnect()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
  console.log({ registrationNumber });
  const application = Application.find({ registrationNumber });
  return application;
};

export const getApplications = async () => {
  dbConnect()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
  const applications = Application.find({});
  return applications;
};
