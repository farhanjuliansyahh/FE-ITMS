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
import { useState, useEffect} from "react"


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
                <StyledTableCell>{row.kuota}</StyledTableCell>
                <StyledTableCell align="right">
                  <Stack direction="column" alignItems="flex-end">
                      <IconButton onClick={() => handleIncrease(index, 'kuota')} size="small" sx={{ fontSize: '2px', marginBottom:'3px'}}>
                          <ExpandLess />
                      </IconButton>
                      <IconButton onClick={() => handleDecrease(index, 'kuota')} size="small" sx={{ fontSize: '2px', marginTop: '-20px' }}>
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

KuotaTable.propTypes = {
    header: PropTypes.string.isRequired,
    initialValue: PropTypes.number.isRequired
  };