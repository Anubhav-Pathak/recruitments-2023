import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import {
  getRegistrationForm,
  updateTasks,
} from "@/database/controllers/registration.controller";

export const GET = async (req: Request, res: NextApiResponse) => {
  const registrationForm = await getRegistrationForm();
  return NextResponse.json({ registrationForm });
};

export const POST = async (req: Request, res: NextApiResponse) => {
  const { tasks } = await req.json();
  console.log({ post: tasks });
  const updatedSettings = await updateTasks({ tasks });
  console.log({ updatedSettings });

  return NextResponse.json({ message: "Form updated", success: true });
};
