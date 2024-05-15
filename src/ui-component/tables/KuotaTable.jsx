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
import { OutlinedInput, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useState, useEffect} from "react"

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

function createData(kuota) {
  return { kuota };
}

export default function KuotaTable({ header, initialValue, bobot, refetchstate, handlerefetch, updatekuotastate, onUpdateKuotaStateChange }) {
  const kuotatochange = bobot;
  const [score, setscore] = useState([])
  const [rows,setRows] = useState([])
  const [koutafromrows, setKuotaFromRows] = useState(0);

  console.log("eee", updatekuotastate);
  useEffect(() => {
    // Fetch data from API
    if (refetchstate){
    fetch(`http://localhost:4000/getparameterkuota?id=${kuotatochange}`)
      .then(response => response.json())
      .then(data => {
        // Update state with API data
        setscore(data);
  
        // Initialize rows based on fetched score data
        const kuota = data['kuota'] || 0;
  
        setRows([createData(kuota)]);
        // Set the initial values from the fetched data
        setKuotaFromRows(kuota);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
      handlerefetch()
    }
    }, [refetchstate]); // Empty dependency array to run effect only once

      const updateparameterqual = () => {
    return fetch('http://localhost:4000/updatepaktacommit', {
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

const updatekuota = () => {
  return fetch('http://localhost:4000/updatekuota', {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
          'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify({
          // Include any data you want to send in the request body
          id: kuotatochange,
          newscore: koutafromrows

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
  if (updatekuotastate) {
    // Call the updateparameterqual function
    updatekuota();
    // Reset updatekkmstate to false
    onUpdateKuotaStateChange(); // Call the function passed from the parent component
  }
}, [updatekuotastate]); // Watch for changes in updatekkmstate

const handleDecrease = (index, field) => {
  const updatedRows = [...rows];
  const updatedValue = Math.max(0, updatedRows[index][field] - 5); // Ensure the value is not negative
  updatedRows[index][field] = updatedValue;
  setRows(updatedRows);

  // Update the corresponding state variable based on the changed value
  switch (field) {
    case 'kuota':
      setKuotaFromRows(updatedValue);
      break;
    default:
      break;
  }
};

  const MAX_VALUES = {
    kuota: 100
  };
  
  const handleIncrease = (index, field) => {
    const updatedRows = [...rows];
    const currentValue = updatedRows[index][field];
    const newValue = currentValue + 5;
    const maxValue = MAX_VALUES[field];
    const updatedValue = Math.min(maxValue, newValue); // Ensure the value does not exceed the maximum
    updatedRows[index][field] = updatedValue;
    setRows(updatedRows);

    // Update the corresponding state variable based on the changed value
    switch (field) {
      case 'kuota':
        setKuotaFromRows(updatedValue);
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
              <StyledTableCell colSpan={2}>
                <span style={{ color: '#1F1F1F' }}>{header.split('-')[0]}</span>
                <span style={{ color: '#828282' }}>{header.split('-')[1]}</span>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <StyledTableCell>
                  <OutlineInputStyle
                      value={row.kuota}
                      inputProps={{ min: 0, max: 100 }}
                      onChange={(e) => handleInputChange(index, 'kuota', e.target.value)} 
                    />
                </StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="column" alignItems="flex-end">
                      <IconButton
                        onClick={() => handleIncrease(index, 'kuota')}
                        sx={{ padding: '0', marginBottom: '1px' }}
                      >
                        <ExpandLess sx={{ fontSize: '16px' }} />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDecrease(index, 'kuota')}
                        sx={{ padding: '0', marginTop: '1px' }}
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

KuotaTable.propTypes = {
    header: PropTypes.string.isRequired,
    initialValue: PropTypes.number.isRequired
  };