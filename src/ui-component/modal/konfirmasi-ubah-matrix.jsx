import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Button, Typography, Divider, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CancelOutlined, CheckCircleOutlined } from '@mui/icons-material';

function KonfirmasiUbahMatrix({ open, onClose, onConfirm, terpilih, kuota }) {    
    const YakinButtonStyle = {
        backgroundColor: '#1C2D5A',
        color:'#fff',
        borderRadius: '12px',
        padding : '14px 24px',
        transition: 'background-color 0.3s',
        cursor: 'pointer'
    };

    const batalkanButtonStyle = {
        backgroundColor: '#D32F2F',
        color:'#fff',
        borderRadius: '12px',
        padding : '14px 24px',
        transition: 'background-color 0.3s',
        fontSize: '14px'
    };

    const hoverYakinStyle = {
        backgroundColor: '#122350' // Darker shade for hover
    };

    const hoverBatalkanStyle = {
        backgroundColor: '#B71C1C' // Darker shade for hover
    };

    const disabledButtonStyle = {
        backgroundColor: '#9e9e9e',
        color: '#ffffff',
        borderRadius: '12px',
        padding : '14px 24px',
        transition: 'background-color 0.3s',
        cursor: 'pointer'
    };

    const ButtonsContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        width:'100%',
        padding: '0px 8px',
        gap:'16px',
        justifyContent: 'space-between'
    });

    const [isHoveredYakin, setIsHoveredYakin] = useState(false);
    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);
    const [reason, setReason] = useState(''); // State to store the reason entered in the TextField

    const handleReasonChange = (event) => {
        setReason(event.target.value); // Update the reason state when the TextField value changes
    };

    const handleConfirm = () => {
        onConfirm(reason);
        onClose();
    };

    const YakinButton = (
        <Button
            endIcon={<CheckCircleOutlined />}
            style={reason ? (isHoveredYakin ? { ...YakinButtonStyle, ...hoverYakinStyle } : YakinButtonStyle) : disabledButtonStyle}
            onMouseEnter={() => setIsHoveredYakin(true)}
            onMouseLeave={() => setIsHoveredYakin(false)}
            onClick={handleConfirm}
            disabled={!reason}
        >
            Yakin
        </Button>
    );

    const batalkanButton = (
        <Button
            endIcon={<CancelOutlined />}
            style={isHoveredBatalkan ? { ...batalkanButtonStyle, ...hoverBatalkanStyle } : batalkanButtonStyle}
            onMouseEnter={() => setIsHoveredBatalkan(true)}
            onMouseLeave={() => setIsHoveredBatalkan(false)}
            onClick={onClose}
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
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign:'center', marginTop: '10px' }}>
                    Konfirmasi Perubahan Kategori Matrix
                </Typography>
            </DialogTitle>
            <DividerContainer>
                <Divider orientation="horizontal" flexItem /> 
            </DividerContainer>
            <DialogContent>
                <Box>
                    <div>
                        <TextField
                            required
                            id="reason"
                            label="Alasan Perubahan Kategori Matrix"
                            multiline
                            rows={4}
                            value={reason} // Bind the value of the TextField to the reason state
                            onChange={handleReasonChange} // Handle changes in the TextField value
                            sx={{ width: '100%', marginBottom: '16px' }}
                        />
                      <Typography 
    variant="subtitle1" 
    sx={{
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px',
      letterSpacing: '0.5px',
      textAlign: 'center'
    }}
  >
    Apakah anda yakin mengubah kategori matrix data karyawan yang dipilih?
  </Typography>
  <Typography
    variant="subtitle1" 
    sx={{
      fontFamily: 'Roboto',
      fontSize: '14px',
      fontWeight: 600,
      lineHeight: '20px',
      letterSpacing: '0.5px',
      textAlign: 'center'
    }}
  >
    Kuota Diskresi Anda <span style={{color: '#F44336' }}>{terpilih}</span> dari <span style={{color: '#F44336' }}>{kuota}</span> karyawan
  </Typography>
                        <Typography variant="body1" sx={{ width: '90%', margin: 'auto', marginTop: '16px', marginBottom: '16px', fontFamily: 'Roboto', fontSize: '14px', fontWeight: 400, lineHeight: '20px', letterSpacing: '0.5px', textAlign: 'center' }}>
                            Anda tidak dapat membatalkan perubahan dan mengubah kategori matrix hanya diizinkan 1 kali saja.
                        </Typography>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions sx={{padding:'0 24px 24px 24px '}}>
                <ButtonsContainer>
                    {batalkanButton}
                    {YakinButton}
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default KonfirmasiUbahMatrix;
