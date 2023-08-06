import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { submitRegistrationForm } from "@/database/controllers/application.controller";

export const POST = async (req: Request, res: NextApiResponse) => {
  const { registrationForm, registrationNumber } = await req.json();
  const updatedSettings = await submitRegistrationForm({
    registrationForm,
    registrationNumber,
  });

  return NextResponse.json({ message: "Application created", success: true });
};
