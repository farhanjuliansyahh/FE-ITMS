import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import {Pagination, Button, Dialog, Stack, Paper, 
  Table, TableBody, TableCell, TableContainer,TableHead, TableRow,
  DialogContent, DialogActions, Checkbox, FormControlLabel } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ButtonPrimary from '../../ui-component/button/ButtonPrimary';
import ButtonErrorOutlined from '../../ui-component/button/ButtonErrorOutlined';
import FilterButton from '../../ui-component/button/FilterButton';
import { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F5F5F5',
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    minHeight: 20,
    fontWeight: 400,
    verticalAlign: 'center',
  },
}));

const peranOptions = ['Admin Talent', 'Karyawan', 'Ketua Komite Talent', 'Komite Unit', 'Super Admin', 'Admin HCBP'];

const ActionButton = ({ row, onSave }) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      setSelectedOptions(row.Peran ? row.Peran.split(', ').map((role) => role.trim()) : []);
    }
  }, [open, row.Peran]);

  const handleCheckboxChange = (option) => (event) => {
    if (event.target.checked) {
      setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, option]);
    } else {
      setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((item) => item !== option));
    }
  };

  const postTalentPool = async (nippos, selectedRole) => {
    try {
      const response = await fetch(`http://localhost:4000/updaterolemanagement`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nippos: nippos,
          updatedRoles: selectedRole
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const handleSavePeran = async () => {
    await postTalentPool(row.nippos, selectedOptions);
    onSave(row.id, selectedOptions); // Update the parent state with the new roles
    setOpen(false);
    setSelectedOptions([]);
  };

  return (
    <>
      <Button variant="contained" color="primary" size="small" onClick={handleButtonClick}>
        Ubah Akses
      </Button>
      <Dialog open={open} onClose={handleModalClose}>
        <Stack direction="row" alignItems="center" marginTop="12px" marginLeft='10px'>
          <h2 style={{ paddingLeft: '24px', color: '#1F1F1F' }} justifyContent="start">
            Daftar Peran Pengguna
          </h2>
          <Button onClick={handleModalClose} color="primary" justifyContent="end" style={{ color: '#D32F2F', marginLeft: '95px' }}>
            <CloseIcon />
          </Button>
        </Stack>

        <DialogContent style={{ width: '400px', maxHeight: '300px', overflowY: 'auto' }}>
        <div style={{
            marginLeft:'35px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr', // Creates 2 columns
            columnGap: '8px', // Adds space between columns
            gap: '4px' // Optional: Adds space between grid items
          }}>
          {peranOptions.map((option, index) => (
            <FormControlLabel
            style={{
              display: 'flex',
              justifyContent: 'flex-start', // Corrected to camelCase
              width: '100%' // Corrected to use string value
            }}
              key={index}
              control={<Checkbox checked={selectedOptions.includes(option)} onChange={handleCheckboxChange(option)} />}
              label={option}
            />
          ))}
          </div>
        </DialogContent>
        <DialogActions style={{ paddingBottom: '24px', paddingRight: '24px', }}>
          <ButtonPrimary
              onClick={handleSavePeran}
              Color="#ffffff"
              icon={SaveOutlinedIcon}
              LabelName={'Simpan'}
            />
          {/* <Button
            onClick={handleSavePeran}
            variant="contained"
            endIcon={<SaveOutlinedIcon />}
            sx={{
              color: '#ffffff',
              backgroundColor: '#1C2D5A',
              borderRadius: '12px',
              fontSize: '14px',
              padding: '8px 18px',
              boxShadow: 'none',
              width: '110px',
              height: '40px'
            }}
          >
            Simpan
          </Button> */}
          <ButtonErrorOutlined  
          onClick={handleModalClose} 
          Color="#D32F2F" 
          icon={HighlightOffOutlinedIcon} 
          LabelName={'Batalkan'} />
          {/* <Button
            onClick={handleModalClose}
            endIcon={<HighlightOffOutlinedIcon />}
            sx={{
              color: '#D32F2F',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              fontSize: '14px',
              padding: '8px 18px',
              boxShadow: 'none',
              width: '110px',
              height: '40px',
              border: '1.5px solid #D32F2F'
            }}
          >
            Batalkan
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function DaftarPenggunaTabel({
  rows,
  searchNama,
  searchNippos,
  searchPeran,
  onFilteredData // Receive the callback function
}) {
  const [updatedRows, setUpdatedRows] = useState([]);

  useEffect(() => {
    setUpdatedRows(rows);
  }, [rows]);

  const handleSave = (id, newRoles) => {
    setUpdatedRows((prevRows) => prevRows.map((row) => (row.id === id ? { ...row, Peran: newRoles.join(', ') } : row)));
  };

  const calculateColumnWidth = (data, accessor, headerText) => {
    const maxLength = Math.max(...data.map((item) => (item[accessor] ? item[accessor].toString().length : 0)), headerText.length);
    return maxLength * 11; // Adjust multiplier as needed
  };

  const columns = [
    { field: 'id', headerName: 'No', width: 60 },
    { field: 'nama', headerName: 'Nama', width: 300 },
    { field: 'nippos', headerName: 'Nippos', width: 150 },
    { field: 'posisi', headerName: 'Posisi', width: 500 },
    { field: 'jobfam', headerName: 'Job Family', width: calculateColumnWidth(rows, 'jobfam', 'Job Family') },
    { field: 'joblevel', headerName: 'Job Level', width: calculateColumnWidth(rows, 'joblevel', 'Job Level') },
    { field: 'Peran', headerName: 'Peran', width: calculateColumnWidth(rows, 'Peran', 'Peran') },
    {
      field: 'Aksi',
      headerName: 'Aksi',
      width: 150,
      renderCell: (params) => <ActionButton row={params.row} onSave={handleSave} />
    }
  ];

  //fungsi buat reset index:
  const resetRowIndex = (filteredRows) => {
    return filteredRows.map((row, index) => ({
      ...row,
      id: index + 1 // Adding 1 to start the index from 1 instead of 0
    }));
  };

  // Filter the rows based on selected filters and search term
  const filteredRows = updatedRows.filter((row) => {
    const namaMatch = !searchNama || (row.nama && row.nama.toLowerCase().includes(searchNama.toLowerCase()));
    const nipposMatch = !searchNippos || (row.nippos && row.nippos.toLowerCase().includes(searchNippos.toLowerCase()));
    const peranMatch = !searchPeran || (row.Peran && row.Peran.toLowerCase().includes(searchPeran.toLowerCase()));

    return (!searchNama || namaMatch) && (!searchNippos || nipposMatch) && (!searchPeran || peranMatch);
  });

  //buat constanta yang isinya hasil filter yang indexnya udah di reset:
  const resetRows = resetRowIndex(filteredRows);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1); // Reset page to 1 when changing items per page
  };


  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    onFilteredData(resetRows);
  }, [resetRows, onFilteredData]);
  return (
    <div>
      <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px'}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: 60}}>No </StyledTableCell>
                <StyledTableCell sx={{ width: 300}}>Nama</StyledTableCell>
                <StyledTableCell sx={{ width: 150}}>NIPPOS</StyledTableCell>
                <StyledTableCell sx={{ width: 500}}>Posisi</StyledTableCell>
                <StyledTableCell sx={{ width: calculateColumnWidth(rows, 'jobfam', 'Job Family')}}>Job Family</StyledTableCell>
                <StyledTableCell sx={{ width: calculateColumnWidth(rows, 'joblevel', 'Job Level')}}>Job Level</StyledTableCell>
                <StyledTableCell sx={{ width: calculateColumnWidth(rows, 'Peran', 'Peran')}}>Peran</StyledTableCell>
                <StyledTableCell sx={{ width: 240}}>Aksi</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resetRows.slice(startIndex, endIndex).map((row) => (
                <TableRow key={row.id}>
                  <StyledTableCell>{row.id}</StyledTableCell>
                  <StyledTableCell>{row.nama}</StyledTableCell>
                  <StyledTableCell>{row.nippos}</StyledTableCell>
                  <StyledTableCell>{row.posisi}</StyledTableCell>
                  <StyledTableCell>{row.jobfam}</StyledTableCell>
                  <StyledTableCell>{row.joblevel}</StyledTableCell>
                  <StyledTableCell>{row.Peran}</StyledTableCell>
                  <StyledTableCell>
                     <ActionButton row={row} onSave={handleSave}/>
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Stack spacing={2} direction="row">
        <Pagination
          count={Math.ceil(filteredRows.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary" />
        <div style={{ flex: '1' }}> </div>
        <FilterButton itemsPerPage={itemsPerPage} setItemsPerPage={handleItemsPerPageChange} />
      </Stack>
    </div>
  );

  // return (
  //   <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
  //     <DataGrid
  //       rows={resetRows}
  //       columns={columns}
  //       pageSizeOptions={[5, 10]}
  //       initialState={{
  //         pagination: {
  //           paginationModel: { pageSize: 5, page: 0 } // Setting the default page size to 5
  //         }
  //       }}
  //       sx={{
  //         borderRadius: '12px', // Apply border radius to the DataGrid itself
  //         '& .MuiDataGrid-main': {
  //           borderRadius: '12px', // Apply border radius to the main container
  //         },
  //         '& .MuiDataGrid-columnHeader': {
  //           backgroundColor: '#F5F5F5', // Apply background color to each header cell
  //           padding: '0 24px', // Apply horizontal padding to each header cell
  //         },
  //         '& .MuiDataGrid-cell': {
  //           padding: '0 24px', // Apply horizontal padding to each header cell
  //         },
  //       }}
  //     />
  //   </div>
  // );
}
