import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { getApplication } from "@/database/controllers/application.controller";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  console.log({ req });
  const { id } = params;
  const application = await getApplication({ registrationNumber: id });
  console.log({ application });
  return NextResponse.json({ application });
};
