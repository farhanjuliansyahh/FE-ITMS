import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from 'react';
import { Button, Dialog, Stack, DialogContent, DialogActions, Checkbox, FormControlLabel } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

const peranOptions = ['Admin Talent', 'Coach', 'Karyawan','Ketua Komite Talent','Komite Unit','Talent'];

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F5F5F5',
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: 600,
    border: 0
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    fontWeight: 400,
    minHeight: 20,
    verticalAlign: 'top'
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ActionButton = ({ row, updateRowPeran }) => {
    const [open, setOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
  
    const handleButtonClick = () => {
      setOpen(true);
    };
  
    const handleModalClose = () => {
      setOpen(false);
    };
  
    const handleCheckboxChange = (option) => (event) => {
      if (event.target.checked) {
        setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, option]);
      } else {
        setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((item) => item !== option));
      }
    };
  
    const handleSavePeran = () => {
      const updatedPeran = selectedOptions.join(', ');
      updateRowPeran(row.id, updatedPeran);
      setOpen(false);
      setSelectedOptions([]);
    };
  
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleButtonClick}
        >
          Ubah Akses
        </Button>
        <Dialog open={open} onClose={handleModalClose}>
          <Stack direction="row" alignItems="center" marginTop="10px">
            <h2 style={{paddingLeft : '20px', color:'#1F1F1F'}} justifyContent="start">Daftar Peran Pengguna</h2>
            <Button onClick={handleModalClose} color="primary" justifyContent="end" style={{color: '#D32F2F',marginLeft : '100px'}}>
              <CloseIcon/>
            </Button>
          </Stack>
          
          <DialogContent style={{ width: '400px', maxHeight: '300px', overflowY: 'auto' }}>
            {peranOptions.map((option, index) => (
              <FormControlLabel
                key={index}
                control={<Checkbox checked={selectedOptions.includes(option)} onChange={handleCheckboxChange(option)} />}
                label={option}
              />
            ))}
          </DialogContent>
          <DialogActions style={{paddingBottom: '12px', paddingRight: '12px'}}>
            <Button onClick={handleSavePeran}
            variant="contained"
            endIcon={<SaveOutlinedIcon/>}
            sx={{ 
              color:'#ffffff',  
              backgroundColor: '#1C2D5A', 
              borderRadius: '12px', 
              fontSize: '14px', // Custom font size
              padding: '8px 18px', // Custom padding using relative units
              boxShadow: 'none',
              width: '110px' || 'auto', // Set width (default: auto)
              height: '40px' || 'auto', // Set height (default: auto)
  
            }} >
              Save
            </Button>
            <Button onClick={handleModalClose}
             endIcon={<HighlightOffOutlinedIcon/>}
             sx={{ 
              color:'#D32F2F',  
              backgroundColor: '#ffffff', 
              borderRadius: '12px', 
              fontSize: '14px', // Custom font size
              padding: '8px 18px', // Custom padding using relative units
              boxShadow: 'none',
              width: '110px' || 'auto', // Set width (default: auto)
              height: '40px' || 'auto', // Set height (default: auto)
              border: '1.5px solid #D32F2F'
             }} >
              Batalkan
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

export default function DaftarPenggunaTabel2() {
  const [rows, setRows] = useState([
    { id: 1, nama: 'A', nippos: '998494371', posisi: 'Manajer Pengembangan Join Operation', jobfam: 'Bisnis', joblevel: 'D3', Peran: [] },
    { id: 2, nama: 'B', nippos: '998494372', posisi: 'Asisten Manajer Pengembangan Join Operation', jobfam: 'Bisnis', joblevel: 'D3', Peran: [] },
    { id: 3, nama: 'C', nippos: '998494373', posisi: 'Asisten Manajer Pengembangan Join Operation', jobfam: 'Bisnis', joblevel: 'D3', Peran: [] },
    { id: 4, nama: 'D', nippos: '998494374', posisi: 'Asisten Manajer Pengembangan Join Operation', jobfam: 'Bisnis', joblevel: 'D3', Peran: [] },
    { id: 5, nama: 'E', nippos: '998494375', posisi: 'Asisten Manajer Pengembangan Join Operation', jobfam: 'Bisnis', joblevel: 'D3', Peran: [] },
    { id: 6, nama: 'F', nippos: '998494376', posisi: 'Asisten Manajer Pengembangan Join Operation', jobfam: 'Bisnis', joblevel: 'D3', Peran: [] },
    { id: 7, nama: 'G', nippos: '998494377', posisi: 'Asisten Manajer Pengembangan Join Operation', jobfam: 'Bisnis', joblevel: 'D3', Peran: [] },
    { id: 8, nama: 'H', nippos: '998494378', posisi: 'Asisten Manajer Pengembangan Join Operation', jobfam: 'Bisnis', joblevel: 'D3', Peran: [] },
    // Add more rows here
  ]);

  const updateRowPeran = (rowId, peran) => {
    const updatedRows = rows.map(row => {
      if (row.id === rowId) {
        return { ...row, Peran: peran };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const columns = [
    { field: 'id', headerName: 'No', minWidth: 70 },
    { field: 'nama', headerName: 'Nama', minWidth: 130 },
    { field: 'nippos', headerName: 'Nippos', minWidth: 130 },
    { field: 'posisi', headerName: 'Posisi', minWidth: 130 },
    { field: 'jobfam', headerName: 'Job Family', minWidth: 130 },
    { field: 'joblevel', headerName: 'Job Level', minWidth: 130 },
    { field: 'Peran', headerName: 'Peran', minWidth: 200 },
    {
        field: 'Aksi',
        headerName: 'Aksi',
        minWidth: 130,
        renderCell: (params) => (
          <ActionButton row={params.row} updateRowPeran={updateRowPeran} />
        ),
    },
  ];

  return (
    <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px'}}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <StyledTableCell key={column.field}>{column.headerName}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.id}>
                {columns.map((column) => (
                  <StyledTableCell key={column.field}>{row[column.field]}</StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}