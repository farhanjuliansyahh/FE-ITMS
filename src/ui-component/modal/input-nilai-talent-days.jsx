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
import { toast } from 'react-toastify';

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
    minHeight: 40
  }
}));

export default function InputNilaiTalentDays({ nilai, open, handleClose, questionList, nippos, eventid, refetchkaryawan, eventstatus_id }) {
  const [sortedQuestionList, setSortedQuestionList] = useState([]);
  const [nilaiInput, setNilaiInput] = useState([]);
  const [nilaiArray, setNilaiArray] = useState([]);
  const [initialNilaiInput, setInitialNilaiInput] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const sortedList = [...questionList].sort((a, b) => a.id_pertanyaan - b.id_pertanyaan);
    setSortedQuestionList(sortedList);

    const initialNilai = sortedList.map((question, index) => {
      const existingNilai = nilai && nilai.length > index ? nilai[index] : '';
      return existingNilai;
    });

    setNilaiInput(initialNilai);
    setInitialNilaiInput(initialNilai); // Store initial values

    const initialNilaiArray = sortedList.map((question, index) => ({
      id_pertanyaan: question.id_pertanyaan,
      nilaiInput: initialNilai[index]
    }));
    setNilaiArray(initialNilaiArray);
  }, [questionList, nilai]);

  const handleInputChange = (index, event) => {
    let value = event.target.value;
    // Ensure the value is within the range defined by inputProps
    if (value > 5) {
      value = 5;
    } else if (value < -5) {
      value = -5;
    }

   const values = [...nilaiInput];
  values[index] = value;
  setNilaiInput(values);

  const updatedArray = [...nilaiArray];
  updatedArray[index].nilaiInput = value;
  setNilaiArray(updatedArray);

  // Check for changes
  setHasChanges(JSON.stringify(values) !== JSON.stringify(initialNilaiInput));
  };

  const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

  const hoverBatalkanStyle = {
    backgroundColor: '#FFEDED',
    color: '#D32F2F'
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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        eventid: eventid,
        nippos: nippos,
        data: nilaiArray
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        toast.success('Nilai berhasil disimpan !');
        handleClose();
        refetchkaryawan();
        setHasChanges(false);
        return data;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        toast.error('Gagal menyimpan nilai !');
        throw error;
      });
  };

  const handleDialogClose = () => {
    setNilaiInput(initialNilaiInput); // Reset to initial values
    setNilaiArray(initialNilaiInput.map((nilai, index) => ({
      id_pertanyaan: sortedQuestionList[index].id_pertanyaan,
      nilaiInput: nilai
    })));
    setHasChanges(false);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogTitle style={{marginTop: '12px', marginLeft: '12px', marginRight: '12px'}}>
        <Typography
          style={{
            fontSize: '24px',
            fontWeight: '700',
            textAlign: 'left',
            marginTop: '10px',
            marginBottom: '10px',
            lineHeight: '32px',
            letterSpacing: '0.5px'
          }}
        >
          Daftar Nilai BPJ Karyawan
        </Typography>
      </DialogTitle>
      <DialogContent style={{marginLeft: '12px', marginRight: '12px'}}>
        <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0' }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Pertanyaan</StyledTableCell>
                  <StyledTableCell>Nilai (-5 s/d 5)</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedQuestionList.map((question, index) => (
                  <TableRow key={question.id}>
                    <StyledTableCell>{question.idpertanyaan.pertanyaan}</StyledTableCell>
                    <StyledTableCell>
                      <TextField
                        value={nilaiInput[index]}
                        onChange={(event) => handleInputChange(index, event)}
                        fullWidth
                        variant="outlined"
                        type="number"
                        inputProps={{ min: -5, max: 5 }}
                      />
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </DialogContent>
      <DialogContent style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '12px', marginRight: '12px', marginBottom: '12px' }}>
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
            setNilaiInput(initialNilaiInput); // Reset to initial values
            setNilaiArray(initialNilaiInput.map((nilai, index) => ({
              id_pertanyaan: sortedQuestionList[index].id_pertanyaan,
              nilaiInput: nilai
            })));
            setHasChanges(false);
            handleDialogClose
          }}
          disabled={!hasChanges || eventstatus_id !== 5}
        >
          Simpan
        </Button>
      </DialogContent>
    </Dialog>
  );
}