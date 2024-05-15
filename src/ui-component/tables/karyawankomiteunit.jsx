import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';


const KaryawanKomiteUnit = ({
    rows,
    checkboxSelection, 
    selectedRows, 
    onSelectedRowsChange,
    searchNama, 
    searchNippos,
    searchJobLevel,
}) => {

    const filteredRows = rows.filter((row) => {
        const namaMatch = !searchNama || (row.Nama && row.Nama.toLowerCase().includes(searchNama.toLowerCase())); 
        const nipposMatch = !searchNippos || (row.Nippos && row.Nippos.toLowerCase().includes(searchNippos.toLowerCase())); 
        const jobLevelMatch = !searchJobLevel || (row['Job Level'] && row['Job Level'].toLowerCase().includes(searchJobLevel.toLowerCase())); 

        return (!searchNama || namaMatch) 
        && (!searchNippos || nipposMatch) 
        && (!searchJobLevel || jobLevelMatch) 
    });

    const handleSelectionChange = (newSelection) => {
        onSelectedRowsChange(newSelection); // Pass the selectionModel directly
        console.log(newSelection);
      };

    const columns = [
        { field: 'id', headerName: 'No', width: 70 },
        { field: 'Nama', headerName: 'Nama', width: 170 },
        { field: 'Nippos', headerName: 'NIPPOS', width: 130 },
        { field: 'Posisi', headerName: 'Posisi', width: 250 },
        { field: 'Job Level', headerName: 'Job Level', width: 130 },
        { field: 'Job Family', headerName: 'Rumpun Jabatan', width: 130 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={filteredRows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection={checkboxSelection}
                disableRowSelectionOnClick={!checkboxSelection}
                onRowSelectionModelChange={handleSelectionChange}
                rowSelectionModel={selectedRows}

            />
            
        </div>
    );
};

export default KaryawanKomiteUnit;
  