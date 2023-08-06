import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getApplications } from "@/database/controllers/application.controller";

export const GET = async (
  req: Request,
) => {
    
  const applications = await getApplications();
  return NextResponse.json({ applications });
};
