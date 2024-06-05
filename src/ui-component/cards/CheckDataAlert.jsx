import React from 'react';
import { Typography, Button } from '@mui/material';
import { ArrowForwardOutlined } from '@mui/icons-material';

function CheckDataAlert() {
  return (
    <div style={{ display: 'block', backgroundColor: '#FFF6E9', borderRadius: '12px', padding: '24px', gap: '12px' }}>
      <Typography fontWeight={600} fontSize={16} color={'#FFA726'}>
        Perhatian
      </Typography>
      <Typography fontWeight={600} fontSize={14}>
        Jika data di bawah ini ada yang tidak sesuai, silakan ubah melalui SIM SDM PosIND
      </Typography>
      <Typography fontWeight={400} fontSize={12} color={'#828282'} marginTop={2} marginBottom={2}>
        Mohon periksa kembali agar menghindari kesalahan data di sistem ITMS Nova
      </Typography>
      <Button
        component="a"
        href="https://simsdm.posindonesia.co.id/" // Replace with your desired URL
        sx={{
          padding: '6px 16px',
          borderRadius: '12px',
          color: '#FFFFFF',
          backgroundColor: '#EF4123',
          '&:hover': {
            backgroundColor: '#AB1D05' // Change color on hover if needed
          }
        }}
        endIcon={<ArrowForwardOutlined />}
      >
        SIM SDM PosIND
      </Button>
    </div>
  );
}

export default CheckDataAlert;
