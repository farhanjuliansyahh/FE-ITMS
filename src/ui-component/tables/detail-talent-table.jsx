import React, { useEffect,useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DetailTalentTable({
    selectedKantor,
    selectedRumpunJabatan,
    selectedJobLevel,
    selectedStatusIDP,
  }) {
const [rows, selectedRows] = useState([])

useEffect(() => {
    fetch("http://localhost:4000/getdetailtalent")
    .then(response => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
    .then(data => selectedRows(data))
  },[])

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
        const kantorMatch = row.nama_kantor === selectedKantor?.nama_kantor;
        const rumpunJabatanMatch = row.jobfam === selectedRumpunJabatan;
        const jobLevelMatch = row.joblevel === selectedJobLevel;
        const statusIDPMatch = row.status_IDP === selectedStatusIDP;
        
        return (!selectedKantor || kantorMatch) && (!selectedRumpunJabatan || rumpunJabatanMatch) && 
               (!selectedJobLevel || jobLevelMatch) && (!selectedStatusIDP || statusIDPMatch);
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
