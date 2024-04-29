'use client';
import { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, Button } from '@mui/material';


function ApplicantModal({ open, handleClose, applicant }) {
    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle style={{ backgroundColor: '#252526', color: 'white' }}>Applicant Details</DialogTitle>
            <DialogContent style={{ backgroundColor: '#252526', color: 'white'}}>
                <List>
                    {Object.entries(applicant).map(([key, value]) => (
                        <ListItem key={key} style={{ color: 'white' }}>
                            <ListItemText primary={key} secondary={value || 'N/A'} primaryTypographyProps={{ style: { color: 'white' } }} secondaryTypographyProps={{ style: { color: 'white' } }}/>
                        </ListItem>
                    ))}
                </List>
            </DialogContent>
        </Dialog>
    );
}

export default function ApplicationPage() {
    const [applicants, setApplicants] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState({});
    const [statusCounts, setStatusCounts] = useState({
        applied: 0,
        rejected: 0,
        accepted: 0,
        waitlisted: 0,
        pending: 0
    });

    useEffect(() => {
        fetch(`/api/applicant`)
        .then(res => res.json())
        .then(data => {setApplicants(data);
        const counts = {
            applied: data.length,
            rejected: data.filter(app => app.status === 'Rejected').length,
            accepted: data.filter(app => app.status === 'Accepted').length,
            waitlisted: data.filter(app => app.status === 'Waitlisted').length,
            pending: data.filter(app => app.status === 'Pending').length
        };
        setStatusCounts(counts);
        });
    }, []);

    const handleOpenModal = (applicant) => {
        setSelectedApplicant(applicant);
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

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
                    <Button 
                        variant="contained" 
                        color="primary" 
                        style={{ backgroundColor: '#1976D2', color: 'white', marginRight: 8 }}
                        onClick={() => handleOpenModal(params.row)}
                    >
                        View
                    </Button>
                    <Button 
                        variant="contained" 
                        style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: 8 }}
                    >
                        Accept
                    </Button>
                    <Button 
                        variant="contained" 
                        style={{ backgroundColor: '#F44336', color: 'white' }}
                    >
                        Reject
                    </Button>
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
    const pageStyles = {
        backgroundColor: '#1E1E1E', // Dark background for the entire page
        color: 'white', // White text color
        height: '100vh', // Full viewport height
        padding: '2rem', // Padding around the content
    };

    const cardStyles = {
        backgroundColor: '#252526', // Slightly lighter shade for cards
        borderRadius: '8px', // Rounded corners for the cards
        margin: '1rem', // Margin around cards
        padding: '1rem', // Padding inside cards
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', // Subtle shadow for depth
        color: 'white', // White text color
    };

    return (
        <main style={pageStyles}>
            <div style={{ ...cardStyles, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {Object.entries(statusCounts).map(([key, value]) => (
                    <div className=" shadow-lg rounded-lg p-5 flex flex-col items-center justify-center">
                        <span className="text-lg font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        <span className="text-2xl font-bold">{value}</span>
                    </div>
                ))}
            </div>
            <div style={cardStyles}>
                <h1 className="text-3xl font-bold text-center mb-5">Applications</h1>
                <DataGrid
                    rows={applicants.map(applicant => ({ ...applicant, id: applicant.uid }))}
                    columns={columns}
                    pageSizeOptions={[5, 10, 25, 50, 100]}
                    initialState={{
                        pagination: { pageSize: 25 },
                    }}
                    disableSelectionOnClick
                    className="bg-white"
                />
            </div>
            <ApplicantModal open={modalOpen} handleClose={handleCloseModal} applicant={selectedApplicant} />
        </main>
    );
}
