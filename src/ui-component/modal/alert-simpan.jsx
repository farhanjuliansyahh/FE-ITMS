import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Typography } from '@mui/material';

const AlertSimpan = ({ open, handleClose, Severity, Logo, Keterangan }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      style={{ 
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        
      }}
    >
      <MuiAlert
        onClose={handleClose}
        severity={Severity}
        sx={{
          width: '400px',
          height: '230px',
          position: 'relative',
          borderRadius:'12px',
          backgroundColor:"#FFFFFF",
          boxShadow: '0px 4px 40px rgba(0, 0, 0, 0.1)', // Penambahan drop shadow di sini
        }}
      >
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <img src={Logo} alt="Success" style={{ width: '180px', marginTop: '30%' ,marginBottom: '32px' }} /> 
          <Typography style={{color:'#1C2D5A',fontSize:'16px', fontWeight:550}}>{Keterangan}</Typography>
        </div>
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertSimpan;
