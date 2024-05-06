import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';

function createData(colname1, colname2, colname3) {
  return { colname1, colname2, colname3 };
}

const rows = [
  createData('Sleeping Tiger-2', 'Promotable-2', 'High Potential'),
  createData('Sleeping Tiger-1', 'Promotable-4', 'Promotable-3'),
  createData('Unfit', 'Solid Contributor-1', 'Solid Contributor-2'),
];

const colorMapping = {
  'Sleeping Tiger-2': '#FFB74D',
  'Promotable-4': '#FFB74D',
  'High Potential': '#388E3C',
  'Sleeping Tiger-1': '#E57373',
  'Promotable-2': '#66BB6A',
  'Promotable-3': '#66BB6A',
  'Unfit': '#F44336',
  'Solid Contributor-1': '#E57373',
  'Solid Contributor-2': '#FFB74D',
};

const cellStyle = (cell) => ({
  border: 0,
  backgroundColor: colorMapping[cell],
  textAlign: 'left',
  verticalAlign: 'top',
  padding: '16px', 
  height: '100px', 
});

const buttonStyle = {
  minWidth: '10px',
  width: 'auto',
  borderRadius: 3,
};

const tableContainerStyle = {
  display: 'flex',
  alignItems: 'flex-start', 
};

export default function Matriks({eventid}) {
  const [categoryCounts, setCategoryCounts] = useState({
    "High Potential": 0,
    "Promotable 4": 0,
    "Promotable 3": 0,
    "Promotable 2": 0,
    "Solid Contributor 1": 0,
    "Solid Contributor 2": 0,
    "Sleeping Tiger 1": 0,
    "Sleeping Tiger 2": 0,
    "Unfit": 0
  });

  const eventidactive = eventid;
   useEffect(() => {
    // Fetch data from API
    fetch(`http://localhost:4000/getclustertable?eventtalentid=${eventidactive}`)
      .then(response => response.json())
      .then(datacluster => {
        // Initialize category counts
        let counts = {
          "High Potential": 0,
          "Promotable 4": 0,
          "Promotable 3": 0,
          "Promotable 2": 0,
          "Solid Contributor 1": 0,
          "Solid Contributor 2": 0,
          "Sleeping Tiger 1": 0,
          "Sleeping Tiger 2": 0,
          "Unfit": 0
        };

        // Count categories
        datacluster.forEach(row => {
          const category = row["Matriks Kategori Akhir"];
          counts[category] += 1;
        });

        // Store category counts
        setCategoryCounts(counts);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
 
  const buttonNumbers = {
    'Sleeping Tiger-2': categoryCounts["Sleeping Tiger 2"],
    'Promotable-4': categoryCounts["Promotable 4"],
    'High Potential': categoryCounts["High Potential"],
    'Sleeping Tiger-1': categoryCounts["Sleeping Tiger 1"],
    'Promotable-2': categoryCounts["Promotable 2"],
    'Promotable-3': categoryCounts["Promotable 3"],
    'Unfit': categoryCounts["Unfit"],
    'Solid Contributor-1': categoryCounts["Solid Contributor 1"],
    'Solid Contributor-2': categoryCounts["Solid Contributor 2"],
  };
  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant='h4' color='#ffffff' style={{ marginTop: '15px' }}>-</Typography>
      <TableContainer component={Paper} sx={tableContainerStyle}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <TableCell key={cellIndex} sx={cellStyle(cell)}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <Typography variant="h4" style={{ alignSelf: 'flex-start', marginBottom: '5px' }}>
                        {cell}
                      </Typography>
                      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Button variant="contained" color="primary" sx={buttonStyle}>
                          {buttonNumbers[cell]}
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant='h4' style={{ marginTop: '15px' }} >Performance</Typography>
    </div>
  );
}
