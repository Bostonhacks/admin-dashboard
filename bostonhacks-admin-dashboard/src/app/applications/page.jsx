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
{ field: 'id', headerName: 'ID', width: 90 },
{
field: 'fullName',
headerName: 'Applicant name',
width: 200,
//valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
},
{ field: 'email', headerName: 'Email', width: 200 },
{ field: 'schoolLabel', headerName: 'School', width: 200 },
{ field: 'github', headerName: 'GitHub', width: 200 },
{
field: 'actions',
headerName: 'Actions',
sortable: false,
width: 200,
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

return (
<main className="flex min-h-screen flex-col items-center p-24">
<div style={{ height: 400, width: '100%' }}>
<DataGrid
rows={rows}
columns={columns}
pageSize={5}
rowsPerPageOptions={[5]}
checkboxSelection
disableSelectionOnClick
className="bg-white shadow-md rounded-lg"
/>
</div>
</main>
);
}
