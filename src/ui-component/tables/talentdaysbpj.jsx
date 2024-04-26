import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const columns = [
  { field: 'no', headerName: 'No', width: 50 },
  { field: 'nama', headerName: 'Nama', width: 200 },
  { field: 'nippos', headerName: 'Nippos', width: 130 },
  { field: 'posisi', headerName: 'Posisi', width: 400 },
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
        >
          Hapus
        </Button>
      );
    },
  },
];

const rows = [
    {id: 1, nama: 'Asih Kurniasari Komar', nippos: '451416105', posisi: 'Direktur Human Capital Management' },
    {id: 2, nama: 'Chandra Dewi', nippos: '971374200', posisi: 'Senior Vice President Human Capital Services and Business Partner' },
    {id: 3, nama: 'Daryana', nippos: '970340709', posisi: 'Vice President Digital Operation and Quality Assurance' },
    {id: 4, nama: 'Wasli', nippos: '969288451', posisi: 'Vice President Operation Cost Management and Partnership' },
    {id: 5, nama: 'Gusti Mas Akhirin', nippos: '973339111', posisi: 'Vice President Operasi Pelayanan' },
    {id: 6, nama: 'Kumalawati', nippos: '969355452', posisi: 'Vice President Bidding and Collection Management' },
];

export default function TalentDaysBPJTable() {
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
    </div>
  );
}
