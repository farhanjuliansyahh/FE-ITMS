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

function createData(competence, performance, akhlak, learningagility) {
  return { competence, performance, akhlak, learningagility };
}

export default function PassingGradeTable() {
  const [rows, setRows] = React.useState([
    createData(2, 60, 2, 2),
  ]);

  const handleDecrease = (index, field) => {
    const updatedRows = [...rows];
    const updatedValue = Math.max(0, updatedRows[index][field] - 1); // Ensure the value is not negative
    updatedRows[index][field] = updatedValue;
    setRows(updatedRows);
  };
  
  const MAX_VALUES = {
    competence: 5,
    performance: 100,
    akhlak: 5,
    learningagility: 5,
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
            <StyledTableCell colSpan={2}>Competence/Psychotest</StyledTableCell>
            <StyledTableCell colSpan={2}>Performance</StyledTableCell>
            <StyledTableCell colSpan={2}>Akhlak</StyledTableCell>
            <StyledTableCell colSpan={2}>Learning Agility</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.competence}</TableCell>
              <TableCell align="right">
                <Stack direction="column" alignItems="center">
                    <IconButton onClick={() => handleIncrease(index, 'competence')} size="small" sx={{ fontSize: '2px'}}>
                        <ExpandLess />
                    </IconButton>
                    <IconButton onClick={() => handleDecrease(index, 'competence')} size="small" sx={{ fontSize: '2px', marginTop: '-20px' }}>
                        <ExpandMore />
                    </IconButton>
                </Stack>
              </TableCell>
              <TableCell>{row.performance}</TableCell>
              <TableCell align="right">
                <Stack direction="column" alignItems="center">
                    <IconButton onClick={() => handleIncrease(index, 'performance')} size="small" sx={{ fontSize: '2px' }}>
                        <ExpandLess />
                    </IconButton>
                    <IconButton onClick={() => handleDecrease(index, 'performance')} size="small" sx={{ fontSize: '2px', marginTop: '-20px' }}>
                        <ExpandMore />
                    </IconButton>
                </Stack>
              </TableCell>
              <TableCell>{row.akhlak}</TableCell>
              <TableCell align="right">
                 <Stack direction="column" alignItems="center">
                    <IconButton onClick={() => handleIncrease(index, 'akhlak')} size="small" sx={{ fontSize: '2px' }}>
                        <ExpandLess />
                    </IconButton>
                    <IconButton onClick={() => handleDecrease(index, 'akhlak')} size="small" sx={{ fontSize: '2px', marginTop: '-20px' }}>
                        <ExpandMore />
                    </IconButton>
                 </Stack>
              </TableCell>
              <TableCell>{row.learningagility}</TableCell>
              <TableCell align="right">
                <Stack direction="column" alignItems="center">
                    <IconButton onClick={() => handleIncrease(index, 'learningagility')} size="small" sx={{ fontSize: '2px' }}>
                        <ExpandLess />
                    </IconButton>
                    <IconButton onClick={() => handleDecrease(index, 'learningagility')} size="small" sx={{ fontSize: '2px', marginTop: '-20px' }}>
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
