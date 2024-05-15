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
import { OutlinedInput, Stack, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const OutlineInputStyle = styled(OutlinedInput)(({ theme }) => ({
  width: '100%',
  background: '#FFFFFF',
  '& input': {
    background: '#FFFFFF',
    height: '24px'
  },
  '& fieldset': {
    borderColor: '#ffffff',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  '&:hover fieldset, &:focus fieldset, &:not(:focus-visible) fieldset': {
    borderColor: 'transparent !important', 
  },
}));


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
    whiteSpace: 'normal', 
    wordWrap: 'break-word',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '6px 18px',
    border: 0,
  },
}));

function createData(competence, performance, akhlak, learningagility) {
  return { competence, performance, akhlak, learningagility };
}

export default function PassingGradeTable({tipekomite, updatekkmstate, refetchstate, onUpdateKkmStateChange, handlerefetch}) {
  const [score, setscore] = useState([]);
  const komite = tipekomite;
  const [rows, setRows] = useState([]);
  const [competencyfromrows, setCompetencyFromRows] = useState(0);
  const [performancefromrows, setPerformanceFromRows] = useState(0);
  const [akhlakfromrows, setAkhlakFromRows] = useState(0);
  const [learningagilityfromrows, setLearningAgilityFromRows] = useState(0);

  useEffect(() => {
    if (refetchstate){
      fetch(`http://localhost:4000/getparameterqual?tipekomite=${komite}`)
        .then(response => response.json())
        .then(data => {
          setscore(data);

          const competencyScore = data['Competency'] || 0;
          const performanceScore = data['Performance'] || 0;
          const AKHLAKScore = data['AKHLAK'] || 0;
          const LAScore = data['Learning Agility'] || 0;

          setRows([createData(competencyScore, performanceScore, AKHLAKScore, LAScore)]);
          setCompetencyFromRows(competencyScore);
          setPerformanceFromRows(performanceScore);
          setAkhlakFromRows(AKHLAKScore);
          setLearningAgilityFromRows(LAScore);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
        handlerefetch();
    }
  }, [refetchstate]);

  const updateparameterqual = () => {
    return fetch('http://localhost:4000/updateparamqual', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tipekomite: komite,
        competency: competencyfromrows,
        performance: performancefromrows,
        akhlak: akhlakfromrows,
        learningagility: learningagilityfromrows
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
  };

  useEffect(() => {
    if (updatekkmstate) {
      updateparameterqual();
      onUpdateKkmStateChange();
    }
  }, [updatekkmstate]);

  const handleDecrease = (index, field) => {
    const updatedRows = [...rows];
    const updatedValue = Math.max(0, updatedRows[index][field] - 1);
    updatedRows[index][field] = updatedValue;
    setRows(updatedRows);

    switch (field) {
      case 'competence':
        setCompetencyFromRows(updatedValue);
        break;
      case 'performance':
        setPerformanceFromRows(updatedValue);
        break;
      case 'akhlak':
        setAkhlakFromRows(updatedValue);
        break;
      case 'learningagility':
        setLearningAgilityFromRows(updatedValue);
        break;
      default:
        break;
    }
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
    const updatedValue = Math.min(maxValue, newValue);
    updatedRows[index][field] = updatedValue;
    setRows(updatedRows);

    switch (field) {
      case 'competence':
        setCompetencyFromRows(updatedValue);
        break;
      case 'performance':
        setPerformanceFromRows(updatedValue);
        break;
      case 'akhlak':
        setAkhlakFromRows(updatedValue);
        break;
      case 'learningagility':
        setLearningAgilityFromRows(updatedValue);
        break;
      default:
        break;
    }
  };

  const handleInputChange = (index, field, value) => {
    // Remove non-numeric characters from the input
    const numericValue = value.replace(/[^0-9]/g, '');

    // Convert the value to a number
    let updatedValue = parseInt(numericValue, 10);

    // If the input is empty or NaN, set the value to 0
    if (isNaN(updatedValue) || numericValue === '') {
      updatedValue = 0;
    }

    // Ensure the value is within the specified range
    updatedValue = Math.min(MAX_VALUES[field], Math.max(0, updatedValue));

    const updatedRows = [...rows];
    updatedRows[index][field] = updatedValue;
    setRows(updatedRows);

    switch (field) {
      case 'competence':
        setCompetencyFromRows(updatedValue);
        break;
      case 'performance':
        setPerformanceFromRows(updatedValue);
        break;
      case 'akhlak':
        setAkhlakFromRows(updatedValue);
        break;
      case 'learningagility':
        setLearningAgilityFromRows(updatedValue);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px'}}>
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
                <StyledTableCell>
                  <OutlineInputStyle
                    value={row.competence}
                    inputProps={{ min: 0, max: 5 }}
                    onChange={(e) => handleInputChange(index, 'competence', e.target.value)} 
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="column" alignItems="center">
                    <IconButton
                      onClick={() => handleIncrease(index, 'competence')}
                      sx={{ padding: '0', marginBottom: '1px' }}
                    >
                      <ExpandLess sx={{ fontSize: '16px' }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDecrease(index, 'competence')}
                      sx={{ padding: '0', marginTop: '1px' }}
                    >
                      <ExpandMore sx={{ fontSize: '16px' }} />
                    </IconButton>
                  </Stack>
                </StyledTableCell>

                <StyledTableCell>
                  <OutlineInputStyle
                    value={row.performance}
                    inputProps={{ min: 0, max: 100 }}
                    onChange={(e) => handleInputChange(index, 'performance', e.target.value)} 
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="column" alignItems="center">
                    <IconButton
                      onClick={() => handleIncrease(index, 'performance')}
                      sx={{ padding: '0', width: '15px', height: '15px', marginBottom: '1px' }}
                    >
                      <ExpandLess sx={{ fontSize: '16px' }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDecrease(index, 'performance')}
                      sx={{ padding: '0', width: '15px', height: '15px', marginTop: '1px' }}
                    >
                      <ExpandMore sx={{ fontSize: '16px' }} />
                    </IconButton>
                  </Stack>
                </StyledTableCell>

                <StyledTableCell>
                  <OutlineInputStyle
                    value={row.akhlak}
                    inputProps={{ min: 0, max: 5 }}
                    onChange={(e) => handleInputChange(index, 'akhlak', e.target.value)} 
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="column" alignItems="center">
                    <IconButton
                      onClick={() => handleIncrease(index, 'akhlak')}
                      sx={{ padding: '0', width: '15px', height: '15px', marginBottom: '1px' }}
                    >
                      <ExpandLess sx={{ fontSize: '16px' }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDecrease(index, 'akhlak')}
                      sx={{ padding: '0', width: '15px', height: '15px', marginTop: '1px' }}
                    >
                      <ExpandMore sx={{ fontSize: '16px' }} />
                    </IconButton>
                  </Stack>
                </StyledTableCell>

                <StyledTableCell>
                  <OutlineInputStyle
                    value={row.learningagility}
                    inputProps={{ min: 0, max: 5 }}
                    onChange={(e) => handleInputChange(index, 'learningagility', e.target.value)} 
                  />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="column" alignItems="center">
                    <IconButton
                      onClick={() => handleIncrease(index, 'learningagility')}
                      sx={{ padding: '0', width: '15px', height: '15px', marginBottom: '1px' }}
                    >
                      <ExpandLess sx={{ fontSize: '16px' }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDecrease(index, 'learningagility')}
                      sx={{ padding: '0', width: '15px', height: '15px', marginTop: '1px' }}
                    >
                      <ExpandMore sx={{ fontSize: '16px' }} />
                    </IconButton>
                  </Stack>
                </StyledTableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
