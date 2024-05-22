import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, Stack, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const peranOptions = ['Admin Talent', 'Karyawan', 'Ketua Komite Talent', 'Komite Unit', 'Super Admin'];

const ActionButton = ({ row, onSave }) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setSelectedOptions(row.Peran ? row.Peran.split(', ').map(role => role.trim()) : []);
    }
  }, [open, row.Peran]);

  const handleCheckboxChange = (option) => (event) => {
    if (event.target.checked) {
      setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, option]);
    } else {
      setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((item) => item !== option));
    }
  };

  const postTalentPool = async (nippos, selectedRole) => {
    try {
      const response = await fetch(`http://localhost:4000/updaterolemanagement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nippos: nippos,
          updatedRoles: selectedRole,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const handleSavePeran = async () => {
    await postTalentPool(row.nippos, selectedOptions);
    onSave(row.id, selectedOptions); // Update the parent state with the new roles
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
          <h2 style={{ paddingLeft: '20px', color: '#1F1F1F' }} justifyContent="start">Daftar Peran Pengguna</h2>
          <Button onClick={handleModalClose} color="primary" justifyContent="end" style={{ color: '#D32F2F', marginLeft: '100px' }}>
            <CloseIcon />
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
        <DialogActions style={{ paddingBottom: '12px', paddingRight: '12px' }}>
          <Button onClick={handleSavePeran}
            variant="contained"
            endIcon={<SaveOutlinedIcon />}
            sx={{
              color: '#ffffff',
              backgroundColor: '#1C2D5A',
              borderRadius: '12px',
              fontSize: '14px',
              padding: '8px 18px',
              boxShadow: 'none',
              width: '110px',
              height: '40px',
            }} >
            Save
          </Button>
          <Button onClick={handleModalClose}
            endIcon={<HighlightOffOutlinedIcon />}
            sx={{
              color: '#D32F2F',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              fontSize: '14px',
              padding: '8px 18px',
              boxShadow: 'none',
              width: '110px',
              height: '40px',
              border: '1.5px solid #D32F2F'
            }} >
            Batalkan
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function DaftarPenggunaTabel({ 
  rows,
  searchNama, 
  searchNippos,
  searchPeran,
  onFilteredData, // Receive the callback function
}) {
  const [updatedRows, setUpdatedRows] = useState([]);

  useEffect(() => {
    setUpdatedRows(rows);
  }, [rows]);

  const handleSave = (id, newRoles) => {
    setUpdatedRows((prevRows) =>
      prevRows.map((row) => (row.id === id ? { ...row, Peran: newRoles.join(', ') } : row))
    );
  };

  const calculateColumnWidth = (data, accessor, headerText) => {
    const maxLength = Math.max(
      ...data.map(item => (item[accessor] ? item[accessor].toString().length : 0)),
      headerText.length
    );
    return maxLength * 11; // Adjust multiplier as needed
  };

  const columns = [
    { field: 'id', headerName: 'No', width: calculateColumnWidth(rows, 'id', 'No') },
    { field: 'nama', headerName: 'Nama', width: calculateColumnWidth(rows, 'nama', 'Nama') },
    { field: 'nippos', headerName: 'Nippos', width: calculateColumnWidth(rows, 'nippos', 'Nippos') },
    { field: 'posisi', headerName: 'Posisi', width: calculateColumnWidth(rows, 'posisi', 'Posisi') },
    { field: 'jobfam', headerName: 'Job Family', width: calculateColumnWidth(rows, 'jobfam', 'Job Family') },
    { field: 'joblevel', headerName: 'Job Level', width: calculateColumnWidth(rows, 'joblevel', 'Job Level') },
    { field: 'Peran', headerName: 'Peran', width: calculateColumnWidth(rows, 'Peran', 'Peran') },
    {
      field: 'Aksi',
      headerName: 'Aksi',
      width: 150,
      renderCell: (params) => (
        <ActionButton row={params.row} onSave={handleSave} />
      ),
    },
  ];

  //fungsi buat reset index:
  const resetRowIndex = (filteredRows) => {
    return filteredRows.map((row, index) => ({
      ...row,
      id: index + 1, // Adding 1 to start the index from 1 instead of 0
    }));
  };

  // Filter the rows based on selected filters and search term
  const filteredRows = updatedRows.filter((row) => {
    const namaMatch = !searchNama || (row.nama && row.nama.toLowerCase().includes(searchNama.toLowerCase())); 
    const nipposMatch = !searchNippos || (row.nippos && row.nippos.toLowerCase().includes(searchNippos.toLowerCase())); 
    const peranMatch = !searchPeran || (row.Peran && row.Peran.toLowerCase().includes(searchPeran.toLowerCase())); 

    return (!searchNama || namaMatch) 
    && (!searchNippos || nipposMatch) 
    && (!searchPeran || peranMatch);
  });

  //buat constanta yang isinya hasil filter yang indexnya udah di reset:
  const resetRows = resetRowIndex(filteredRows);
  
  useEffect(() => {
    onFilteredData(resetRows);
  }, [resetRows, onFilteredData]);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={resetRows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5, page: 0 }, // Setting the default page size to 5
          },
        }}
      />
    </div>
  );
}
