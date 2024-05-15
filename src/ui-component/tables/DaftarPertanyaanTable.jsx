import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { EditOutlined } from '@mui/icons-material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '12px 18px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const DaftarPertanyaanTable = ({ pertanyaan, handleSaveQuestion }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditedText(text);
  };

  const handleInputChange = (e) => {
    setEditedText(e.target.value);
  };

  const handleSave = (id) => {
    if (editedText.trim() !== '') {
      handleSaveQuestion(id, editedText);
    }
    setEditingId(null); // Reset editingId regardless of whether save is successful
    setEditedText('');
  };

  const handleKeyPress = (id, e) => {
    if (e.key === 'Enter') {
      handleSave(id);
    }
  };

  const handleBlur = (id) => {
    handleSave(id);
  };

  return (
    <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px'}}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300, tableLayout: 'fixed' }} aria-label="Daftar Pertanyaan Table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Pertanyaan Event</StyledTableCell>
              <StyledTableCell align='right'>Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pertanyaan.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>
                  {editingId === row.id ? (
                    <TextField
                      fullWidth
                      value={editedText}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur(row.id)}
                      onKeyPress={(e) => handleKeyPress(row.id, e)}
                      autoFocus
                    />
                  ) : (
                    row.text
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {editingId !== row.id && <EditOutlined onClick={() => handleEdit(row.id, row.text)} />}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

DaftarPertanyaanTable.propTypes = {
  pertanyaan: PropTypes.array.isRequired,
  handleSaveQuestion: PropTypes.func.isRequired,
};

export default DaftarPertanyaanTable;
