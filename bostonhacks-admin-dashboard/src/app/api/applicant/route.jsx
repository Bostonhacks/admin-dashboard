
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";


export const GET = async (request, { params }) => {
    try {
        const applicants = await prisma.applicant.findMany();
        return NextResponse.json(applicants);
    } catch(err) {
        // console.error(err);
        return NextResponse.json({ error: "Failed to retrieve all applicants" }, { status: 500 });
    }

}

// includes no error handling / validation. Field validation should be handled by Prisma though
/**
 * Creates a new applicant
 * @param {*} request JSON request body, should include "body" tag with new applicant fields. Can add more fields to request body if needed
 * @returns {JSON} new applicant
 * @async
 */
export const POST = async (request, { params }) => {
    try {
        if (!request.body) {
            return NextResponse.json({ error: "No request body tag found" }, { status: 400 });
        }
        const { body } = await request.json();
        const applicant = await prisma.applicant.create({
            data: body
        });
        return NextResponse.json(applicant);
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to create new applicant. Try checking request body fields" }, { status: 500 });
    }

}

// will instead be handled by the POST request to /api/applicant/[id]
// export const PUT = async (req, res) => {
//     const { body } = req;
//     const { id } = req.query;
//     const applicant = await prisma.applicant.update({
//         where: { id: id },
//         data: body
//     });
//     return NextResponse.json(applicant);
// }