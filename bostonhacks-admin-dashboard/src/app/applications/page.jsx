'use client';
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

export default function ApplicationPage() {
    const [applicants, setApplicants] = useState([]);

    useEffect(() => {
        fetch(`/api/applicant`)
        .then(res => res.json())
        .then(data => setApplicants(data));
    }, []);

    // Define the columns for DataGrid
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5 },
        {
            field: 'firstName',
            headerName: 'First name',
            flex: 1, // use flex 1,2,3,4... for the width of the column
            //valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            flex: 1, // use flex 1,2,3,4... for the width of the column
        },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'schoolLabel', headerName: 'School', flex: 1 },
        { field: 'github', headerName: 'GitHub', flex: 1 },
        {
            field: 'actions',
            headerName: 'Actions',
            sortable: false,
            flex: 2,
            renderCell: (params) => (
                <>
                <button className="mr-5 bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded">
                    Accept
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded">
                    Reject
                </button>
                </>
            ),
        },
    ];

    // Convert applicants to rows for the DataGrid
    const rows = applicants.map((applicant) => ({
        id: applicant.id,
        firstName: applicant.firstName,
        lastName: applicant.lastName,
        email: applicant.email,
        schoolLabel: applicant.schoolLabel,
        github: applicant.github,
    }));

    // Try adding a double/single click event listener to the DataGrid (part of API) that takes you to the specific page of the applicant (use the id field and call /api/applicant/[id] to get the specific applicant data)
    // by possibly rerouting to /applicants/[id] or /applicants/[id]/view
    return (
        <main className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mt-10">Applications</h1>
            <div className="w-full h-full p-24">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 25 } },
                    }}
                    disableSelectionOnClick
                    className="bg-white shadow-md rounded-lg"
                />
            </div>
        </main>
    );
}
