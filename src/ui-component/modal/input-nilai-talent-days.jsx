import React, { useState, useEffect } from 'react';
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

export default function InputNilaiTalentDays({ open, handleClose, questionList, nippos, eventid, refetchkaryawan }) {
    const [sortedQuestionList, setSortedQuestionList] = useState([]);
    const [nilaiInput, setNilaiInput] = useState([]);

    // Initialize state to hold id_pertanyaan and nilaiInput
    const [nilaiArray, setNilaiArray] = useState([]);

    useEffect(() => {
        // Sort questionList by id_pertanyaan
        const sortedList = [...questionList].sort((a, b) => a.id - b.id);
        setSortedQuestionList(sortedList);

        // Initialize nilaiInput array with empty strings based on sortedList length
        setNilaiInput(Array(sortedList.length).fill(''));

        // Initialize nilaiArray with empty objects based on sortedList length
        setNilaiArray(Array(sortedList.length).fill({ id_pertanyaan: null, nilaiInput: '' }));
    }, [questionList]);

    const handleInputChange = (index, event) => {
        const values = [...nilaiInput];
        values[index] = event.target.value;
        setNilaiInput(values);

        // Update nilaiArray with id_pertanyaan and nilaiInput
        const updatedArray = [...nilaiArray];
        updatedArray[index] = { id_pertanyaan: sortedQuestionList[index].id, nilaiInput: event.target.value };
        setNilaiArray(updatedArray);
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

    const updatenilaidays = (eventid, nippos, nilaiArray) => {
        return fetch('http://localhost:4000/updatenilaibutton', {
            method: 'POST', // Specify the HTTP method (POST, GET, etc.)
            headers: {
                'Content-Type': 'application/json' // Specify the content type
            },
            body: JSON.stringify({
                // Include any data you want to send in the request body
                eventid: eventid,
                nippos: nippos,
                data: nilaiArray
            }) // Convert the bodyData object to a JSON string
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                handleClose();
                refetchkaryawan() // Close the dialog on successful update
                return data; // Return the parsed JSON data
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                throw error; // Rethrow the error to handle it elsewhere
            });
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign: 'left', marginTop: '10px', marginBottom: '10px', lineHeight: '32px', letterSpacing: '0.5px' }}>
                    Daftar Nilai BPJ Karyawan
                </Typography>
            </DialogTitle>
            <DialogContent>
                <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '16px' }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }}>
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell>Pertanyaan</StyledTableCell>
                                    <StyledTableCell>Nilai</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedQuestionList.map((question, index) => (
                                    <TableRow key={question.id}>
                                        <StyledTableCell>{question.id}</StyledTableCell>
                                        <StyledTableCell>{question.idpertanyaan.pertanyaan}</StyledTableCell>
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
                        backgroundColor: '#1a2b5a',
                        borderRadius: '12px',
                        padding: '14px 24px',
                        fontSize: '14px'
                    }}
                    endIcon={<SaveOutlined />}
                    onClick={() => {
                        updatenilaidays(eventid, nippos, nilaiArray);
                        setNilaiInput([]);
                        setNilaiArray([]);
                    }}
                >
                    Simpan
                </Button>
                <Button
                    endIcon={<CancelOutlined />}
                    style={isHoveredBatalkan ? { ...batalkanButtonStyle, ...hoverBatalkanStyle } : batalkanButtonStyle}
                    onMouseEnter={() => setIsHoveredBatalkan(true)}
                    onMouseLeave={() => setIsHoveredBatalkan(false)}
                    onClick={() => {
                        handleClose();
                        setNilaiInput([]);
                        setNilaiArray([]);
                    }}
                >
                    Batalkan
                </Button>
            </DialogActions>
        </Dialog>
    );
}
