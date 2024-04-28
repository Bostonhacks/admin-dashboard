
'use client';
import { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Stack from '@mui/material/Stack';
import { Button, TextField, Box } from "@mui/material";

export default function DummyDataTable() {
  const [rowData, setRowData] = useState([]);
  const [formData, setFormData] = useState({
    acceptTerms: false,
    acceptTerms2: false,
    acceptTerms3: false,
    address: '',
    age: '',
    authProvider: '',
    bostonhacks: '',
    city: '',
    collegeYear: '',
    country: '',
    diet: '',
    educationLevel: '',
    email: '',
    ethnicity: '',
    firstName: '',
    gender: '',
    github: '',
    lastName: '',
    linkedin: '',
    major: '',
    otherDiet: '',
    phoneNumber: '',
    portfolio: '',
    pronouns: '',
    schoolLabel: '',
    schoolValue: '',
    shirtSize: '',
    sleep: false,
    state: '',
    status: '',
    uid: '',
    zipCode: ''
  });

  const columns = [
    { field: 'col1', headerName: 'ID', flex: 1, headerAlign: 'left' },
    { field: 'col2', headerName: 'Name', flex: 1, headerAlign: 'left'},
    { field: 'col3', headerName: 'College', flex: 1, headerAlign: 'left'},
    { field: 'col4', headerName: 'Status', flex: 1, headerAlign: 'left' },
    { field: 'col5', headerName: 'Actions', flex: 1, headerAlign: 'left', renderCell: (cellValues) => {
      return (
        <Stack direction="row" spacing={2}>
          <Button
            variant='contained'
            style={{ color: 'black' }}
            onClick={(event) => {
              // handleOpen(event, cellValues.row)
              console.log("clicked open")
            }}
          >
            Update
          </Button>
          <Button
            variant='contained'
            style={{ color: 'black' }}
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
    }}
  ];

  const handleChange = (event) => {
    //destructuring
    const { name, value, type, checked } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      
      //prev copies the original information into new state to be used
      // this new state is updated with information such as whether it is "checked or whether if has a new value"

    }
  ) 
);
  };

  const fetchData = async () => {
    try {
      const response = await fetch('api/applicants');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setRowData(data.map(applicant => ({
        id: applicant.id, col1: applicant.id, col2: applicant.firstName, col3: applicant.schoolValue, col4: applicant.status
      })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      const response = await fetch('/api/add', { // there is probably not a need for separate folders, but it didn't work for me
        //fetch deafaults to a get request, so we must specify that the 
        method: 'POST',
        //since we are sending information, we are onverting it to a form that the server can read
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add new entry');
      }
      // Refresh the data grid
      await fetchData(); 
    } catch (error) {
      console.error('Error adding new entry:', error);

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
      {/* Form for adding new entries (Added) */}
      <Box component="form" onSubmit={(e) => e.preventDefault()} sx={{ display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: "white" }}>
       {/* for each key (each item in formData) textfield is rendered */}
        {Object.keys(formData).map(key => (
          <TextField
            key={key}
            // key prop
            name={key}
            //name of the textfield is set to same as key
            label={key.charAt(0).toUpperCase() + key.slice(1).replace(/[A-Z]/g, letter => ` ${letter}`)} 
            //setting the label of the textfield to be readable. /[A-Z]/ matches any capital letter in the key, and prefixes a space. the g, makes sure this is done for all occurances of capital letters
            //So basically everytime a capital letter is found, we wil replace that letter with a 'space' + that letter.
            type={key.includes('Terms') || key === 'sleep' ? 'checkbox' : 'text'}
            // (? :) denotes, if else. if the key contains Terms or is equal to sleep, then we will set this textfield to be a checkbox, otherwise it will be just text input field
            value={formData[key]}
            // value of textfield corresponds to value of object formData
            onChange={handleChange}
            //when a change occurs, we handle it based on whether the input field is checkbox or tex field, calling the handleChange function
            checked={key.includes('Terms') || key === 'sleep' ? formData[key] : undefined}
            //whether checbox is checked or not
          />
        ))
        }
        <Button variant="contained" onClick={handleAdd} style={{ color: 'black' }}>Add Applicant</Button>
      </Box>
      <DataGrid
        rows={rowData}
        columns={columns}
        components={{ Toolbar: GridToolbar }}
        sx={{ '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': { backgroundColor: "white" } }}
      />
    </div>
  );
}
