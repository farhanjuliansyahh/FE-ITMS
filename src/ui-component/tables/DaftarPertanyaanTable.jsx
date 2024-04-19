import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { EditOutlined } from '@mui/icons-material';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: theme.spacing(0.5),
  },
}));

function createData(pertanyaan) {
  return { pertanyaan };
}

export default function DaftarPertanyaanTable() {
  const [rows, setRows] = React.useState([
    createData('Motivasi'),
  ]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300, tableLayout: 'fixed' }} aria-label="Daftar Pertanyaan Table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Pertanyaan Event</StyledTableCell>
            <StyledTableCell align='right'>Aksi</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.pertanyaan}</TableCell>
              <TableCell align="right">
                <EditOutlined/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}