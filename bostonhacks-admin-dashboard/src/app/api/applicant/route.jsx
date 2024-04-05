
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
export const GET = async (req, res) => {
    const applicants = await prisma.applicant.findMany();
    return NextResponse.json(applicants);
}