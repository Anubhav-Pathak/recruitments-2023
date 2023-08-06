import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { submitTask } from "@/database/controllers/application.controller";

export const POST = async (req: Request, res: NextApiResponse) => {
  const { tasks, registrationNumber } = await req.json();
  const updatedSettings = await submitTask({
    task: tasks,
    registrationNumber,
  });

  return NextResponse.json({ message: "Tasks updated", success: true });
};
