import React from 'react';
import { Typography, Button } from '@mui/material';
import { ArrowForwardOutlined } from '@mui/icons-material';

function KuotaKomiteUnitAlert({totalKaryawan, halfLength}) {

    return (
        <div style={{ display: 'block', backgroundColor: '#FFF6E9', borderRadius: '12px', padding: '24px', gap: '12px'}}>
            <Typography fontWeight={600} fontSize={16} color={'#FFA726'}>
                Perhatian
            </Typography>
            <Typography fontWeight={600} fontSize={14}>
                Kuota anda adalah {halfLength} orang dari total {totalKaryawan} karyawan
            </Typography>
            <Typography fontWeight={400} fontSize={12} color={'#828282'} marginTop={2} marginBottom={2}>
                Pilih karyawan terbaik anda sesuai dengan jumlah yang sudah ditentukan di atas
            </Typography>
           
        </div>
    );
}

export default KuotaKomiteUnitAlert;