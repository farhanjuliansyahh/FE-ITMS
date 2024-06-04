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
import { styled } from '@mui/material/styles';
import {Pagination, Stack, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody} from '@mui/material';
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
    whiteSpace: 'nowrap'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    minHeight: 20,
    fontWeight: 400,
    verticalAlign: 'center',
  },
}));

export default function TalentQualificationTable({
  rows,
  minimumCompeten5cyQualified,
  minimumPmsQualified,
  minimumAkhlakQualified,
  minimumLearningAgilityQualified
}) {
  const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'Nama', headerName: 'Nama', width: 130 },
    { field: 'Nippos', headerName: 'NIPPOS', width: 130 },
    { field: 'Posisi', headerName: 'Posisi', width: 130 },
    { field: 'Job Level', headerName: 'Job Level', width: 130 },
    { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 130 },
    { field: 'Nama Kantor', headerName: 'Kantor', width: 130 },
    { field: 'Komite Unit', headerName: 'Komite Unit', width: 130 },
    {
      field: 'Competency/Psychotest',
      headerName: 'Competency/Psychotest',
      width: 180,
      renderCell: (params) => {
        const { color, backgroundColor } = getColorStyle(params.value, minimumCompeten5cyQualified);
        return (
          <div>
            <span
              style={{
                color,
                backgroundColor,
                padding: '4px 8px',
                borderRadius: '24px'
              }}
            >
              {params.value}
            </span>
          </div>
        );
      }
    },
    {
      field: 'PMS',
      headerName: 'PMS',
      width: 180,
      renderCell: (params) => {
        const { color, backgroundColor } = getColorStyle(params.value, minimumPmsQualified);
        return (
          <div>
            <span
              style={{
                color,
                backgroundColor,
                padding: '4px 8px',
                borderRadius: '24px'
              }}
            >
              {params.value}
            </span>
          </div>
        );
      }
    },
    {
      field: 'AKHLAK',
      headerName: 'AKHLAK',
      width: 180,
      renderCell: (params) => {
        const { color, backgroundColor } = getColorStyle(params.value, minimumAkhlakQualified);
        return (
          <div>
            <span
              style={{
                color,
                backgroundColor,
                padding: '4px 8px',
                borderRadius: '24px'
              }}
            >
              {params.value}
            </span>
          </div>
        );
      }
    },
    {
      field: 'Learning Agility',
      headerName: 'Learning Agility',
      width: 180,
      renderCell: (params) => {
        const { color, backgroundColor } = getColorStyle(params.value, minimumLearningAgilityQualified);
        return (
          <div>
            <span
              style={{
                color,
                backgroundColor,
                padding: '4px 8px',
                borderRadius: '24px'
              }}
            >
              {params.value}
            </span>
          </div>
        );
      }
    }
  ];
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
    <div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, borderRadius: '12px', overflow: 'hidden' }}>
        <TableHead>
          <TableRow>
            <th>No</th>
            <th >Nama</th >
            <th >NIPPOS</th >
            <th >Posisi</th >
            <th >Job Level</th >
            <th >Rumpun Jabatan</th >
            <th >Kantor</th >
            <th >Komite Unit</th >
            <th >Competency/ Psychotest</th >
            <th >PMS</th >
            <th >AKHLAK</th >
            <th >Learning Agility</th >
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(startIndex, endIndex).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.Nama}</TableCell>
              <TableCell>{row.Nippos}</TableCell>
              <TableCell>{row.Posisi}</TableCell>
              <TableCell>{row['Job Level']}</TableCell>
              <TableCell>{row['Rumpun Jabatan']}</TableCell>
              <TableCell>{row['Nama Kantor']}</TableCell>
              <TableCell>{row['Komite Unit']}</TableCell>
              <TableCell>
                <div
                  style={{
                    ...getColorStyle(row['Competency/ Psychotest'], minimumCompeten5cyQualified),
                    padding: '4px 8px',
                    borderRadius: '24px'
                  }}
                >
                  {row['Competency/ Psychotest']}
                </div>
              </TableCell>
              <TableCell>
                <div
                  style={{
                    ...getColorStyle(row.PMS, minimumPmsQualified),
                    padding: '4px 8px',
                    borderRadius: '24px'
                  }}
                >
                  {row.PMS}
                </div>
              </TableCell>
              <TableCell>
                <div
                  style={{
                    ...getColorStyle(row.AKHLAK, minimumAkhlakQualified),
                    padding: '4px 8px',
                    borderRadius: '24px'
                  }}
                >
                  {row.AKHLAK}
                </div>
              </TableCell>
              <TableCell>
                <div
                  style={{
                    ...getColorStyle(row['Learning Agility'], minimumLearningAgilityQualified),
                    padding: '4px 8px',
                    borderRadius: '24px'
                  }}
                >
                  {row['Learning Agility']}
                </div>
              </TableCell>
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