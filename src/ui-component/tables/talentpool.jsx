import { useState } from 'react';
import * as React from 'react';
import { DataGrid, GridLogicOperator } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import ButtonPrimary from '../button/ButtonPrimary';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const columns = [
  { field: 'id', headerName: 'No', width: 70 },
  { field: 'Nama', headerName: 'Nama', width: 180 },
  { field: 'Nippos', headerName: 'NIPPOS', width: 180 },
  { field: 'Posisi', headerName: 'Posisi', width: 180 },
  { field: 'Job Level', headerName: 'Job Level', width: 180,
  // type: 'number'
  },
  { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 180,
  // description: 'This column has a value getter and is not sortable.', sortable: false, valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  { field: 'Nama Kantor', headerName: 'Kantor', width: 180 },
  { field: 'Kategori Matrix Akhir', headerName: 'Kategori Matrix Akhir', width: 180 },
  { field: 'Status', headerName: 'Status', width: 180 },
  { field: 'aksi', headerName: 'Aksi', width: 320, 
  renderCell: (params) => {
    return (
      <>
        <Button 
          variant="contained" 
          sx={{
            color: '#ffffff',
            borderRadius:'12px',
            boxShadow: 'none', 
            marginRight: '8px',
            '&:hover': {
              backgroundColor: '#0F1C3E',
              
            },
          }} 
          endIcon={<CreateRoundedIcon />}
        >
          Ubah Status
        </Button>

        <ButtonPrimary Color="#ffffff" icon={DeleteOutlineOutlinedIcon} LabelName={'Ubah Status'}/>
      </>
    );
  },
  },
];

// const rows = [
//   { id: 1, nama: 'Sri Hartini', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation', joblevel: 'D3', rumpunjabatan: 'Bisnis', kantor: 'Kantor Pusat Bandung', kategorimatrix: 'High Potential', status: 'Talent' },
//   { id: 2, nama: 'Muhamad Arsyi', nippos: '998494379', posisi: 'Asisten Manajer Acquisition Biller', joblevel: 'D3', rumpunjabatan: 'Bisnis', kantor: 'Kantor Pusat Bandung', kategorimatrix: 'Promotable-4', status: 'Talent' },
//   { id: 3, nama: 'Adinda', nippos: '998494379', posisi: 'Asisten Manajer Pengelolaan Remittance LN', joblevel: 'D3', rumpunjabatan: 'Bisnis', kantor: 'Kantor Pusat Bandung', kategorimatrix: 'Promotable-4', status: 'Talent' },
//   { id: 4, nama: 'Niken Wijaya', nippos: '998494379', posisi: 'Asisten Manajer Penjualan dan Kemitraan Pospay', joblevel: 'D3', rumpunjabatan: 'Bisnis', kantor: 'Kantor Pusat Bandung', kategorimatrix: 'Promotable-3', status: 'Talent' },
//   { id: 5, nama: 'Sri Hartini', nippos: '998494379', posisi: 'Asisten Manajer Pengelolaan Administrasi dan Kinerja Bidding', joblevel: 'D3', rumpunjabatan: 'Bisnis', kantor: 'Kantor Pusat Bandung', kategorimatrix: 'High Potential', status: 'Talent' },
//   { id: 6, nama: 'Ayu Ning Sukarman', nippos: '998494379', posisi: 'Asisten Manajer Pengelolaan Administrasi dan Kinerja Bidding', joblevel: 'D3', rumpunjabatan: 'Bisnis', kantor: 'Kantor Pusat Bandung', kategorimatrix: 'Promotable-3', status: 'Talent' },
// ];

export default function TalentPool({
  filter, 
  rows,
  searchNama, // Receive the search term as a prop
  searchNippos,
  searchJobLevel,
  searchStatus
}) {
  console.log("daftar pool", rows);
  const filteredRows = rows.filter((row) => {
    const namaMatch = !searchNama || (row.Nama && row.Nama.toLowerCase().includes(searchNama.toLowerCase())); // Add null check for row.nama
    const nipposMatch = !searchNippos || (row.Nippos && row.Nippos.toLowerCase().includes(searchNippos.toLowerCase())); // Add null check for row.nippos
    const jobLevelMatch = !searchJobLevel || (row['Job Level'] && row['Job Level'].toLowerCase().includes(searchJobLevel.toLowerCase())); // Add null check for row.nippos
    // const StatusMatch = !searchStatus || (row['Status'] && row['Status'].toLowerCase().includes(searchStatus.toLowerCase())); // Add null check for row.nippos

    return (!searchNama || namaMatch) 
    && (!searchNippos || nipposMatch) 
    && (!searchJobLevel || jobLevelMatch) 
    // && (!searchStatus || StatusMatch);
  });

  const [filterModel, setFilterModel] = React.useState({
    items: [{ field: 'nama', operator: 'contains', value: '' }],
  });

  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');
  const [filterJob, setFilterJob] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  React.useEffect(()=>{
    if(filter){
      console.log(filter);
      setFilterNama(filter.nama);
      setFilterNippos(filter.nippos);
      setFilterJob(filter.job);
      setFilterStatus(filter.status);
    }
  },[filter])

  React.useEffect(()=>{
    setFilterModel({
      items: [
        { id:1, field: 'nama', operator: 'contains', value: filterNama },
        { id:2, field: 'nippos', operator: 'contains', value: filterNippos },
        { id:3, field: 'joblevel', operator: 'contains', value: filterJob },
        { id:4, field: 'status', operator: 'contains', value: filterStatus }
      ],
      logicOperator: GridLogicOperator.And
    })

  },[filterNama,filterNippos,filterJob,filterStatus])


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
        // checkboxSelection
        filterModel={filterModel}
        // onFilterModelChange={(model) => setFilterModel(model)}
      />
    </div>
  );
}