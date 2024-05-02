import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { minWidth } from '@mui/system';


const KomiteUnitTable = ({ rows }) => {
    

    const columns = [
        { field: 'id', headerName: 'No', align: 'left', minWidth: 70 },
        { field: 'Komite Unit', headerName: 'Nama', align: 'left', minWidth: 120 },
        { field: 'Nippos', headerName: 'NIPPOS', align: 'left', minWidth: 120 },
        { field: 'Posisi', headerName: 'Posisi', align: 'left', minWidth: 120 },
        { field: 'Job Family', headerName: 'Rumpun Jabatan', align: 'left', minWidth: 120 },
        { field: 'Nama Kantor', headerName: 'Kantor', align: 'left', minWidth: 120 },
        { field: 'Status Memilih', headerName: 'Status', align: 'left', minWidth: 120 },
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
                
            />
            
        </div>
    );
};

export default KomiteUnitTable;
  