// Draft Popup

import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { CancelOutlined, CheckCircleOutlineOutlined } from '@mui/icons-material';

function KonfirmasiTambahKomiteUnit({ open, onClose, onConfirm }) {    
    const TambahButtonStyle = {
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
    
    const hoverTambahStyle = {
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

    const [isHoveredTambah, setIsHoveredTambah] = useState(false);
    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

    const TambahButton = (
        <Button
            endIcon={<CheckCircleOutlineOutlined />}
            style={isHoveredTambah ? { ...TambahButtonStyle, ...hoverTambahStyle } : TambahButtonStyle}
            onMouseEnter={() => setIsHoveredTambah(true)}
            onMouseLeave={() => setIsHoveredTambah(false)}
            onClick={onConfirm}
        >
            Tambah
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
                    Konfirmasi Tambah Komite Unit
                </Typography>
            </DialogTitle>
            <DividerContainer>
                <Divider orientation="horizontal" flexItem /> 
            </DividerContainer>
            <DialogContent>
                <Box>
                    <div>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginTop: '16px' }}>
                            Apakah anda yakin menambah komite unit yang anda pilih?                        </Typography>
                        <Typography style={{textAlign:'center', color:'#828282', fontSize:'14px', marginTop:'16px', marginBottom: '24px'}}>
                            Anda tidak dapat membatalkan komite unit yang sudah dipilih.
                        </Typography>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions sx={{padding:'0 24px 24px 24px '}}>
                <ButtonsContainer>
                    {batalkanButton}
                    {TambahButton}
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default KonfirmasiTambahKomiteUnit;