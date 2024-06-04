// import { useState } from 'react';
// import * as React from 'react';
// import { DataGrid, GridLogicOperator } from '@mui/x-data-grid';

// const getStatusStyle = (status) => {
//   let color, backgroundColor;
//   switch (status) {
//     case 'Belum Submit':
//       color = '#F44336';
//       backgroundColor = '#FFEDED';
//       break;
//     case 'Sudah Submit':
//       color = '#66BB6A';
//       backgroundColor = '#F5FFF5';
//       break;
//     default:
//       color = '#000000';
//       backgroundColor = 'transparent';
//   }
//   return { color, backgroundColor };
// };

// const getSubmittedByStyle = (status) => {
//   let color, backgroundColor;
//   switch (status) {
//     case 'Admin':
//       color = '#2196F3';
//       backgroundColor = '#EAF8FF';
//       break;
//     case 'Talent':
//       color = '#2196F3';
//       backgroundColor = '#EAF8FF';
//       break;
//     default:
//       color = '#000000';
//       backgroundColor = 'transparent';
//   }
//   return { color, backgroundColor };
// };

// const columns = [
//   { field: 'id', headerName: 'No', width: 70 },
//   { field: 'Nama', headerName: 'Nama', width: 180 },
//   { field: 'Nippos', headerName: 'NIPPOS', width: 180 },
//   { field: 'Posisi', headerName: 'Posisi', width: 300 },
//   { field: 'Job Level', headerName: 'Job Level', width: 120 },
//   { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 180 },
//   {
//     field: 'Commitment Letter',
//     headerName: 'Commitment Letter',
//     width: 180,
//     renderCell: (params) => {
//       const { color, backgroundColor } = getStatusStyle(params.value);
//       return (
//         <div>
//           <span style={{
//             color,
//             backgroundColor,
//             padding: '4px 8px',
//             borderRadius: '24px'
//           }}>{params.value}</span>
//         </div>
//       );
//     },
//   },
//   {
//     field: 'Pakta Integritas',
//     headerName: 'Pakta Integritas',
//     width: 180,
//     renderCell: (params) => {
//       const { color, backgroundColor } = getStatusStyle(params.value);
//       return (
//         <div>
//           <span style={{
//             color,
//             backgroundColor,
//             padding: '4px 8px',
//             borderRadius: '24px'
//           }}>{params.value}</span>
//         </div>
//       );
//     },
//   },
//   {
//     field: 'Status Submit',
//     headerName: 'Status Submit',
//     width: 180,
//     renderCell: (params) => {
//       const { color, backgroundColor } = getSubmittedByStyle(params.value);
//       return (
//         <div>
//           <span style={{
//             color,
//             backgroundColor,
//             padding: '4px 8px',
//             borderRadius: '24px'
//           }}>{params.value}</span>
//         </div>
//       );
//     },
//   },
//   { field: 'Komite Unit', headerName: 'Komite Unit', width: 180 },
// ];

// export default function TalentProfileTable({ 
//   filter, 
//   commitmentLetterValue, 
//   paktaIntegritasValue, 
//   rows
// }) {

//   const [filterModel, setFilterModel] = React.useState({
//     items: [{ field: 'nama', operator: 'contains', value: '' }],
//   });

//   const [filterNama, setFilterNama] = useState('');
//   const [filterNippos, setFilterNippos] = useState('');
//   const [filterJob, setFilterJob] = useState('');
//   const [filterKomite, setFilterKomite] = useState('');

//   React.useEffect(() => {
//     if (filter) {
//       setFilterNama(filter.nama);
//       setFilterNippos(filter.nippos);
//       setFilterJob(filter.job);
//       setFilterKomite(filter.komite);
//     }
//   }, [filter])

//   React.useEffect(() => {
//     setFilterModel({
//       items: [
//         { id: 1, field: 'nama', operator: 'contains', value: filterNama },
//         { id: 2, field: 'nippos', operator: 'contains', value: filterNippos },
//         { id: 3, field: 'joblevel', operator: 'contains', value: filterJob },
//         { id: 4, field: 'komiteunit', operator: 'contains', value: filterKomite }
//       ],
//       logicOperator: GridLogicOperator.And
//     })

//   }, [filterNama, filterNippos, filterJob, filterKomite])


//   return (
//     <div style={{ height: 400, width: '100%', overflow: 'hidden' }}>
//       <DataGrid
//         rows={rows.map(row => ({
//           ...row,
//           commitmentletter: commitmentLetterValue,
//           paktaintegritas: paktaIntegritasValue
//         }))}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         filterModel={filterModel}
//         // onFilterModelChange={(model) => setFilterModel(model)}
//         sx={{
//           borderRadius: '12px', // Apply border radius to the DataGrid itself
//           '& .MuiDataGrid-main': {
//             borderRadius: '12px', // Apply border radius to the main container
//           },
//           '& .MuiDataGrid-columnHeader': {
//             backgroundColor: '#F5F5F5', // Apply background color to each header cell
//             padding: '0 24px', // Apply horizontal padding to each header cell
//           },
//           '& .MuiDataGrid-cell': {
//             padding: '0 24px', // Apply horizontal padding to each header cell
//           },
//           '& .MuiDataGrid-columnHeaderCheckbox, .MuiDataGrid-cellCheckbox': {
//             padding: '0 0px', // Adjust padding for the checkbox cells
//           },
//         }}
//       />
//     </div>
//   );
// }

import { useState } from 'react';
import * as React from 'react';
import { GridLogicOperator } from '@mui/x-data-grid';
import {Pagination, Stack, TableCell } from '@mui/material';
import FilterButton from '../../ui-component/button/FilterButton';

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
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
  const handleItemsPerPageChange = (newItemsPerPage) => {
      setItemsPerPage(newItemsPerPage);
      setPage(1);
    };
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
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
    <div>
    <div style={{ height: 400, width: '100%', overflow: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '12px', border: '1px solid #ddd' }}>
        <thead style={{ backgroundColor: '#F5F5F5' }}>
          <tr>
            <th style={{ padding: '12px' }}>No</th>
            <th style={{ padding: '12px' }}>Nama</th>
            <th style={{ padding: '12px' }}>NIPPOS</th>
            <th style={{ padding: '12px' }}>Posisi</th>
            <th style={{ padding: '12px' }}>Job Level</th>
            <th style={{ padding: '12px' }}>Rumpun Jabatan</th>
            <th style={{ padding: '12px' }}>Commitment Letter</th>
            <th style={{ padding: '12px' }}>Pakta Integritas</th>
            <th style={{ padding: '12px' }}>Status Submit</th>
            <th style={{ padding: '12px' }}>Komite Unit</th>
          </tr>
        </thead>
        <tbody>
          {rows.slice(startIndex, endIndex).map((row) => (
            <tr key={row.id} style={{ borderBottom: '1px solid #ddd' }}>
              <TableCell style={{ padding: '12px' }}>{row.id}</TableCell>
              <TableCell style={{ padding: '12px' }}>{row.Nama}</TableCell>
              <TableCell style={{ padding: '12px' }}>{row.Nippos}</TableCell>
              <TableCell style={{ padding: '12px' }}>{row.Posisi}</TableCell>
              <TableCell style={{ padding: '12px' }}>{row['Job Level']}</TableCell>
              <TableCell style={{ padding: '12px' }}>{row['Rumpun Jabatan']}</TableCell>
              <TableCell style={{ padding: '12px' }}>
                <div style={{ ...getStatusStyle(commitmentLetterValue), padding: '4px 8px', borderRadius: '24px' }}>
                  {commitmentLetterValue}
                </div>
              </TableCell>
              <TableCell style={{ padding: '12px' }}>
                <div style={{ ...getStatusStyle(paktaIntegritasValue), padding: '4px 8px', borderRadius: '24px' }}>
                  {paktaIntegritasValue}
                </div>
              </TableCell>
              <TableCell style={{ padding: '12px' }}>
                <div style={{ ...getSubmittedByStyle(row['Status Submit']), padding: '4px 8px', borderRadius: '24px' }}>
                  {row['Status Submit']}
                </div>
              </TableCell>
              <TableCell style={{ padding: '12px' }}>{row['Komite Unit']}</TableCell>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      <Stack spacing={2} direction="row" marginTop={2}>
        <Pagination
          count={Math.ceil(rows.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary" />
        <div style={{ flex: '1' }}> </div>
        <FilterButton itemsPerPage={itemsPerPage} setItemsPerPage={handleItemsPerPageChange} />
    </Stack>
    </div>
    );
}