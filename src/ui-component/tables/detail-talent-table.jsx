import React, { useEffect,useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DetailTalentTable({
    filteredRows
  }) {

    const columns = [
        { field: 'id', headerName: 'No', width: 70 },
        { field: 'nama', headerName: 'Nama', width: 110 },
        { field: 'nippos', headerName: 'NIPPOS', width: 110 },
        { field: 'posisi', headerName: 'Posisi', width: 110 },
        { field: 'joblevel', headerName: 'Job Level', width: 110 },
        { field: 'jobfam', headerName: 'Rumpun Jabatan', width: 110 },
        { field: 'nama_kantor', headerName: 'Nama Kantor', width: 170 },
        { field: 'nama_event', headerName: 'Nama Event', width: 110}
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
            />
            
        </div>
    );
};
