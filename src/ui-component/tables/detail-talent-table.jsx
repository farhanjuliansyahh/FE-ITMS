import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function DetailTalentTable({
    selectedKantor,
    selectedRumpunJabatan,
    selectedJobLevel,
    selectedStatusIDP,
  }) {
    const rows = [
        { id: 1, nama: 'Adinda', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation',
        joblevel: 'A1', jobfam: 'Bisnis', nama_kantor:'KANTOR PUSAT BANDUNG', status_IDP:'Selesai'},
        { id: 2, nama: 'Berlian Hadi', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation',
        joblevel: 'A2', jobfam: 'Keuangan', nama_kantor:'KANTOR PUSAT JAKARTA', status_IDP:'Selesai'},
        { id: 3, nama: 'Dwi Puspitasari ', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation',
        joblevel: 'C2', jobfam: 'Perencanaan dan Pengelolaan Strategis', nama_kantor:'KANTOR PUSAT JAKARTA', status_IDP:'Belum berjalan'},
        { id: 4, nama: 'Erlin Maulidina ', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation',
        joblevel: 'D3', jobfam: 'Manajemen Risiko dan Kepatuhan', nama_kantor:'KANTOR REGIONAL I MEDAN', status_IDP:'Selesai'},
        { id: 5, nama: 'Fransisko Adi ', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation',
        joblevel: 'E3', jobfam: 'Pengelolaan Teknologi', nama_kantor:'KANTOR REGIONAL I MEDAN', status_IDP:'Berjalan'},
        { id: 6, nama: 'Ganjar Arifin ', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation',
        joblevel: 'C1', jobfam: 'Bisnis', nama_kantor:'KCU JAKARTACENTRUM', status_IDP:'Selesai'}
    ];
    const columns = [
        { field: 'id', headerName: 'No', width: 70 },
        { field: 'nama', headerName: 'Nama', width: 110 },
        { field: 'nippos', headerName: 'NIPPOS', width: 110 },
        { field: 'posisi', headerName: 'Posisi', width: 110 },
        { field: 'joblevel', headerName: 'Job Level', width: 110 },
        { field: 'jobfam', headerName: 'Rumpun Jabatan', width: 110 },
        { field: 'nama_kantor', headerName: 'Nama Kantor', width: 170 },
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
