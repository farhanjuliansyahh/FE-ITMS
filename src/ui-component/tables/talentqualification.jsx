// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';

// const getColorStyle = (value, minimumValueQualified) => {
//   let color, backgroundColor;
//   if (value < minimumValueQualified) {
//     color = '#F44336';
//     backgroundColor = '#FFEDED';
//   } else {
//     color = '#66BB6A';
//     backgroundColor = '#F5FFF5';
//   }

//   return { color, backgroundColor };
// };

// export default function TalentQualificationTable({
//   rows,
//   minimumCompeten5cyQualified,
//   minimumPmsQualified,
//   minimumAkhlakQualified,
//   minimumLearningAgilityQualified
// }) {
//   const columns = [
//     { field: 'id', headerName: 'No', width: 70 },
//     { field: 'Nama', headerName: 'Nama', width: 130 },
//     { field: 'Nippos', headerName: 'NIPPOS', width: 130 },
//     { field: 'Posisi', headerName: 'Posisi', width: 130 },
//     { field: 'Job Level', headerName: 'Job Level', width: 130 },
//     { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 130 },
//     { field: 'Nama Kantor', headerName: 'Kantor', width: 130 },
//     { field: 'Komite Unit', headerName: 'Komite Unit', width: 130 },
//     {
//       field: 'Competency/Psychotest',
//       headerName: 'Competency/Psychotest',
//       width: 180,
//       renderCell: (params) => {
//         const { color, backgroundColor } = getColorStyle(params.value, minimumCompeten5cyQualified);
//         return (
//           <div>
//             <span
//               style={{
//                 color,
//                 backgroundColor,
//                 padding: '4px 8px',
//                 borderRadius: '24px'
//               }}
//             >
//               {params.value}
//             </span>
//           </div>
//         );
//       }
//     },
//     {
//       field: 'PMS',
//       headerName: 'PMS',
//       width: 180,
//       renderCell: (params) => {
//         const { color, backgroundColor } = getColorStyle(params.value, minimumPmsQualified);
//         return (
//           <div>
//             <span
//               style={{
//                 color,
//                 backgroundColor,
//                 padding: '4px 8px',
//                 borderRadius: '24px'
//               }}
//             >
//               {params.value}
//             </span>
//           </div>
//         );
//       }
//     },
//     {
//       field: 'AKHLAK',
//       headerName: 'AKHLAK',
//       width: 180,
//       renderCell: (params) => {
//         const { color, backgroundColor } = getColorStyle(params.value, minimumAkhlakQualified);
//         return (
//           <div>
//             <span
//               style={{
//                 color,
//                 backgroundColor,
//                 padding: '4px 8px',
//                 borderRadius: '24px'
//               }}
//             >
//               {params.value}
//             </span>
//           </div>
//         );
//       }
//     },
//     {
//       field: 'Learning Agility',
//       headerName: 'Learning Agility',
//       width: 180,
//       renderCell: (params) => {
//         const { color, backgroundColor } = getColorStyle(params.value, minimumLearningAgilityQualified);
//         return (
//           <div>
//             <span
//               style={{
//                 color,
//                 backgroundColor,
//                 padding: '4px 8px',
//                 borderRadius: '24px'
//               }}
//             >
//               {params.value}
//             </span>
//           </div>
//         );
//       }
//     }
//   ];

//   return (
//     <div style={{ height: 400, width: '100%', overflow: 'hidden' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 }
//           }
//         }}
//         pageSizeOptions={[5, 10]}
//         sx={{
//           borderRadius: '12px', // Apply border radius to the DataGrid itself
//           '& .MuiDataGrid-main': {
//             borderRadius: '12px' // Apply border radius to the main container
//           },
//           '& .MuiDataGrid-columnHeader': {
//             backgroundColor: '#F5F5F5', // Apply background color to each header cell
//             padding: '0 24px' // Apply horizontal padding to each header cell
//           },
//           '& .MuiDataGrid-cell': {
//             padding: '0 24px' // Apply horizontal padding to each header cell
//           },
//           '& .MuiDataGrid-columnHeaderCheckbox, .MuiDataGrid-cellCheckbox': {
//             padding: '0 0px' // Adjust padding for the checkbox cells
//           }
//         }}
//       />
//     </div>
//   );
// }

import { useState } from 'react';
import * as React from 'react';
import { Pagination, Stack, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import FilterButton from '../../ui-component/button/FilterButton';

const getColorStyle = (value, minimumValueQualified) => {
  let color, backgroundColor;
  if (value < minimumValueQualified) {
    color = '#F44336';
    backgroundColor = '#FFEDED';
  } else {
    color = '#66BB6A';
    backgroundColor = '#F5FFF5';
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

export default function TalentQualificationTable({
  rows,
  minimumCompeten5cyQualified,
  minimumPmsQualified,
  minimumAkhlakQualified,
  minimumLearningAgilityQualified,
  caption
}) {
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

  return (
    <div>
      {
        rows.length > 0 ? (
          <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell >No</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 150 }}>Nama</StyledTableCell >
                    <StyledTableCell >NIPPOS</StyledTableCell >
                    <StyledTableCell sx={{ minWidth: 250 }}>Posisi</StyledTableCell >
                    <StyledTableCell >Job Level</StyledTableCell >
                    <StyledTableCell sx={{ width: calculateColumnWidth(rows, 'jobfam', 'Job Family') }}>Rumpun Jabatan</StyledTableCell >
                    <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'Kantor', 'Nama Kantor') }}>Kantor</StyledTableCell >
                    <StyledTableCell >Komite Unit</StyledTableCell >
                    <StyledTableCell >Competency/Psychotest</StyledTableCell >
                    <StyledTableCell >PMS</StyledTableCell >
                    <StyledTableCell >AKHLAK</StyledTableCell >
                    <StyledTableCell >Learning Agility</StyledTableCell >
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(startIndex, endIndex).map((row) => (
                    <TableRow key={row.id}>
                      <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{row.id}</StyledTableCell>
                      <StyledTableCell>{row.Nama}</StyledTableCell>
                      <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{row.Nippos}</StyledTableCell>
                      <StyledTableCell>{row.Posisi}</StyledTableCell>
                      <StyledTableCell sx={{ textAlign: 'center' }}>{row['Job Level']}</StyledTableCell>
                      <StyledTableCell>{row['Rumpun Jabatan']}</StyledTableCell>
                      <StyledTableCell>{row['Nama Kantor']}</StyledTableCell>
                      <StyledTableCell >{row['Komite Unit']}</StyledTableCell>
                      <StyledTableCell style={{ textAlign: "center" }}>
                        <div
                          style={{
                            display: 'inline-block',
                            ...getColorStyle(row['Competency/Psychotest'], minimumCompeten5cyQualified),
                            padding: '4px 8px',
                            borderRadius: '24px'
                          }}
                        >
                          {row['Competency/Psychotest']}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell style={{ textAlign: "center" }}>
                        <div
                          style={{
                            display: 'inline-block',
                            ...getColorStyle(row.PMS, minimumPmsQualified),
                            padding: '4px 8px',
                            borderRadius: '24px'
                          }}
                        >
                          {row.PMS}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell style={{ textAlign: "center" }}>
                        <div
                          style={{
                            display: 'inline-block',
                            ...getColorStyle(row.AKHLAK, minimumAkhlakQualified),
                            padding: '4px 8px',
                            borderRadius: '24px'
                          }}
                        >
                          {row.AKHLAK}
                        </div>
                      </StyledTableCell>
                      <StyledTableCell style={{ textAlign: "center" }}>
                        <div
                          style={{
                            display: 'inline-block',
                            ...getColorStyle(row['Learning Agility'], minimumLearningAgilityQualified),
                            padding: '4px 8px',
                            borderRadius: '24px'
                          }}
                        >
                          {row['Learning Agility']}
                        </div>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell >No</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 150 }}>Nama</StyledTableCell >
                    <StyledTableCell >NIPPOS</StyledTableCell >
                    <StyledTableCell sx={{ minWidth: 250 }}>Posisi</StyledTableCell >
                    <StyledTableCell >Job Level</StyledTableCell >
                    <StyledTableCell sx={{ width: calculateColumnWidth(rows, 'jobfam', 'Job Family') }}>Rumpun Jabatan</StyledTableCell >
                    <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'Kantor', 'Nama Kantor') }}>Kantor</StyledTableCell >
                    <StyledTableCell >Komite Unit</StyledTableCell >
                    <StyledTableCell >Competency/Psychotest</StyledTableCell >
                    <StyledTableCell >PMS</StyledTableCell >
                    <StyledTableCell >AKHLAK</StyledTableCell >
                    <StyledTableCell >Learning Agility</StyledTableCell >
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
              {caption}
            </Typography>
          </div>
        )
      }

      {rows.length > 0 && (
        <Stack spacing={2} direction="row" marginTop={2}>
          <Pagination
            count={Math.ceil(rows.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary" />
          <div style={{ flex: '1' }}> </div>
          <FilterButton itemsPerPage={itemsPerPage} setItemsPerPage={handleItemsPerPageChange} />
        </Stack>
      )}

    </div>
  );
}