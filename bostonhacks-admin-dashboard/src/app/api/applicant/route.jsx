
import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

// helper to convert URLSearchParams to object
const paramsToObject = (entries) => {
    const result = {}
    for(const [key, value] of entries) { // each 'entry' is a [key, value] tupple
      result[key] = value;
    }
    return result;
}

/**
 * Get all applicants or get applicants that match query parameters. Does not include error handling or validation. Querying by boolean types does not work.
 * @param {*} request Takes in query parametesrs from URL. If no query parameters, returns all applicants. If query parameters, returns all applicants that match query parameters
 * @param {*} params
 * @returns Array of all applicants given query parameters
 * @example
 *  /api/applicant?city=Boston&age=24
 *      returns all applicants that are from Boston and are 24 years old
 * 
 *  /api/applicant
 *      returns all applicants
 */
export const GET = async (request, { params }) => {
    try {
        // parse query parameters
        const searchParams = request.nextUrl.searchParams
        const query = paramsToObject(searchParams.entries());

        // returns all applicants
        if (!searchParams) {
            const applicants = await prisma.applicant.findMany();
            return NextResponse.json(applicants);
        }

        // filtering
        const applicants = await prisma.applicant.findMany({ where: query });
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