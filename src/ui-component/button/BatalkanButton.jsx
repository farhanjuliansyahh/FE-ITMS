import React from 'react';
import Button from '@mui/material/Button';
import CancelOutlined from '@mui/icons-material/CancelOutlined';

function BatalkanButton() {
  return (
    <Button
      variant="contained"
      sx={{
        color: '#D32F2F', // Warna teks
        backgroundColor: '#FFFFFF', // Warna latar belakang
        border: '1px solid #D32F2F', // Warna dan lebar border
        borderRadius: '15px', // Radius border
        '&:hover': {
          backgroundColor: '#D32F2F', // Warna latar belakang saat hover
          color: '#FFFFFF', // Warna teks saat hover
        },
      }}
      endIcon={<CancelOutlined />}
    >
      Batalkan
    </Button>
  );
}

export default BatalkanButton;
