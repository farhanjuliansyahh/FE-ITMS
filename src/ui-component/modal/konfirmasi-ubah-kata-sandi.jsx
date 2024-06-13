import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { toast } from 'react-toastify';
import.meta.env.VITE_API_BASE_URL;

function KonfirmasiUbahKataSandi({ open, handleClose, nippos, passwordLama, passwordBaru }) {
  const url = import.meta.env.VITE_API_BASE_URL;

  const gantiPass = async (nippos, passwordLama, passwordBaru) => {
    try {
      const response = await fetch(url + 'gantipassword', {
        // Added correct path
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nippos, passwordLama, passwordBaru })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const UbahKataSandiButtonStyle = {
    backgroundColor: '#1C2D5A',
    color: '#fff',
    borderRadius: '12px',
    padding: '14px 24px',
    transition: 'background-color 0.3s'
  };

  const batalkanButtonStyle = {
    backgroundColor: '#D32F2F',
    color: '#fff',
    borderRadius: '12px',
    padding: '14px 24px',
    transition: 'background-color 0.3s',
    fontSize: '14px'
  };

  const hoverUbahKataSandiStyle = {
    backgroundColor: '#122350' // Darker shade for hover
  };

  const hoverBatalkanStyle = {
    backgroundColor: '#B71C1C' // Darker shade for hover
  };

  const ButtonsContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '0px 8px',
    gap: '16px',
    justifyContent: 'space-between'
  });

  const [isHoveredUbahKataSandi, setIsHoveredUbahKataSandi] = useState(false);
  const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

  const UbahKataSandiButton = (
    <Button
      endIcon={<CheckCircleOutlineOutlinedIcon />}
      style={isHoveredUbahKataSandi ? { ...UbahKataSandiButtonStyle, ...hoverUbahKataSandiStyle } : UbahKataSandiButtonStyle}
      onMouseEnter={() => setIsHoveredUbahKataSandi(true)}
      onMouseLeave={() => setIsHoveredUbahKataSandi(false)}
      onClick={async () => {
        try {
          await gantiPass(nippos, passwordLama, passwordBaru); // Call the function here
          handleClose();
          toast.success('Kata sandi telah berhasil diubah!');
        } catch (error) {
          console.error('Error:', error);
          toast.error('Terjadi kesalahan saat mengubah kata sandi Anda.');
        }
      }}
    >
      Ubah Kata Sandi
    </Button>
  );

  const batalkanButton = (
    <Button
      endIcon={<CancelOutlinedIcon />}
      style={isHoveredBatalkan ? { ...batalkanButtonStyle, ...hoverBatalkanStyle } : batalkanButtonStyle}
      onMouseEnter={() => setIsHoveredBatalkan(true)}
      onMouseLeave={() => setIsHoveredBatalkan(false)}
      onClick={handleClose}
    >
      Batalkan
    </Button>
  );

  const DividerContainer = styled('div')({
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#E0E0E0'
  });

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginTop: '10px' }}>
          Konfirmasi Ubah Kata Sandi
        </Typography>
      </DialogTitle>
      <DividerContainer>
        <Divider orientation="horizontal" flexItem />
      </DividerContainer>
      <DialogContent>
        <Box>
          <div>
            <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginTop: '16px' }}>
              Apakah anda yakin mengubah Kata Sandi?
            </Typography>
            <Typography style={{ textAlign: 'center', color: '#828282', fontSize: '14px', marginTop: '16px', marginBottom: '24px' }}>
              Perubahan Kata Sandi ini hanya mengubah Kata Sandi di sistem ITMS Nova
            </Typography>
          </div>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '0 24px 24px 24px ' }}>
        <ButtonsContainer>
          {batalkanButton}
          {UbahKataSandiButton}
        </ButtonsContainer>
      </DialogActions>
    </Dialog>
  );
}

export default KonfirmasiUbahKataSandi;
