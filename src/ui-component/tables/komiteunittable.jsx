import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';


const KomiteUnitTable = () => {
    

    const columns = [
        { field: 'id', headerName: 'No', width: 70 },
        { field: 'nama', headerName: 'Nama', width: 170 },
        { field: 'nippos', headerName: 'NIPPOS', width: 130 },
        { field: 'posisi', headerName: 'Posisi', width: 250 },
        { field: 'joblevel', headerName: 'Job Level', width: 130 },
        { field: 'jobfam', headerName: 'Rumpun Jabatan', width: 130 },
    ];

    const rows = [
        { id: 1, nama: 'Sri Hartini', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation',
        joblevel: 'D3', jobfam: 'Bisnis'},
        { id: 2, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
        joblevel:'D3', jobfam :'Bisnis' },
        { id: 3, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
        joblevel:'D3', jobfam :'Bisnis' },
        { id: 4, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
        joblevel:'D3', jobfam :'Bisnis'},
        { id: 5, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
        joblevel:'D3', jobfam :'Bisnis' },
        { id: 6, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
        joblevel:'D3', jobfam :'Bisnis'},
        { id: 7, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
        joblevel:'D3', jobfam :'Bisnis'},
        { id: 8, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
        joblevel:'D3', jobfam :'Bisnis' },
        { id: 9, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
        joblevel:'D3', jobfam :'Bisnis' },
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
                checkboxSelection
            />
            
        </div>
    );
};

export default KomiteUnitTable;
