import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

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
  
const columns = [
  { field: 'id', headerName: 'No', width: 70 },
  { field: 'nama', headerName: 'Nama', width: 130 },
  { field: 'nippos', headerName: 'NIPPOS', width: 130 },
  { field: 'Posisi', headerName: 'Posisi', width: 130 },
  { field: 'Job Level', headerName: 'Job Level', width: 130 },
  { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 130 },
  { field: 'Nama Kantor', headerName: 'Kantor', width: 130 },
  { field: 'Komite Unit', headerName: 'Komite Unit', width: 130 },
  { field: 'Matriks Kategori Awal', headerName: 'Kategori Matrix Awal', width: 180, renderCell: getKategoriMatrixStyle() },
  { field: 'Matriks Kategori Akhir', headerName: 'Kategori Matrix Akhir', width: 180, renderCell: getKategoriMatrixStyle() },
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
  {
    field: 'reason', headerName: 'Alasan Perubahan', width: 180
    },
];


export default function TalentClusterTable({
  rows
}) {
  return (
    <div style={{ height: 400, width: '100%', overflow: 'hidden' }}>
      <DataGrid
        rows={rows}
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
          '& .MuiDataGrid-columnHeaderCheckbox, .MuiDataGrid-cellCheckbox': {
            padding: '0 0px', // Adjust padding for the checkbox cells
          },
        }}
      />
    </div>
  );
}
