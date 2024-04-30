import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CreateOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

const getStyledRenderCell = () => (params) => (
    <div>
      <span style={{ 
        color: '#66BB6A', 
        backgroundColor: params.value ? '#F5FFF5' : 'transparent', 
        padding: '4px 8px', 
        borderRadius: '24px' 
      }}>{params.value}</span>
    </div>
);

const getStatusStyle = (status) => {
    let color, backgroundColor;
    switch (status) {
        case 'Turun':
            color = '#F44336';
            backgroundColor = '#FFEDED';
            break;
        case 'Naik':
            color = '#66BB6A';
            backgroundColor = '#F5FFF5';
            break;
        case 'Tetap':
            color = '#2196F3';
            backgroundColor = '#EAF8FF';
            break;
        default:
            color = '#000000';
            backgroundColor = 'transparent';
    }
    return { color, backgroundColor };
};

const getKategoriMatrixStyle = () => (params) => (
    <div>
      <span style={{ 
        color: '#2196F3', 
        backgroundColor: params.value ? '#EAF8FF' : 'transparent', 
        padding: '4px 8px', 
        borderRadius: '24px' 
      }}>{params.value}</span>
    </div>
);
  
// Define columns with the reusable renderCell function
const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'nama', headerName: 'Nama', width: 130 },
    { field: 'nippos', headerName: 'NIPPOS', width: 130 },
    { field: 'posisi', headerName: 'Posisi', width: 130 },
    { field: 'joblevel', headerName: 'Job Level', width: 130 },
    { field: 'jobfam', headerName: 'Rumpun Jabatan', width: 130 },
    { field: 'kantor', headerName: 'Kantor', width: 130 },
    { field: 'komiteunit', headerName: 'Komite Unit', width: 130 },
    { field: 'competency', headerName: 'Competency/Psychotest', width: 200, renderCell: getStyledRenderCell() },
    { field: 'pms', headerName: 'PMS', width: 130, renderCell: getStyledRenderCell() },
    { field: 'akhlak', headerName: 'AKHLAK', width: 130, renderCell: getStyledRenderCell() },
    { field: 'learningagility', headerName: 'Learning Agility', width: 180, renderCell: getStyledRenderCell() },
    { field: 'avgtalentdays', headerName: 'Nilai Avg Talent Days', width: 200, renderCell: getStyledRenderCell() },
    {
        field: 'status',
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
    { field: 'kategorimatrix', headerName: 'Kategori Matrix', width: 180, renderCell: getKategoriMatrixStyle() },
    {
        field: 'aksi',
        headerName: 'Aksi',
        width: 180,
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
              endIcon={<CreateOutlined />}
            >
              Ubah Matrix
            </Button>
          );
        },
    },

];

const rows = [
    { id: 1, nama: 'Sri Hartini', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation',
    joblevel: 'D3', jobfam: 'Bisnis', kantor: 'Kantor Pusat Bandung', komiteunit: 'ABD HAFID',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9, avgtalentdays: 88, status: 'Turun',
    kategorimatrix: 'Promotable-4' },
    { id: 2, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9, avgtalentdays: 88, status: 'Naik',
    kategorimatrix: 'Promotable-4' },
    { id: 3, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9, avgtalentdays: 88, status: 'Tetap',
    kategorimatrix: 'High Potential' },
    { id: 4, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9, avgtalentdays: 88, status: 'Turun' ,
    kategorimatrix: 'Promotable-4' },
    { id: 5, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9, avgtalentdays: 88, status: 'Naik' ,
    kategorimatrix: 'Promotable-4' },
    { id: 6, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9, avgtalentdays: 88, status: 'Tetap' ,
    kategorimatrix: 'High Potential' },
    { id: 7, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9, avgtalentdays: 88, status: 'Turun' ,
    kategorimatrix: 'Promotable-4' },
    { id: 8, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9, avgtalentdays: 88, status: 'Naik' ,
    kategorimatrix: 'Promotable-4' },
    { id: 9, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9, avgtalentdays: 88, status: 'Tetap' ,
    kategorimatrix: 'High Potential' },
];

export default function TalentClusterKetuaKomiteTalentTable() {
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
