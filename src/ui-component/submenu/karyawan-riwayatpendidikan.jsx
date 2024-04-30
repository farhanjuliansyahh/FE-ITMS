import * as React from 'react';
import { Box } from '@mui/material';
import EmpatKolomDataKaryawan from "../../ui-component/tables/empatkolomdatakaryawan";

function createData(colname1, coldata1, colname2, coldata2) {
    return { colname1, coldata1, colname2, coldata2 };
  }

const rows_SD = [
    createData('Nama Institusi', 'SDN SUKATANI', 'Jurusan', '-'),
    createData('Lulus', '1997', 'Tempat', 'CIANJUR'),
];

const rows_SMP = [
    createData('Nama Institusi', 'SLTP NEGERI 1 CIBEBER', 'Jurusan', '-'),
    createData('Lulus', '2000', 'Tempat', 'CIANJUR'),
];

const rows_SMA = [
    createData('Nama Institusi', 'SMU NEGERI 1 CIBEBER', 'Jurusan', '-'),
    createData('Lulus', '2003', 'Tempat', 'CIANJUR'),
];

const rows_D3 = [
    createData('Nama Institusi', 'POLITEKNIK POS INDONESIA', 'Jurusan', 'LOGISTIK BISNIS'),
    createData('Lulus', '2006', 'Tempat', 'BANDUNG'),
];

const rows_S1 = [
    createData('Nama Institusi', 'SEKOLAH TINGGI ILMU ADMINISTRASI BINA BANUA BANJARMASIN', 'Jurusan', 'ADMINISTRASI BISNIS'),
    createData('Lulus', '2009', 'Tempat', 'BANJARMASIN'),
];

const rows_S2 = [
    createData('Nama Institusi', 'UNIVERSITAS WIDYATAMA', 'Jurusan', 'MANAJEMEN'),
    createData('Lulus', '2020', 'Tempat', 'BANDUNG'),
];

const rows_S3 = [
    createData('Nama Institusi', '-', 'Jurusan', '-'),
    createData('Lulus', '-', 'Tempat', '-'),
];

export default function RiwayatPendidikanKaryawan() {
    const boxStyle = {
        padding: '20px', 
        width: '100%',
        borderRadius:'12px',
    };

    return (
        <Box sx={boxStyle}>
            <EmpatKolomDataKaryawan tabletitle={'SD dan Sederajat'} rows={rows_SD} widthDataCell={264}/>
            <EmpatKolomDataKaryawan tabletitle={'SMP dan Sederajat'} rows={rows_SMP} widthDataCell={264}/>
            <EmpatKolomDataKaryawan tabletitle={'SMA dan Sederajat'} rows={rows_SMA} widthDataCell={264}/>
            <EmpatKolomDataKaryawan tabletitle={'DIPLOMA III / D-3'} rows={rows_D3} widthDataCell={264}/>
            <EmpatKolomDataKaryawan tabletitle={'Strata-1 atau Sarjana'} rows={rows_S1} widthDataCell={264}/>
            <EmpatKolomDataKaryawan tabletitle={'Strata-2 atau Magister'} rows={rows_S2} widthDataCell={264}/>
            <EmpatKolomDataKaryawan tabletitle={'Strata-3 atau Doktor'} rows={rows_S3} widthDataCell={264}/>
        </Box>
    );
}
