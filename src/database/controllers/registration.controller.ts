import dbConnect from "@/database/connection";
import RegistrationFormModel from "@/database/models/Registration.model";

export const getRegistrationForm = async () => {
  dbConnect()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

  const registrationForm = (await RegistrationFormModel.findOne({})) || {};
  console.log({ registrationForm });

  return registrationForm;
};

export const updateRegistrationForm = async (fields) => {
  dbConnect()
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));

  const registrationForm = await RegistrationFormModel.findOneAndUpdate(
    {},
    { fields },
    { new: true, upsert: true }
  );

  console.log({ registrationForm });

  return registrationForm;
};

export const updateTasks = async ({ tasks }) => {
  try {
    await dbConnect();
    console.log("Connected to MongoDB");

    const registrationForm = await RegistrationFormModel.findOne({});

    registrationForm.tasks = tasks;

    const updatedRegistrationForm = await registrationForm.save();

    return updatedRegistrationForm;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
