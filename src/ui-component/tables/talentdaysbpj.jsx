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
    searchNippos
 }) {
  const filteredRows = rows.filter((row) => {
    const namaMatch = !searchNama || (row.nama && row.nama.toLowerCase().includes(searchNama.toLowerCase())); // Add null check for row.nama
    const nipposMatch = !searchNippos || (row.nippos && row.nippos.toLowerCase().includes(searchNippos.toLowerCase())); // Add null check for row.nippos

    return (!searchNama || namaMatch) 
    && (!searchNippos || nipposMatch);
  });

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
    { field: 'id', headerName: 'No', width: 50 },
    { field: 'nama', headerName: 'Nama', width: 200 },
    { field: 'nippos', headerName: 'Nippos', width: 130 },
    { field: 'Posisi', headerName: 'Posisi', width: 400 },
    {
      field: 'aksi',
      headerName: 'Aksi',
      width: 150,
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
          >
            Hapus
          </Button>
        );
      },
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
      <HapusDataBPJ
        open={HapusBPJOpen}
        handleClose={() => {
          setHapusBPJOpen(false);
          setSelectedNippos(null); // Reset selected nippos when closing modal
        }}
        nippos={selectedNippos} // Pass selected nippos as prop
      />
    </div>
  );
}
