import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import {
  getSettings,
  updateSettings,
} from "@/database/controllers/settings.controller";

export const GET = async (req: Request, res: NextApiResponse) => {
  const settings = await getSettings();
  return NextResponse.json({
    settings,
  });
};

export const POST = async (req: Request, res: NextApiResponse) => {
  const { recruitmentStatus, maxApplicants, validGmailDomains } =
    await req.json();
  const updatedSettings = await updateSettings({
    recruitmentStatus,
    maxApplicants,
    validGmailDomains,
  });

  return NextResponse.json({ message: "Settings updated", success: true });
};
