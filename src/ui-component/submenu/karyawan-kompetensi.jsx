import * as React from 'react';
import { Box } from '@mui/material';
import EmpatKolomDataKaryawan from "../../ui-component/tables/empatkolomdatakaryawan.jsx";

function createData(colname1, coldata1, colname2, coldata2) {
    return { colname1, coldata1, colname2, coldata2 };
  }

const rows_penghargaan_1 = [
    createData('No SKEP', 'Manajer Audit Terbaik', 'Tanggal SKEP', '05-03-2015'),
    createData('Tanggal Mulai', '05-03-2015', 'Penghargaan', 'TANDA PENGHARGAAN PRESTASI KERJA'),
    createData('Pemberian', '2014')
];

const rows_penghargaan_2 = [
    createData('No SKEP', '560/1496-H1/PKK', 'Tanggal SKEP', '03-06-2015'),
    createData('Tanggal Mulai', '03-06-2015', 'Penghargaan', 'TANDA PENGHARGAAN PRESTASI KERJA'),
    createData('Pemberian', '2015')
];

const rows_penghargaan_3 = [
    createData('No SKEP', '116/Jaskugtelprop-1', 'Tanggal SKEP', '22-12-2016'),
    createData('Tanggal Mulai', '01-01-2017', 'Penghargaan', 'TANDA PENGHARGAAN PRESTASI KERJA'),
    createData('Pemberian', '2015')
];

const rows_pelatihan = [
    createData('Jenis Training', '-', 'Predikat', '-'),
    createData('Tanggal Mulai', '-', 'Tanggal Selesai', '-'),
    createData('Tempat', '-', 'Angkatan', '-'),
    createData('Penyelenggara', '-', 'Kantor Penyelenggara', '-'),
    createData('Keterangan', '-'),
];

export default function KompetensiKaryawan() {
    const boxStyle = {
        padding: '20px', 
        width: '100%',
        borderRadius:'12px',
    };

    return (
        <Box sx={boxStyle}>
            <EmpatKolomDataKaryawan tabletitle={'Data Penghargaan'} rows={rows_penghargaan_1} widthDataCell={264}/>
            <EmpatKolomDataKaryawan tabletitle={'Data Penghargaan'} rows={rows_penghargaan_2} widthDataCell={264}/>
            <EmpatKolomDataKaryawan tabletitle={'Data Penghargaan'} rows={rows_penghargaan_3} widthDataCell={264}/>
            <EmpatKolomDataKaryawan tabletitle={'Pelatihan'} rows={rows_pelatihan} widthDataCell={264}/>
        </Box>
    );
}
