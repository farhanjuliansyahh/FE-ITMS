import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HapusDataBPJ from '../../ui-component/modal/hapus-data-bpj';

export default function TalentDaysBPJTable({rows}) {
  const [HapusBPJOpen, setHapusBPJOpen] = useState(false);

  const handleHapusBPJOpen = () => {
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
              backgroundColor:'#FFFFFF', 
              color: '#D32F2F',
              border: '1px solid #D32F2F',
              borderColor: '#D32F2F',
              borderRadius:'12px', 
              marginRight: '8px',
              '&:hover': {
                backgroundColor: 'transparent',
                borderColor: '#D32F2F',
              },
            }} 
            endIcon={<DeleteOutlineOutlinedIcon />}
            onClick={handleHapusBPJOpen}
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
        rows={rows}
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
        handleClose={() => setHapusBPJOpen(false)}
      />
    </div>
  );
}
