import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { idID } from '@mui/material/locale';

const columns = [
  { field: 'id', headerName: 'No', width: 70 },
  { field: 'nama', headerName: 'Nama', width: 130 },
  { field: 'nippos', headerName: 'Nippos', width: 130 },
  { field: 'posisi', headerName: 'Posisi', width: 130 },
  { field: 'joblevel', headerName: 'Job Level', width: 130 },
  { field: 'rumpunjabatan', headerName: 'Rumpun Jabatan', width: 130 },
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
];

const rows = [
  { id: 1, nama : 'Sri Hartini', nippos:'998494379', posisi :'Asisten Manajer Pengembangan Join Operation', 
  joblevel:'D3', rumpunjabatan:'Bisnis'},
  { id: 2, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
  joblevel:'D3', rumpunjabatan:'Bisnis'},
  { id: 3, nama : 'Ferenica', nippos:'999494389', posisi :'Asisten Manajer Acquisition Biller', 
  joblevel:'D3', rumpunjabatan:'Bisnis'},
  { id: 4, nama : 'Ayu Ning', nippos:'900494389', posisi :'Asisten Manajer', 
  joblevel:'D2', rumpunjabatan:'Bisnis'},
  { id: 5, nama : 'Reza Bayu', nippos:'900499389', posisi :'Asisten Manajer', 
  joblevel:'D2', rumpunjabatan:'Bisnis'},
];

export default function KomiteUnitTable({ checkboxSelection }) {
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
        checkboxSelection={checkboxSelection} // Use the prop value here
      />
    </div>
  );
}
