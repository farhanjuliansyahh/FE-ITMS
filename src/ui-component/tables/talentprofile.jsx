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

export default function TalentProfileTable({ 
  filter, 
  commitmentLetterValue, 
  paktaIntegritasValue, 
  rows
}) {

  const [filterModel, setFilterModel] = React.useState({
    items: [{ field: 'nama', operator: 'contains', value: '' }],
  });

  const [filterNama, setFilterNama] = useState('');
  const [filterNippos, setFilterNippos] = useState('');
  const [filterJob, setFilterJob] = useState('');
  const [filterKomite, setFilterKomite] = useState('');

  React.useEffect(() => {
    if (filter) {
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
        rows={rows.map(row => ({
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
