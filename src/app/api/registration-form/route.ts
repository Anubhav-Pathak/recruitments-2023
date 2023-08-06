import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import {
  getRegistrationForm,
  updateRegistrationForm,
} from "@/database/controllers/registration.controller";

export const GET = async (req: Request, res: NextApiResponse) => {
  const registrationForm = await getRegistrationForm();
  return NextResponse.json({ registrationForm });
};

export const POST = async (req: Request, res: NextApiResponse) => {
  const { fields } = await req.json();
  console.log({ fields });
  const updatedSettings = await updateRegistrationForm(fields);

  return NextResponse.json({ message: "Form updated", success: true });
};