import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Stack } from '@mui/material';
import PropTypes from 'prop-types';


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

function createData(kuota) {
  return { kuota };
}

export default function KuotaTable({ header, initialValue }) {
  const [rows, setRows] = React.useState([
        createData(initialValue),
  ]);

  const handleDecrease = (index, field) => {
    const updatedRows = [...rows];
    const updatedValue = Math.max(0, updatedRows[index][field] - 1); // Ensure the value is not negative
    updatedRows[index][field] = updatedValue;
    setRows(updatedRows);
  };

  const MAX_VALUES = {
    kuota: 100
  };
  
  const handleIncrease = (index, field) => {
    const updatedRows = [...rows];
    const currentValue = updatedRows[index][field];
    const newValue = currentValue + 1;
    const maxValue = MAX_VALUES[field];
    const updatedValue = Math.min(maxValue, newValue); // Ensure the value does not exceed the maximum
    updatedRows[index][field] = updatedValue;
    setRows(updatedRows);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300, tableLayout: 'fixed' }} aria-label="Passing Grade Table">
        <TableHead>
          <TableRow>
            <StyledTableCell colSpan={2}>
              <span style={{ color: '#1F1F1F' }}>{header.split('-')[0]}</span>
              <span style={{ color: '#828282' }}>{header.split('-')[1]}</span>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.kuota}</TableCell>
              <TableCell align="right">
                <Stack direction="column" alignItems="flex-end">
                    <IconButton onClick={() => handleIncrease(index, 'kuota')} size="small" sx={{ fontSize: '2px'}}>
                        <ExpandLess />
                    </IconButton>
                    <IconButton onClick={() => handleDecrease(index, 'kuota')} size="small" sx={{ fontSize: '2px', marginTop: '-20px' }}>
                        <ExpandMore />
                    </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

KuotaTable.propTypes = {
    header: PropTypes.string.isRequired,
    initialValue: PropTypes.number.isRequired
  };