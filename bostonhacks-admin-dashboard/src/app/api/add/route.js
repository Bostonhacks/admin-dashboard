
import prisma from '../../../../lib/prisma';
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const newApplicant = await prisma.applicant.create({
      data
    });
    return new NextResponse(JSON.stringify(newApplicant), {
      headers: {
        'Content-Type': 'application/json'
        //ensures that JSON data to ensure proper handling by the client
      }
    });
  } catch (error) {
    console.error('Error adding new applicant')
  }
}