// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Button from '@mui/material/Button';
// import ButtonErrorOutlined from '../../ui-component/button/ButtonErrorOutlined'
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import HapusDataBPJ from '../../ui-component/modal/hapus-data-bpj';

// export default function TalentDaysBPJTable({
//     eventid,
//     rows,
//     searchNama, // Receive the search term as a prop
//     searchNippos,
//     confirm,
//     disabled
//  }) {
//   const filteredRows = rows.filter((row) => {
//     const namaMatch = !searchNama || (row.nama && row.nama.toLowerCase().includes(searchNama.toLowerCase())); // Add null check for row.nama
//     const nipposMatch = !searchNippos || (row.nippos && row.nippos.toLowerCase().includes(searchNippos.toLowerCase())); // Add null check for row.nippos

//     return (!searchNama || namaMatch)
//     && (!searchNippos || nipposMatch);
//   });

//   const resetRowIndex = (filteredRows) => {
//     return filteredRows.map((row, index) => ({
//       ...row,
//       id: index + 1, // Adding 1 to start the index from 1 instead of 0
//     }));
//   };

//   const resetRows = resetRowIndex(filteredRows);

//   const [HapusBPJOpen, setHapusBPJOpen] = useState(false);
//   const [selectedNippos, setSelectedNippos] = useState(null); // State to store selected nippos

//   useEffect(() => {
//   }, [selectedNippos]); // Run this effect whenever selectedNippos changes

//   const handleHapusBPJOpen = (nippos) => {
//     setSelectedNippos(nippos);
//     setHapusBPJOpen(true);
//   };

//   const handleHapusBPJClose = () => {
//     setHapusBPJOpen(false);
//   };

//   const columns = [
//     { field: 'id', headerName: 'No', width: 90 },
//     { field: 'nama', headerName: 'Nama', width: 400 },
//     { field: 'nippos', headerName: 'Nippos', width: 150 },
//     { field: 'Posisi', headerName: 'Posisi', width: 600 },
//     {
//       field: 'aksi',
//       headerName: 'Aksi',
//       width: 160,
//       renderCell: (params) => {
//         return (
//           <ButtonErrorOutlined
//               icon={DeleteOutlineOutlinedIcon}
//               LabelName={'Hapus'}
//               padding={'6px 16px'}
//               onClick={() => handleHapusBPJOpen(params.row.nippos)}
//               disabled={disabled}
//               />
//         );
//       },
//     },
//   ];

//   return (
//     <div style={{ height: 400, width: '100%', overflow: 'hidden' }}>
//       <DataGrid
//         rows={resetRows}
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
//         }}
//       />
//       <HapusDataBPJ
//         open={HapusBPJOpen}
//         handleClose={() => {
//           confirm()
//           setHapusBPJOpen(false);
//           setSelectedNippos(null); // Reset selected nippos when closing modal
//         }}
//         nippos={selectedNippos} // Pass selected nippos as prop
//       />
//     </div>
//   );
// }

import * as React from 'react';
import { useEffect, useState } from 'react';
import ButtonErrorOutlined from '../../ui-component/button/ButtonErrorOutlined.jsx';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HapusDataBPJ from '../../ui-component/modal/hapus-data-bpj.jsx';
import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import FilterButton from '../../ui-component/button/FilterButton.jsx';

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
    border: 0
  }
}));
const ButtonContainer = styled('div')({
  whiteSpace: 'nowrap',
});

export default function TalentDaysBPJTable({
  eventid,
  rows,
  searchNama, // Receive the search term as a prop
  searchNippos,
  confirm,
  disabled
}) {

  const initialDataLength = rows.length;
  const noResultsCaption = "Maaf, tidak ada hasil yang sesuai dengan pencarian Anda.\nCoba periksa ejaan kata kunci";

  const filteredRows = rows.filter((row) => {
    const namaMatch = !searchNama || (row.nama && row.nama.toLowerCase().includes(searchNama.toLowerCase())); // Add null check for row.nama
    const nipposMatch = !searchNippos || (row.nippos && row.nippos.toLowerCase().includes(searchNippos.toLowerCase())); // Add null check for row.nippos

    return (!searchNama || namaMatch) && (!searchNippos || nipposMatch);
  });

  const resetRowIndex = (filteredRows) => {
    return filteredRows.map((row, index) => ({
      ...row,
      id: index + 1 // Adding 1 to start the index from 1 instead of 0
    }));
  };

  const resetRows = resetRowIndex(filteredRows);

  const [HapusBPJOpen, setHapusBPJOpen] = useState(false);
  const [selectedNippos, setSelectedNippos] = useState(null); // State to store selected nippos

  useEffect(() => { }, [selectedNippos]); // Run this effect whenever selectedNippos changes

  const handleHapusBPJOpen = (nippos) => {
    setSelectedNippos(nippos);
    setHapusBPJOpen(true);
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
      {
        resetRows.length === 0 && initialDataLength !== resetRows.length ? (
          <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ minWidth: 'auto' }}>No</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 'auto' }}>Nama</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 'auto' }}>Nippos</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 'auto' }}>Posisi</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 'auto' }}>Aksi</StyledTableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', whiteSpace: 'pre-line', textAlign: 'center' }}>
              {noResultsCaption}
            </Typography>
          </div>
        ) : (
          <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ minWidth: 'auto' }}>No</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 'auto' }}>Nama</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 'auto' }}>Nippos</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 'auto' }}>Posisi</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 'auto' }}>Aksi</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {resetRows.slice(startIndex, endIndex).map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{row.id}</StyledTableCell>
                      <StyledTableCell >{row.nama}</StyledTableCell>
                      <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{row.nippos}</StyledTableCell>
                      <StyledTableCell >{row.Posisi}</StyledTableCell>
                      <StyledTableCell >
                        <ButtonContainer >
                          <ButtonErrorOutlined
                            icon={DeleteOutlineOutlinedIcon}
                            LabelName={'Hapus'}
                            padding={'6px 16px'}
                            onClick={() => handleHapusBPJOpen(row.nippos)}
                            disabled={disabled}
                          />
                        </ButtonContainer>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )
      }

      {resetRows.length > 0 && (
        <Stack spacing={2} direction="row">
          <Pagination
            count={Math.ceil(filteredRows.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary" />
          <div style={{ flex: '1' }}> </div>
          <FilterButton itemsPerPage={itemsPerPage} setItemsPerPage={handleItemsPerPageChange} />
        </Stack>
      )}

      <HapusDataBPJ
        open={HapusBPJOpen}
        handleClose={() => {
          confirm();
          setHapusBPJOpen(false);
          setSelectedNippos(null); // Reset selected nippos when closing modal
        }}
        nippos={selectedNippos} // Pass selected nippos as prop
      />
    </div>
  );
}
