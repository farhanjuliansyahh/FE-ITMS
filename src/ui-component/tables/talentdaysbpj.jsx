import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HapusDataBPJ from '../../ui-component/modal/hapus-data-bpj';

export default function TalentDaysBPJTable({ 
    eventid, 
    rows,
    searchNama, // Receive the search term as a prop
    searchNippos,
    confirm,
    eventstatus_id
 }) {
  const filteredRows = rows.filter((row) => {
    const namaMatch = !searchNama || (row.nama && row.nama.toLowerCase().includes(searchNama.toLowerCase())); // Add null check for row.nama
    const nipposMatch = !searchNippos || (row.nippos && row.nippos.toLowerCase().includes(searchNippos.toLowerCase())); // Add null check for row.nippos

    return (!searchNama || namaMatch) 
    && (!searchNippos || nipposMatch);
  });

  const resetRowIndex = (filteredRows) => {
    return filteredRows.map((row, index) => ({
      ...row,
      id: index + 1, // Adding 1 to start the index from 1 instead of 0
    }));
  };

  const resetRows = resetRowIndex(filteredRows);

  const [HapusBPJOpen, setHapusBPJOpen] = useState(false);
  const [selectedNippos, setSelectedNippos] = useState(null); // State to store selected nippos

  useEffect(() => {
    console.log("nippos untuk di hapus", selectedNippos);
  }, [selectedNippos]); // Run this effect whenever selectedNippos changes

  const handleHapusBPJOpen = (nippos) => {
    setSelectedNippos(nippos);
    setHapusBPJOpen(true);
  };

  const handleHapusBPJClose = () => {
    setHapusBPJOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'No', width: 60 },
    { field: 'nama', headerName: 'Nama', width: 400 },
    { field: 'nippos', headerName: 'Nippos', width: 150 },
    { field: 'Posisi', headerName: 'Posisi', width: 600 },
    {
      field: 'aksi',
      headerName: 'Aksi',
      width: 160,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#FFFFFF',
              color: '#D32F2F',
              border: '1px solid #D32F2F',
              borderColor: '#D32F2F',
              borderRadius: '12px',
              marginRight: '8px',
              '&:hover': {
                backgroundColor: 'transparent',
                borderColor: '#D32F2F',
              },
            }}
            endIcon={<DeleteOutlineOutlinedIcon />}
            onClick={() => handleHapusBPJOpen(params.row.nippos)} // Pass nippos to the handler
            disabled={eventstatus_id !== 5}
          >
            Hapus
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: '100%', overflow: 'hidden' }}>
      <DataGrid
        rows={resetRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        sx={{
          borderRadius: '12px', // Apply border radius to the DataGrid itself
          '& .MuiDataGrid-main': {
            borderRadius: '12px', // Apply border radius to the main container
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#F5F5F5', // Apply background color to each header cell
            padding: '0 24px', // Apply horizontal padding to each header cell
          },
          '& .MuiDataGrid-cell': {
            padding: '0 24px', // Apply horizontal padding to each header cell
          },
        }}
      />
      <HapusDataBPJ
        open={HapusBPJOpen}
        handleClose={() => {
          confirm()
          setHapusBPJOpen(false);
          setSelectedNippos(null); // Reset selected nippos when closing modal
        }}
        nippos={selectedNippos} // Pass selected nippos as prop
      />
    </div>
  );
}
