import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react'; // Removed unnecessary import
import { idID } from '@mui/material/locale';
import { Message } from '@mui/icons-material';

const columns = [
  { field: 'id', headerName: 'No', width: 70 },
  { field: 'Nama', headerName: 'Nama', width: 130 },
  { field: 'Nippos', headerName: 'Nippos', width: 130 },
  { field: 'Posisi', headerName: 'Posisi', width: 130 },
  { field: 'Job Family', headerName: 'Job Family', width: 130 },
  { field: 'Job Level', headerName: 'Job Level', width: 130 },
  { field: 'Nama Kantor', headerName: 'Kantor', width: 130 },
  { field: 'Komite Unit', headerName: 'Komite Unit', width: 130 },
];

// TalentSourceTable component
const TalentSourceTable = ({ checkboxSelection, rows }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectionChange = (newSelection) => {
    console.log('Selected rows:', newSelection.selectionModel);
  
  };

  useEffect(() => {
    console.log("jer",selectedRows);
  }, [selectedRows]);
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={checkboxSelection}
        selectionModel={selectedRows}
        onSelectionModelChange={handleSelectionChange}
      />
    </div>
  );
};

export default TalentSourceTable;
