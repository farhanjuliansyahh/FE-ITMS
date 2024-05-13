import { useState } from 'react';
import * as React from 'react';
import { DataGrid, GridLogicOperator } from '@mui/x-data-grid';

const getStatusStyle = (status) => {
  let color, backgroundColor;
  switch (status) {
    case 'Belum Submit':
      color = '#F44336';
      backgroundColor = '#FFEDED';
      break;
    case 'Sudah Submit':
      color = '#66BB6A';
      backgroundColor = '#F5FFF5';
      break;
    default:
      color = '#000000';
      backgroundColor = 'transparent';
  }
  return { color, backgroundColor };
};

const getSubmittedByStyle = (status) => {
  let color, backgroundColor;
  switch (status) {
    case 'Admin':
      color = '#2196F3';
      backgroundColor = '#EAF8FF';
      break;
    case 'Talent':
      color = '#2196F3';
      backgroundColor = '#EAF8FF';
      break;
    default:
      color = '#000000';
      backgroundColor = 'transparent';
  }
  return { color, backgroundColor };
};

const columns = [
  { field: 'id', headerName: 'No', width: 70 },
  { field: 'Nama', headerName: 'Nama', width: 180 },
  { field: 'Nippos', headerName: 'NIPPOS', width: 180 },
  { field: 'Posisi', headerName: 'Posisi', width: 300 },
  { field: 'Job Level', headerName: 'Job Level', width: 120 },
  { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 180 },
  {
    field: 'Commitment Letter',
    headerName: 'Commitment Letter',
    width: 180,
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
    field: 'Pakta Integritas',
    headerName: 'Pakta Integritas',
    width: 180,
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
    field: 'Status Submit',
    headerName: 'Status Submit',
    width: 180,
    renderCell: (params) => {
      const { color, backgroundColor } = getSubmittedByStyle(params.value);
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
  { field: 'Komite Unit', headerName: 'Komite Unit', width: 180 },
];

// const rows = [
//   { id: 1, nama: 'Sri Hartini', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation', joblevel: 'D3', rumpunjabatan: 'Bisnis', commitmentletter: 'Belum Submit', paktaintegritas: 'Belum Submit', komiteunit: 'ABD HAFID' },
//   { id: 2, nama: 'Muhamad Arsyi', nippos: '998494379', posisi: 'Asisten Manajer Acquisition Biller', joblevel: 'D3', rumpunjabatan: 'Bisnis', commitmentletter: 'Belum Submit', paktaintegritas: 'Belum Submit', komiteunit: 'ABDU SOMAD' },
//   { id: 3, nama: 'Adinda', nippos: '998494379', posisi: 'Asisten Manajer Pengelolaan Remittance LN', joblevel: 'D3', rumpunjabatan: 'Bisnis', commitmentletter: 'Belum Submit', paktaintegritas: 'Belum Submit', komiteunit: 'ABDUL JAMIL' },
//   { id: 4, nama: 'Niken Wijaya', nippos: '998494379', posisi: 'Asisten Manajer Penjualan dan Kemitraan Pospay', joblevel: 'D3', rumpunjabatan: 'Bisnis', commitmentletter: 'Belum Submit', paktaintegritas: 'Belum Submit', komiteunit: 'ABDUL WAHAB' },
//   { id: 5, nama: 'Sri Hartini', nippos: '998494379', posisi: 'Asisten Manajer Pengelolaan Administrasi dan Kinerja Bidding', joblevel: 'D3', rumpunjabatan: 'Bisnis', commitmentletter: 'Belum Submit', paktaintegritas: 'Belum Submit', komiteunit: 'ACEP RUDI SUPRIADI' },
//   { id: 6, nama: 'Ayu Ning Sukarman', nippos: '998494379', posisi: 'Asisten Manajer Pengelolaan Administrasi dan Kinerja Bidding', joblevel: 'D3', rumpunjabatan: 'Bisnis', commitmentletter: 'Belum Submit', paktaintegritas: 'Belum Submit', komiteunit: 'ACEP RUDI SUPRIADI' },
// ];

export default function TalentProfileTable({ 
  filter, 
  commitmentLetterValue, 
  paktaIntegritasValue, 
  rows,
  searchNama, // Receive the search term as a prop
  searchNippos,
  searchJobLevel,
  searchKomiteUnit
}) {
  const filteredRows = rows.filter((row) => {
    const namaMatch = !searchNama || (row.Nama && row.Nama.toLowerCase().includes(searchNama.toLowerCase())); // Add null check for row.nama
    const nipposMatch = !searchNippos || (row.Nippos && row.Nippos.toLowerCase().includes(searchNippos.toLowerCase())); // Add null check for row.nippos
    const jobLevelMatch = !searchJobLevel || (row['Job Level'] && row['Job Level'].toLowerCase().includes(searchJobLevel.toLowerCase())); // Add null check for row.nippos
    const komiteUnitMatch = !searchKomiteUnit || (row['Komite Unit'] && row['Komite Unit'].toLowerCase().includes(searchKomiteUnit.toLowerCase())); // Add null check for row.nippos

    return (!searchNama || namaMatch) 
    && (!searchNippos || nipposMatch) 
    && (!searchJobLevel || jobLevelMatch) 
    && (!searchKomiteUnit || komiteUnitMatch);
  });

  const [filterModel, setFilterModel] = React.useState({
    items: [{ field: 'nama', operator: 'contains', value: '' }],
  });

  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');
  const [filterJob, setFilterJob] = useState('');
  const [filterKomite, setFilterKomite] = useState('');

  React.useEffect(() => {
    if (filter) {
      console.log(filter);
      setFilterNama(filter.nama);
      setFilterNippos(filter.nippos);
      setFilterJob(filter.job);
      setFilterKomite(filter.komite);
    }
  }, [filter])

  React.useEffect(() => {
    setFilterModel({
      items: [
        { id: 1, field: 'nama', operator: 'contains', value: filterNama },
        { id: 2, field: 'nippos', operator: 'contains', value: filterNippos },
        { id: 3, field: 'joblevel', operator: 'contains', value: filterJob },
        { id: 4, field: 'komiteunit', operator: 'contains', value: filterKomite }
      ],
      logicOperator: GridLogicOperator.And
    })

  }, [filterNama, filterNippos, filterJob, filterKomite])


  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={filteredRows.map(row => ({
          ...row,
          commitmentletter: commitmentLetterValue,
          paktaintegritas: paktaIntegritasValue
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        filterModel={filterModel}
        // onFilterModelChange={(model) => setFilterModel(model)}
      />
    </div>
  );
}
