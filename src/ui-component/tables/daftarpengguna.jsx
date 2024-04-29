import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel } from '@mui/material';

const peranOptions = ['Option 1', 'Option 2', 'Option 3'];

const ActionButton = ({ row, updateRowPeran }) => {
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

  const handleSavePeran = () => {
    const updatedPeran = selectedOptions.join(', ');
    updateRowPeran(row.id, updatedPeran);
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
        <DialogTitle>Daftar Peran Pengguna</DialogTitle>
        <DialogContent>
          {peranOptions.map((option, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox checked={selectedOptions.includes(option)} onChange={handleCheckboxChange(option)} />}
              label={option}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSavePeran} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function DaftarPenggunaTabel() {
  const [rows, setRows] = useState([
    { id: 1, nama: 'Sri Hartini', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation', jobfam: 'Bisnis', joblevel: 'D3', kantor: 'Kantor Pusat Bandung', komiteunit: 'ABD HAFID', Peran: [] }, // Change Peran to an empty array
  ]);

  const updateRowPeran = (rowId, peran) => {
    const updatedRows = rows.map(row => {
      if (row.id === rowId) {
        return { ...row, Peran: peran };
      }
      return row;
    });
    setRows(updatedRows);
  };

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
        <ActionButton row={params.row} updateRowPeran={updateRowPeran} />
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}