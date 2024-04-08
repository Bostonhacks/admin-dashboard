'use client';
import EditApplicationButton from "../components/EditApplicationsButton";
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";

export default function DummyDataTable() {

  const columns = [
    { field: 'col1', headerName: 'ID', flex: 1, headerAlign: 'left' },
    { field: 'col2', headerName: 'Name', flex: 1, headerAlign: 'left' },
    { field: 'col3', headerName: 'College', flex: 1, headerAlign: 'left' },
    { field: 'col4', headerName: 'Status', flex: 1, headerAlign: 'left' },
    { field: 'col5', headerName: 'Actions', flex: 1, headerAlign: 'left', renderCell: (cellValues) => {
      return (
        <Stack direction="row" spacing={2}> 
        <Button
          variant='contained'
          onClick={(event) => {
            // handleOpen(event, cellValues.row)
            console.log("clicked open")
          }}
        >
          Update
        </Button>
        <Button
          variant='contained'
          color='error'
          onClick={(event) => {
          // handleAlertClick(event, cellValues.row);
          console.log("clicked alert")
        }}
        >
          Delete
        </Button>
      </Stack>
      );
    } }
  ];

  const [rowData, setRowData] = useState([]);
  
  const fetchData = async () => {
    const arr = [];
    try {
      const response = await fetch('api/applicants');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      jsonData.forEach(applicant => 
        arr.push({
          id: applicant.id, col1: applicant.id, col2: applicant.firstName, col3: applicant.schoolValue, col4: applicant.status
        })
      )
      setRowData(arr)
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
      
  };
   
    useEffect(()=>{
      fetchData();
    }, [])

  return (
    // <ul>
    //   ---------
    //   {users.map((user) => (
    //     <li key={user.firstName} className='grid grid-cols-3 gap-2 content-between'>
    //       {user.firstName}
    //       <EditApplicationButton />
    //       </li>
    //   ))}
    //   ---------
    // </ul>
    <div style={{ height: '80%', width: '100%' }} className="justify-self-center">
        <DataGrid rows={rowData} columns={columns} slots={{ toolbar: GridToolbar }} sx={{
           '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
            backgroundColor: "white",
         },
       }} />
      </div>
  );
}