import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ columnIndex }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F5F8FF',
    color: '#1F1F1F',
    fontSize: 16,
    fontWeight: 600,
    border: 0
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    border: 0,
    minHeight: 20,
    verticalAlign: 'top',
    fontWeight: columnIndex % 2 === 0 ? 600 : 400
  },
}));

export default function DuaKolomDataKaryawan({ tabletitle, rows }) {
  return (
    <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #F5F8FF', marginBottom: '24px'}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell colSpan={2}>{tabletitle}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <StyledTableCell columnIndex={0} sx={{ width: 170 }}>{row.colname1}</StyledTableCell>
              <StyledTableCell columnIndex={1} sx={{ width: 526, whiteSpace: 'pre-line' }}>{row.coldata1}</StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
