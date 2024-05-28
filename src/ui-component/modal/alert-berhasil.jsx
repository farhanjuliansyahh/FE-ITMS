import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Typography, IconButton, LinearProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const AlertBerhasil = ({ open, handleClose, Logo, Keterangan }) => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let progressTimer;
    if (open) {
      // Update progress value every 100 milliseconds
      progressTimer = setInterval(() => {
        // Calculate progress value
        const increment = 100 / 30; // 30 steps for 3 seconds
        setProgressValue((prevValue) => prevValue + increment);

        // Clear interval when progress reaches 100%
        if (progressValue >= 100) {
          clearInterval(progressTimer);
        }
      }, 100);
    }

    return () => clearInterval(progressTimer); // Cleanup function
  }, [open, progressValue]);

  return (
    <>
      {/* Full screen background */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)', // Black with 50% opacity
            zIndex: 9998, // Z-index yang lebih rendah dari Snackbar
          }}
          onClick={handleClose} // Close Snackbar when background is clicked
        />
      )}

      <Snackbar
        open={open}
        autoHideDuration={3000} //durasi 3 detik
        onClose={handleClose}
        style={{ 
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 9999, // Z-index yang lebih tinggi dari lapisan transparan
        }}
      >
        <div style={{ 
          position: 'relative',
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          background: '#ffffff', // Background color putih
          borderRadius: '12px', // Sudut melengkung dengan ukuran 12px
          boxShadow: '0px 3px 48px rgba(0, 0, 0, 0.2)', // Efek bayangan untuk memberi kedalaman
          padding: '48px 64px', // Padding untuk jarak antara konten dan tepi div
        }}>

          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            style={{ position: 'absolute', top: '12px', right: '12px' }}
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>

          <img 
            src={Logo} 
            alt="Success" 
            style={{ 
              width: '200px',
              paddingTop: '32px',
              paddingBottom: '32px' 
            }} 
          />

          <Typography 
            style={{ 
              color:'#1C2D5A', 
              fontSize:'18px', 
              fontWeight:550 
            }}
          >
            {Keterangan}
          </Typography>
          
          <LinearProgress variant="determinate" value={progressValue} style={{ width: '100%', height: '10px', marginTop: '24px', borderRadius: '24px' }} />

        </div>
      </Snackbar>
    </>
  );
};

export default AlertBerhasil;
