import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';


const KaryawanKomiteUnit = ({
    rows,
    checkboxSelection,
    selectedRows,
    onSelectedRowsChange
}) => {

    const currentYear = new Date().getFullYear();

    const handleSelectionChange = (newSelection) => {
        onSelectedRowsChange(newSelection); 
    };

    const columns = [
        { field: 'id', headerName: 'No', width: 70 },
        { field: 'Nama', headerName: 'Nama', width: 170 },
        { field: 'Nippos', headerName: 'NIPPOS', width: 130 },
        { field: 'Posisi', headerName: 'Posisi', width: 250 },
        { field: 'Job Level', headerName: 'Job Level', width: 130 },
        { field: 'Job Family', headerName: 'Rumpun Jabatan', width: 180 },
        { field: 'Competency/Psychotest', headerName: 'Competency/Psychotest', width: 200 },
        { field: 'PMS2yearsago', headerName: `PMS ${currentYear - 2}`, width: 180 },
        { field: 'PMS1yearago', headerName: `PMS ${currentYear - 1}`, width: 180 },
        { field: 'PMSthisyear', headerName: `PMS ${currentYear}`, width: 180 },
        { field: 'AKHLAK', headerName: 'AKHLAK', width: 180 },
        { field: 'Learning Agility', headerName: 'Learning Agility', width: 180 },
        { field: 'Status Hukdis', headerName: 'Status Hukdis', width: 200 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
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
