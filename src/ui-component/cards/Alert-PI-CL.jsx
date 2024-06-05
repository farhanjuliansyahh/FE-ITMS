import React from 'react';
import { Typography } from '@mui/material';
export default function ConfirmationMessage() {
    return (
        <div style={{ display: 'block', backgroundColor: '#F5FFF5', borderRadius: '12px', padding: '24px', gap: '12px'}}>
            <Typography fontWeight={600} fontSize={16} color='#66BB6A'>
                Selamat !!!
            </Typography>
            <Typography fontWeight={600} fontSize={14} color='#1F1F1F'>
                Anda dinyatakan sebagai Kandidat Talent POSIND
            </Typography>
            <Typography fontWeight={400} fontSize={12} color={'#828282'} marginTop={2} marginBottom={2}>
                Jika berminat silahkan konfirmasi dengan menyetujui Pakta Integritas dan Commitment Letter dibawah ini.
            </Typography>
        </div>
    );
};
