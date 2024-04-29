'use client';
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

export default function Applicant ({ params }) {

    const router = useRouter();
    const id = params.id
    const [applicant, setApplicant] = useState([])

    useEffect(() => {
        fetch(`/api/applicant/${id}`)
        .then(res => res.json())
        .then(data => setApplicant(data))

    })


    return (
        <>
            <Button 
                onClick={() => router.push(`/applications`)} // Navigate back to the previous page
                className="mb-4"
            >
                Go Back
            </Button>
            <TableContainer component={Paper} className="max-w-xl mx-auto shadow-md">
                <Table aria-label="simple table" size="small">
                    <TableHead className="bg-gray-100">
                        <TableRow>
                            <TableCell className="border px-4 py-2 text-sm font-extrabold text-gray-600">Field</TableCell>
                            <TableCell className="border px-4 py-2 text-sm font-extrabold text-gray-600 text-right">Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(applicant).map(([key, value]) => (
                            <TableRow key={key}>
                                <TableCell className="border px-4 py-2 text-sm text-gray-700" component="th" scope="row">
                                    {key}
                                </TableCell>
                                <TableCell className="border px-4 py-2 text-sm text-gray-700 text-right">
                                    {value.toString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}