import React from 'react';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { SaveOutlined, CancelOutlined } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E0E0E0',
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: 600,
    border: 0
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 400,
    minHeight: 40,
  },
}));

export default function InputNilaiTalentDays({ open, handleClose }) {
    const [nilaiInput, setNilaiInput] = useState([]);

    // Sample data for the table
    const rows = [
        { no: 1, pertanyaan: 'Pertanyaan 1', nilai: '' },
        { no: 2, pertanyaan: 'Pertanyaan 2', nilai: '' },
        { no: 3, pertanyaan: 'Pertanyaan 3', nilai: '' },
        // Add more rows as needed
    ];

    const handleInputChange = (index, event) => {
        const values = [...nilaiInput];
        values[index] = event.target.value;
        setNilaiInput(values);
    };

    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

    const hoverBatalkanStyle = {
        backgroundColor: '#D32F2F',
        color: '#fff',
    };

    const batalkanButtonStyle = {
        border: '1px solid #EF4123',
        color: '#EF4123',
        borderRadius: '12px',
        padding: '14px 24px',
        transition: 'background-color 0.3s',
        fontSize: '14px'
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign: 'left', marginTop: '10px', marginBottom: '10px', lineHeight: '32px', letterSpacing: '0.5px' }}>
                    Daftar Nilai BPJ Karyawan
                </Typography>
            </DialogTitle>
            <DialogContent>
                <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '16px'}}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>No</StyledTableCell>
                                    <StyledTableCell>Pertanyaan</StyledTableCell>
                                    <StyledTableCell>Nilai</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <StyledTableCell>{row.no}</StyledTableCell>
                                        <StyledTableCell>{row.pertanyaan}</StyledTableCell>
                                        <StyledTableCell>
                                            <TextField
                                                value={nilaiInput[index] || ''}
                                                onChange={(event) => handleInputChange(index, event)}
                                                fullWidth
                                                variant="outlined"
                                            />
                                        </StyledTableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained" 
                    sx={{
                        backgroundColor:'#1a2b5a', 
                        borderRadius:'12px', 
                        // marginRight: '8px',
                        padding: '14px 24px',
                        // transition: 'background-color 0.3s',
                        fontSize: '14px'
                    }} 
                    endIcon={<SaveOutlined />}
                    onClick={() => console.log(nilaiInput)}
                >
                    Simpan
                </Button>
                <Button
                    endIcon={<CancelOutlined />}
                    style={isHoveredBatalkan ? { ...batalkanButtonStyle, ...hoverBatalkanStyle } : batalkanButtonStyle}
                    onMouseEnter={() => setIsHoveredBatalkan(true)}
                    onMouseLeave={() => setIsHoveredBatalkan(false)}
                    onClick={handleClose}                >
                    Batalkan
                </Button>
            </DialogActions>
        </Dialog>
    );
};
