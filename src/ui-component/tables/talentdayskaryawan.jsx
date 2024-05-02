import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';

const getStatusStyle = (status) => {
    let color, backgroundColor;
    switch (status) {
      case 'Belum Diisi':
        color = '#F44336';
        backgroundColor = '#FFEDED';
        break;
      case 'Sudah Diisi':
        color = '#66BB6A';
        backgroundColor = '#F5FFF5';
        break;
      default:
        color = '#000000';
        backgroundColor = 'transparent';
    }
    return { color, backgroundColor };
  };

const columns = [
  { field: 'id', headerName: 'No', width: 50 },
  { field: 'Nama', headerName: 'Nama', width: 200 },
  { field: 'Nippos', headerName: 'Nippos', width: 130 },
  { field: 'Posisi', headerName: 'Posisi', width: 400 },
  { field: 'Job Level', headerName: 'Job Level', width: 130 },
  { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 130 },
  { field: 'Nama Kantor', headerName: 'Kantor', width: 130 },
  { field: 'Komite Unit', headerName: 'Komite Unit', width: 130 },
  {
    field: 'Status',
    headerName: 'Status',
    width: 130,
    renderCell: (params) => {
        const { color, backgroundColor } = getStatusStyle(params.value);
        return (
        <div>
            <span style={{ 
            color,
            backgroundColor,
            padding: '4px 8px',
            borderRadius: '24px' 
            }}>{params.value}</span>
        </div>
        );
    },
  },
  {
    field: 'aksi',
    headerName: 'Aksi',
    width: 150,
    renderCell: (params) => {
      return (
        <Button 
          variant="contained" 
          sx={{
            backgroundColor:'#1C2D5A', 
            color: '#FFFFFF',
            borderRadius:'12px', 
            padding: '6px 16px'
          }} 
          endIcon={<AssignmentOutlinedIcon />}
        >
          Nilai
        </Button>
      );
    },
  },
];

// const rows = [
//     { id: 1, nama : 'Sri Hartini', nippos:'998494379', posisi :'Asisten Manajer Pengembangan Join Operation', 
//     joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABD HAFID', status: 'Belum Diisi' },
//     { id: 2, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//     joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD', status: 'Sudah Diisi' },
//     { id: 3, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//     joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD', status: 'Belum Diisi' },
//     { id: 4, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//     joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD', status: 'Sudah Diisi' },
//     { id: 5, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//     joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD', status: 'Sudah Diisi' },
//     { id: 6, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//     joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD', status: 'Sudah Diisi' },
//     { id: 7, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//     joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD', status: 'Sudah Diisi' },
//     { id: 8, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//     joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD', status: 'Belum Diisi' },
//     { id: 9, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//     joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD', status: 'Belum Diisi' },
//   ];

export default function TalentDaysBPJTable({rows}) {
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
