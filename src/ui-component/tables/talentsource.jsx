import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { idID } from '@mui/material/locale';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'nama', headerName: 'Nama', width: 130 },
  { field: 'nippos', headerName: 'Nippos', width: 130 },
  { field: 'posisi', headerName: 'Posisi', width: 130 },
  { field: 'jobfam', headerName: 'Job Family', width: 130 },
  { field: 'joblevel', headerName: 'Job Level', width: 130 },
  { field: 'rumpunjabatan', headerName: 'Rumpun Jabatan', width: 130 },
  { field: 'kantor', headerName: 'Kantor', width: 130 },
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
  jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABD HAFID'},
  { id: 2, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
  jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
  { id: 3, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
  jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
  { id: 4, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
  jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
  { id: 5, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
  jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
  { id: 6, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
  jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
  { id: 7, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
  jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
  { id: 8, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
  jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
  { id: 9, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
  jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
];

export default function TalentSource() {
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
        checkboxSelection
      />
    </div>
  );
}
