import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {useState, useEffect} from 'react'
import { idID } from '@mui/material/locale';
import { Message } from '@mui/icons-material';

const columns = [
  { field: 'id', headerName: 'No', width: 70 },
  { field: 'Nama', headerName: 'Nama', width: 130 },
  { field: 'Nippos', headerName: 'Nippos', width: 130 },
  { field: 'Posisi', headerName: 'Posisi', width: 130 },
  { field: 'Job Family', headerName: 'Job Family', width: 130 },
  { field: 'Job Level', headerName: 'Job Level', width: 130 },
  { field: 'Nama Kantor', headerName: 'Kantor', width: 130 },
  { field: 'Komite Unit', headerName: 'Komite Unit', width: 130 },
  {
    // field: 'age',
    // headerName: 'Age',
    // type: 'number',
    // width: 90,
  },
  // Menghapus definisi kolom ini jika tidak ada data yang relevan atau memperbaikinya
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
]



export default function TalentSourceTable({ checkboxSelection, rows }) {

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
        getRowId={(row) => row.Nippos} 
        pageSizeOptions={[5, 10]}
        checkboxSelection={checkboxSelection} // Use the prop value here
      />
    </div>
  );
}
