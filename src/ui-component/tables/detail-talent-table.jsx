import React, { useEffect,useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DetailTalentTable({
    rows,
    searchNama, 
    searchJobLevel,
    searchRumpunJabatan,
    searchKantor
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
        // { field: 'status_IDP', headerName: 'Status IDP', width: 130 },
    ];

    const filteredRows = rows.filter((row) => {
        const namaMatch = !searchNama || (row.nama && row.nama.toLowerCase().includes(searchNama.toLowerCase())); 
        const jobLevelMatch = !searchJobLevel || (row.joblevel && row.joblevel.toLowerCase().includes(searchJobLevel.toLowerCase())); 
        const rumpunJabatanMatch = !searchRumpunJabatan || (row.jobfam && row.jobfam.toLowerCase().includes(searchRumpunJabatan.toLowerCase())); 
        const kantorMatch = !searchKantor || (row.nama_kantor && row.nama_kantor.toLowerCase().includes(searchKantor.toLowerCase())); 

        return (!searchNama || namaMatch) 
        && (!searchJobLevel || jobLevelMatch) 
        && (!searchRumpunJabatan || rumpunJabatanMatch) 
        && (!searchKantor || kantorMatch);
    });

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
