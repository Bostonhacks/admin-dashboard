import prisma from '../../../../lib/prisma';
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  const test = await prisma.applicant.findMany()
  return NextResponse.json(test);
}