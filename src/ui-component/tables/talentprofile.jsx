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
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import FilterButton from '../../ui-component/button/FilterButton.jsx';

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

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F5F5F5',
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    height: '60px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    minHeight: 20,
    verticalAlign: 'center',
    height: '60px',
  },
}));

const calculateColumnWidth = (data, accessor, headerText) => {
  const maxLength = Math.max(...data.map((item) => (item[accessor] ? item[accessor].toString().length : 0)), headerText.length);
  return maxLength * 11;
};

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
    <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell >No</StyledTableCell>
              <StyledTableCell sx={{ minWidth: 150 }}>Nama</StyledTableCell>
              <StyledTableCell >NIPPOS</StyledTableCell>
              <StyledTableCell sx={{ minWidth: 250 }}>Posisi</StyledTableCell>
              <StyledTableCell sx={{ width: calculateColumnWidth(rows, 'joblevel', 'Job Level') }}>Job Level</StyledTableCell>
              <StyledTableCell sx={{ width: calculateColumnWidth(rows, 'jobfam', 'Job Family') }}>Rumpun Jabatan</StyledTableCell>
              <StyledTableCell >Commitment Letter</StyledTableCell>
              <StyledTableCell >Pakta Integritas</StyledTableCell>
              <StyledTableCell >Status Submit</StyledTableCell>
              <StyledTableCell >Komite Unit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.slice(startIndex, endIndex).map((row) => (
            <TableRow key={row.id} >
              <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{row.id}</StyledTableCell>
              <StyledTableCell>{row.Nama}</StyledTableCell>
              <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{row.Nippos}</StyledTableCell>
              <StyledTableCell>{row.Posisi}</StyledTableCell>
              <StyledTableCell sx={{ textAlign: 'center' }}>{row['Job Level']}</StyledTableCell>
              <StyledTableCell>{row['Rumpun Jabatan']}</StyledTableCell>
              <StyledTableCell>
                <div style={{ display: 'inline-block', ...getStatusStyle(commitmentLetterValue), padding: '4px 8px', borderRadius: '24px' }}>
                  {commitmentLetterValue}
                </div>
              </StyledTableCell>
              <StyledTableCell style={{ padding: '12px' }}>
                <div style={{ display: 'inline-block', ...getStatusStyle(paktaIntegritasValue), padding: '4px 8px', borderRadius: '24px' }}>
                  {paktaIntegritasValue}
                </div>
              </StyledTableCell>
              <StyledTableCell style={{ padding: '12px' }}>
                <div style={{ display: 'inline-block', ...getSubmittedByStyle(row['Status Submit']), padding: '4px 8px', borderRadius: '24px' }}>
                  {row['Status Submit']}
                </div>
              </StyledTableCell>
              <StyledTableCell>{row['Komite Unit']}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
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