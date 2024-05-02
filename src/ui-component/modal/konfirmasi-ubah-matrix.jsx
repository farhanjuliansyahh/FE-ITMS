import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Button, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CancelOutlined, CheckCircleOutlined } from '@mui/icons-material';

function KonfirmasiUbahMatrix({ open, onClose, onConfirm }) {    
    const YakinButtonStyle = {
        backgroundColor: '#1C2D5A',
        color:'#fff',
        borderRadius: '12px',
        padding : '14px 24px',
        transition: 'background-color 0.3s'
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

    const handleConfirm = () => {
        // onConfirm();
        onClose();
    };

    const YakinButton = (
        <Button
            endIcon={<CheckCircleOutlined />}
            style={isHoveredYakin ? { ...YakinButtonStyle, ...hoverYakinStyle } : YakinButtonStyle}
            onMouseEnter={() => setIsHoveredYakin(true)}
            onMouseLeave={() => setIsHoveredYakin(false)}
            onClick={handleConfirm}
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
                    Konfirmasi Ubah Kategori Matrix
                </Typography>
            </DialogTitle>
            <DividerContainer>
                <Divider orientation="horizontal" flexItem /> 
            </DividerContainer>
            <DialogContent>
                <Box>
                    <div>
                        <Typography variant="subtitle1" sx={{fontFamily: 'Roboto', fontSize: '14px', fontWeight: 600, lineHeight: '20px', letterSpacing: '0.5px', textAlign: 'center' }}>
                            Apakah anda yakin mengubah matrix data karyawan yang dipilih?
                        </Typography>
                        <Typography variant="body1" sx={{ width: '90%', margin: 'auto', marginTop: '24px', marginBottom: '24px', fontFamily: 'Roboto', fontSize: '14px', fontWeight: 400, lineHeight: '20px', letterSpacing: '0.5px', textAlign: 'center' }}>
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
