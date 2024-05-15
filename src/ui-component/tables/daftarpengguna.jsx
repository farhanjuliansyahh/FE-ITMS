import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, Stack, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CloseIcon from '@mui/icons-material/Close';
// import ButtonPrimary from '../../ui-component/button/ButtonPrimary';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
const peranOptions = ['Admin Talent', 'Karyawan','Ketua Komite Talent','Komite Unit', 'Super Admin'];
const ActionButton = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (option) => (event) => {
    if (event.target.checked) {
      setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, option]);
    } else {
      setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((item) => item !== option));
    }
  };

  const posttalentpool = (nippos, selectedrole) => {
    return fetch(`http://localhost:4000/updaterolemanagement`, {
        method: 'POST', // Specify the HTTP method (POST, GET, etc.)
        headers: {
            'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({
            // Include any data you want to send in the request body
            nippos: nippos,
            updatedRoles: selectedrole
        }) // Convert the bodyData object to a JSON string
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data; // Return the parsed JSON data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to handle it elsewhere
        });
};

  const handleSavePeran = () => {
    posttalentpool("969355737",selectedOptions)
    setOpen(false);
    setSelectedOptions([]);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleButtonClick}
      >
        Ubah Akses
      </Button>
      <Dialog open={open} onClose={handleModalClose}>
        <Stack direction="row" alignItems="center" marginTop="10px">
          <h2 style={{paddingLeft : '20px', color:'#1F1F1F'}} justifyContent="start">Daftar Peran Pengguna</h2>
          <Button onClick={handleModalClose} color="primary" justifyContent="end" style={{color: '#D32F2F',marginLeft : '100px'}}>
            <CloseIcon/>
          </Button>
        </Stack>
        
        <DialogContent style={{ width: '400px', maxHeight: '300px', overflowY: 'auto' }}>
          {peranOptions.map((option, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox checked={selectedOptions.includes(option)} onChange={handleCheckboxChange(option)} />}
              label={option}
            />
          ))}
        </DialogContent>
        <DialogActions style={{paddingBottom: '12px', paddingRight: '12px'}}>
          <Button onClick={handleSavePeran}
          variant="contained"
          endIcon={<SaveOutlinedIcon/>}
          sx={{ 
            color:'#ffffff',  
            backgroundColor: '#1C2D5A', 
            borderRadius: '12px', 
            fontSize: '14px', // Custom font size
            padding: '8px 18px', // Custom padding using relative units
            boxShadow: 'none',
            width: '110px' || 'auto', // Set width (default: auto)
            height: '40px' || 'auto', // Set height (default: auto)

          }} >
            Save
          </Button>
          <Button onClick={handleModalClose}
           endIcon={<HighlightOffOutlinedIcon/>}
           sx={{ 
            color:'#D32F2F',  
            backgroundColor: '#ffffff', 
            borderRadius: '12px', 
            fontSize: '14px', // Custom font size
            padding: '8px 18px', // Custom padding using relative units
            boxShadow: 'none',
            width: '110px' || 'auto', // Set width (default: auto)
            height: '40px' || 'auto', // Set height (default: auto)
            border: '1.5px solid #D32F2F'
           }} >
            Batalkan
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function DaftarPenggunaTabel({rows}) {
  const [updatedrows, setupdatedrows] = useState(rows);

  const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'nama', headerName: 'Nama', width: 130 },
    { field: 'nippos', headerName: 'Nippos', width: 130 },
    { field: 'posisi', headerName: 'Posisi', width: 130 },
    { field: 'jobfam', headerName: 'Job Family', width: 130 },
    { field: 'joblevel', headerName: 'Job Level', width: 130 },
    { field: 'Peran', headerName: 'Peran', width: 200 },
    {
      field: 'Aksi',
      headerName: 'Aksi',
      width: 130,
      renderCell: (params) => (
        <ActionButton row={params.row}/>
      ),
    },
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 100]}
      />
    </div>
  );
}