import * as React from 'react';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { Stack, Typography } from '@mui/material';

export default function AlertUbahSandi() {
    return (
        <div style={{ display: 'block', backgroundColor: '#FFF6E9', borderRadius: '12px', padding: '24px', gap: '12px' }}>
            <Stack direction="row" alignItems={"center"} marginBottom={'12px'} >
                <InfoOutlined sx={{ color: '#FFA726' }} />
                <Typography fontWeight={600} fontSize={16} color={'#FFA726'} marginLeft={'10px'} >
                    Perhatian
                </Typography>
            </Stack>
            <Typography fontWeight={600} fontSize={14} marginBottom={'12px'}>
                Perubahan Kata Sandi ini akan mengubah seluruh Kata Sandi yang terhubung dengan SIM SDM
            </Typography>
            <Typography fontWeight={400} fontSize={14} color={'#828282'}>
                Petunjuk untuk membuat Kata Sandi yang kuat:
                <ul style={{ paddingLeft: '16px', marginTop: '8px', marginBottom: '8px' }}>
                    <li>Minimal 8 karakter</li>
                    <li>Mengandung huruf kapital</li>
                    <li>Mengandung huruf kecil</li>
                    <li>Mengandung angka</li>
                </ul>
            </Typography>
            <Typography fontWeight={400} fontSize={14} color={'#1F1F1F'}>
                Bukan merupakan kata yang mudah ditebak. <br />
                Ganti Kata Sandi secara berkala.
            </Typography>
        </div>
    )
}