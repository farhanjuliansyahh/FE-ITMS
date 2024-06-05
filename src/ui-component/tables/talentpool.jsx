// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { CreateOutlined } from '@mui/icons-material/';
// import ButtonPrimary from '../button/ButtonPrimary';
// import UbahStatusTalent from '../modal/ubah-status-talent';

// export default function TalentPool({ rows, eventid, updaterows, eventstatus_id }) {
//   const [ubahStatusOpen, setUbahStatusOpen] = useState(false);
//   const [selectedNippos, setSelectedNippos] = useState(null); 

//   const handleUbahStatusOpen = (nippos) => {
//     setSelectedNippos(nippos);
//     setUbahStatusOpen(true);
//   };

//   const columns = [
//     { field: 'id', headerName: 'No', width: 70 },
//     { field: 'Nama', headerName: 'Nama', width: 180 },
//     { field: 'Nippos', headerName: 'NIPPOS', width: 180 },
//     { field: 'Posisi', headerName: 'Posisi', width: 180 },
//     { field: 'Job Level', headerName: 'Job Level', width: 180 },
//     { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 180 },
//     { field: 'Nama Kantor', headerName: 'Kantor', width: 180 },
//     { field: 'Kategori Matrix Akhir', headerName: 'Kategori Matrix Akhir', width: 180 },
//     { field: 'Status', headerName: 'Status', width: 180 },
//     { field: 'aksi', headerName: 'Aksi', width: 320, 
//     renderCell: (params) => {
//       return (
//         <>
//           <ButtonPrimary
//               icon={CreateOutlined}
//               LabelName={'Ubah Status'}
//               padding={'6px 16px'}
//               onClick={() => handleUbahStatusOpen(params.row.Nippos)}
//               disabled={eventstatus_id !== 7}
//             />
//         </>
//       );
//     },
//     },
//   ];
  
//   return (
//     <div style={{ height: 400, width: '100%', overflow: 'hidden'}}>
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

//       <UbahStatusTalent
//         open={ubahStatusOpen}
//         handleClose={() => {
//           // confirm()
//           setUbahStatusOpen(false);
//           setSelectedNippos(null); // Reset selected nippos when closing modal
//           updaterows()
//         }}
//         nippos={selectedNippos} // Pass selected nippos as prop
//         eventid={eventid}
//       />
//     </div>
//   );
// }

import * as React from 'react';
import { useEffect, useState } from 'react';
import { CreateOutlined } from '@mui/icons-material/';
import ButtonPrimary from '../button/ButtonPrimary';
import UbahStatusTalent from '../modal/ubah-status-talent';
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

export default function TalentPool({ rows, eventid, updaterows, eventstatus_id }) {
  const [ubahStatusOpen, setUbahStatusOpen] = useState(false);
  const [selectedNippos, setSelectedNippos] = useState(null);

  const handleUbahStatusOpen = (nippos) => {
    setSelectedNippos(nippos);
    setUbahStatusOpen(true);
  };
  
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
              <StyledTableCell style={{ padding: '0 24px' }}>No</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Nama</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Nippos</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Posisi</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Job Level</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Rumpun Jabatan</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Kantor</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Kategori Matrix Akhir</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Status</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
           {rows.slice(startIndex, endIndex).map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell>{row.Nama}</StyledTableCell>
                <StyledTableCell>{row.Nippos}</StyledTableCell>
                <StyledTableCell>{row.Posisi}</StyledTableCell>
                <StyledTableCell>{row['Job Level']}</StyledTableCell>
                <StyledTableCell>{row['Rumpun Jabatan']}</StyledTableCell>
                <StyledTableCell>{row['Nama Kantor']}</StyledTableCell>
                <StyledTableCell>{row['Kategori Matrix Akhir']}</StyledTableCell>
                <StyledTableCell>{row.Status}</StyledTableCell>
                <StyledTableCell>
                  <ButtonPrimary
                    icon={CreateOutlined}
                    LabelName={'Ubah Status'}
                    padding={'6px 16px'}
                    onClick={() => handleUbahStatusOpen(row.Nippos)}
                    disabled={eventstatus_id !== 7}
                  />
                </StyledTableCell>
                
              </StyledTableRow>
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
      <UbahStatusTalent
        open={ubahStatusOpen}
        handleClose={() => {
          // confirm()
          setUbahStatusOpen(false);
          setSelectedNippos(null); // Reset selected nippos when closing modal
          updaterows();
        }}
        nippos={selectedNippos} // Pass selected nippos as prop
        eventid={eventid}
      />
    </div>
  );
}
