// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';

// const getStatusStyle = (status) => {
//   let color, backgroundColor;
//   switch (status) {
//     case 'Turun':
//       color = '#F44336';
//       backgroundColor = '#FFEDED';
//       break;
//     case 'Naik':
//       color = '#66BB6A';
//       backgroundColor = '#F5FFF5';
//       break;
//     case 'Tetap':
//       color = '#2196F3';
//       backgroundColor = '#EAF8FF';
//       break;
//     default:
//       color = '#000000';
//       backgroundColor = 'transparent';
//   }
//   return { color, backgroundColor };
// };

// const getKategoriMatrixStyle = () => (params) => (
//   <div>
//     <span style={{ 
//       color: '#2196F3', 
//       backgroundColor: params.value ? '#EAF8FF' : 'transparent', 
//       padding: '4px 8px', 
//       borderRadius: '24px' 
//     }}>{params.value}</span>
//   </div>
// );
  
// const columns = [
//   { field: 'id', headerName: 'No', width: 70 },
//   { field: 'nama', headerName: 'Nama', width: 130 },
//   { field: 'nippos', headerName: 'NIPPOS', width: 130 },
//   { field: 'Posisi', headerName: 'Posisi', width: 130 },
//   { field: 'Job Level', headerName: 'Job Level', width: 130 },
//   { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 130 },
//   { field: 'Nama Kantor', headerName: 'Kantor', width: 130 },
//   { field: 'Komite Unit', headerName: 'Komite Unit', width: 130 },
//   { field: 'Matriks Kategori Awal', headerName: 'Kategori Matrix Awal', width: 180, renderCell: getKategoriMatrixStyle() },
//   { field: 'Matriks Kategori Akhir', headerName: 'Kategori Matrix Akhir', width: 180, renderCell: getKategoriMatrixStyle() },
//   {
//     field: 'status',
//     headerName: 'Status',
//     width: 130,
//     renderCell: (params) => {
//       const { color, backgroundColor } = getStatusStyle(params.value);
//       return (
//       <div>
//         <span style={{ 
//         color,
//         backgroundColor,
//         padding: '4px 8px',
//         borderRadius: '24px' 
//         }}>{params.value}</span>
//       </div>
//       );
//     },
//   },
//   {
//     field: 'reason', headerName: 'Alasan Perubahan', width: 180
//     },
// ];


// export default function TalentClusterTable({
//   rows
// }) {
//   return (
//     <div style={{ height: 400, width: '100%', overflow: 'hidden' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
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
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import FilterButton from '../../ui-component/button/FilterButton';

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


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
    // height: '60px',
  },
}));

const getStatusStyle = (status) => {
  let color, backgroundColor;
  switch (status) {
    case 'Turun':
      color = '#F44336';
      backgroundColor = '#FFEDED';
      break;
    case 'Naik':
      color = '#66BB6A';
      backgroundColor = '#F5FFF5';
      break;
    case 'Tetap':
      color = '#2196F3';
      backgroundColor = '#EAF8FF';
      break;
    default:
      color = '#000000';
      backgroundColor = 'transparent';
  }
  return { color, backgroundColor };
};

const getKategoriMatrixStyle = (value) => {
  return (
    <span style={{ 
      color: '#2196F3', 
      backgroundColor: value ? '#EAF8FF' : 'transparent', 
      padding: '4px 8px', 
      borderRadius: '24px' 
    }}>{value}</span>
  );
};
  

export default function TalentClusterTable({rows}) {
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
      <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell >No</StyledTableCell>
              <StyledTableCell >Nama</StyledTableCell>
              <StyledTableCell >Nippos</StyledTableCell>
              <StyledTableCell >Posisi</StyledTableCell>
              <StyledTableCell >Job Level</StyledTableCell>
              <StyledTableCell >Rumpun Jabatan</StyledTableCell>
              <StyledTableCell >Kantor</StyledTableCell>
              <StyledTableCell >Komite Unit</StyledTableCell>
              <StyledTableCell >Kategori Matrix Awal</StyledTableCell>
              <StyledTableCell >Kategori Matrix Akhir</StyledTableCell>
              <StyledTableCell >Status</StyledTableCell>
              <StyledTableCell >Alasan Perubahan</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {rows.slice(startIndex, endIndex).map((row) => {
            const { color, backgroundColor } = getStatusStyle(row.status);
            return (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell>{row.nama}</StyledTableCell>
                <StyledTableCell>{row.nippos}</StyledTableCell>
                <StyledTableCell>{row.Posisi}</StyledTableCell>
                <StyledTableCell>{row['Job Level']}</StyledTableCell>
                <StyledTableCell>{row['Rumpun Jabatan']}</StyledTableCell>
                <StyledTableCell>{row['Nama Kantor']}</StyledTableCell>
                <StyledTableCell>{row['Komite Unit']}</StyledTableCell>
                <StyledTableCell>{getKategoriMatrixStyle(row['Matriks Kategori Awal'])}</StyledTableCell>
                <StyledTableCell>{getKategoriMatrixStyle(row['Matriks Kategori Akhir'])}</StyledTableCell>
                <StyledTableCell>
                  <div>
                    <span style={{ 
                      color, 
                      backgroundColor, 
                      padding: '4px 8px', 
                      borderRadius: '24px' 
                    }}>{row.status}
                    </span>
                  </div>
                </StyledTableCell>
                <StyledTableCell>{row.reason}</StyledTableCell>
              </StyledTableRow>
            );
          })}
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
