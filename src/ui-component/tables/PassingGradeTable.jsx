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
import { useEffect, useState } from 'react';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '6px 18px',
    border: 0
  },
}));

function createData(competence, performance, akhlak, learningagility) {
  return { competence, performance, akhlak, learningagility };
}

export default function PassingGradeTable({tipekomite, updatekkmstate, refetchstate, onUpdateKkmStateChange, handlerefetch}) {
  const [score, setscore] = useState([])
  const komite = tipekomite;
  const [rows,setRows] = useState([])
  const [competencyfromrows, setCompetencyFromRows] = useState(0);
  const [performancefromrows, setPerformanceFromRows] = useState(0);
  const [akhlakfromrows, setAkhlakFromRows] = useState(0);
  const [learningagilityfromrows, setLearningAgilityFromRows] = useState(0);

  useEffect(() => {
    // Fetch data from API
    if (refetchstate){
    fetch(`http://localhost:4000/getparameterqual?tipekomite=${komite}`)
      .then(response => response.json())
      .then(data => {
        // Update state with API data
        setscore(data);
  
        // Initialize rows based on fetched score data
        const competencyScore = data['Competency'] || 0;
        const performanceScore = data['Performance'] || 0;
        const AKHLAKScore = data['AKHLAK'] || 0;
        const LAScore = data['Learning Agility'] || 0;
  
        setRows([createData(competencyScore, performanceScore, AKHLAKScore, LAScore)]);
        // Set the initial values from the fetched data
        setCompetencyFromRows(competencyScore);
        setPerformanceFromRows(performanceScore);
        setAkhlakFromRows(AKHLAKScore);
        setLearningAgilityFromRows(LAScore);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      handlerefetch()
    }
    }, [refetchstate]); // Empty dependency array to run effect only once

  const updateparameterqual = () => {
    return fetch('http://localhost:4000/updateparamqual', {
        method: 'POST', // Specify the HTTP method (POST, GET, etc.)
        headers: {
            'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({
            // Include any data you want to send in the request body
            tipekomite: komite,
            competency: competencyfromrows,
            performance: performancefromrows,
            akhlak: akhlakfromrows,
            learningagility: learningagilityfromrows
        }) // Convert the bodyData object to a JSON string
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data; // Return the parsed JSON data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to handle it elsewhere
        });
};

useEffect(() => {
  // Check if updatekkmstate is true
  if (updatekkmstate) {
    // Call the updateparameterqual function
    updateparameterqual();
    // Reset updatekkmstate to false
    onUpdateKkmStateChange(); // Call the function passed from the parent component
  }
}, [updatekkmstate]); // Watch for changes in updatekkmstate

const handleDecrease = (index, field) => {
  const updatedRows = [...rows];
  const updatedValue = Math.max(0, updatedRows[index][field] - 1); // Ensure the value is not negative
  updatedRows[index][field] = updatedValue;
  setRows(updatedRows);

  // Update the corresponding state variable based on the changed value
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
    const updatedValue = Math.min(maxValue, newValue); // Ensure the value does not exceed the maximum
    updatedRows[index][field] = updatedValue;
    setRows(updatedRows);

    // Update the corresponding state variable based on the changed value
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
                <StyledTableCell>{row.competence}</StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="column" alignItems="center">
                      <IconButton onClick={() => handleIncrease(index, 'competence')} size="small" sx={{ fontSize: '2px', marginBottom:'3px'}}>
                          <ExpandLess />
                      </IconButton>
                      <IconButton onClick={() => handleDecrease(index, 'competence')} size="small" sx={{ fontSize: '2px', marginTop: '-20px' }}>
                          <ExpandMore />
                      </IconButton>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell>{row.performance}</StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="column" alignItems="center">
                      <IconButton onClick={() => handleIncrease(index, 'performance')} size="small" sx={{ fontSize: '2px', marginBottom:'3px'}}>
                          <ExpandLess />
                      </IconButton>
                      <IconButton onClick={() => handleDecrease(index, 'performance')} size="small" sx={{ fontSize: '2px', marginTop: '-20px' }}>
                          <ExpandMore />
                      </IconButton>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell>{row.akhlak}</StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="column" alignItems="center">
                      <IconButton onClick={() => handleIncrease(index, 'akhlak')} size="small" sx={{ fontSize: '2px',marginBottom:'3px' }}>
                          <ExpandLess />
                      </IconButton>
                      <IconButton onClick={() => handleDecrease(index, 'akhlak')} size="small" sx={{ fontSize: '2px', marginTop: '-20px' }}>
                          <ExpandMore />
                      </IconButton>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell>{row.learningagility}</StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="column" alignItems="center">
                      <IconButton onClick={() => handleIncrease(index, 'learningagility')} size="small" sx={{ fontSize: '2px', marginBottom:'3px'}}>
                          <ExpandLess />
                      </IconButton>
                      <IconButton onClick={() => handleDecrease(index, 'learningagility')} size="small" sx={{ fontSize: '2px', marginTop: '-20px' }}>
                          <ExpandMore />
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
