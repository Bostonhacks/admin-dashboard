

import { NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";

/**
 * Retrieves an applicant by id
 * @param {*} params Url parameter "id"
 * @returns {JSON} applicant
 * @async
 */
export const GET = async (request, { params }) => {
    try {
        const id = Number(params.id);
        const applicant = await prisma.applicant.findUnique({ where: { id: id } });
        return NextResponse.json(applicant);
    } catch(err) {
        // console.error(err);
        return NextResponse.json({ error: `Failed to retrieve applicant ${params.id}` }, { status: 500 });
    }
  
}

// includes no error handling / validation. Field validation should be handled by Prisma though

/**
 * Updates an applicant by id
 * @param {*} request JSON request body, should include "body" tag with updated fields. Can add more fields to request body if needed
 * @param {*} params Url parameter "id"
 * @returns {JSON} updated applicant
 * @async
 * @example
 * // request body
 * {
	"body": {
		"city": "Test City",
		"diet": "Test diet"
	}
}
*/
export const POST = async (request, { params }) => {
    // sample code to use queries
    // const searchParams = request.nextUrl.searchParams
    // const query = searchParams.get('query')
    // query is "hello" for /api/search?query=hello

    try {
        // get current data
        const applicant = await prisma.applicant.findUnique({ where: { id: Number(params.id) } });

        const { body } = await request.json();
        // console.log(body);

        // return NextResponse.json({ ...applicant, ...body });
        const updatedApplicant = await prisma.applicant.update({
            where: { id: Number(params.id) },
            data: { ...applicant, ...body } // merge the new data with the old data
        })

        return NextResponse.json(updatedApplicant);
    } catch(err) {
        console.error(err);
        return NextResponse.json({ error: `Failed to update applicant ${params.id}. Try checking request body fields` }, { status: 500 });
    }

    
}

export const DELETE = async (request, { params }) => {
    try {
        const id = Number(params.id);
        const deletedApplicant = await prisma.applicant.delete({ where: { id: id } });
        return NextResponse.json(deletedApplicant);
    } catch(err) {
        // console.error(err);
        return NextResponse.json({ error: `Failed to delete applicant ${params.id}` }, { status: 500 });
    }
}
