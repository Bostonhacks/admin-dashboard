'use client';

import Button from '@mui/material/Button';

const EditApplicationButton = () => {
  
    const handleClick = () => {
        console.log("hi test");
      };

    return (
      <div className='justify-center flex items-center'>
        <Button variant="contained" onClick={handleClick}>Edit</Button>
      </div>
    );
  }
  export default EditApplicationButton