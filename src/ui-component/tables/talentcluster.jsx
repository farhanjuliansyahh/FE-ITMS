import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

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
  { field: 'Posisi', headerName: 'Posisi', width: 130 },
  { field: 'Job Level', headerName: 'Job Level', width: 130 },
  { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 130 },
  { field: 'Nama Kantor', headerName: 'Kantor', width: 130 },
  { field: 'Komite Unit', headerName: 'Komite Unit', width: 130 },
  // { field: 'Competency/Psychotest', headerName: 'Competency/Psychotest', width: 200, renderCell: getStyledRenderCell() },
  // { field: 'PMS', headerName: 'PMS', width: 130, renderCell: getStyledRenderCell() },
  // { field: 'AKHLAK', headerName: 'AKHLAK', width: 130, renderCell: getStyledRenderCell() },
  // { field: 'Learning Agility', headerName: 'Learning Agility', width: 180, renderCell: getStyledRenderCell() },
  // { field: 'days', headerName: 'Nilai Avg Talent Days', width: 200, renderCell: getStyledRenderCell() },
  { field: 'kategorimatrixawal', headerName: 'Kategori Matrix Awal', width: 180, renderCell: getKategoriMatrixStyle() },
  { field: 'kategorimatrixakhir', headerName: 'Kategori Matrix Akhir', width: 180, renderCell: getKategoriMatrixStyle() },
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
];


export default function TalentClusterTable({rows}) {
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
