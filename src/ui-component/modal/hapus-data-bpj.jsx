import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Button, MenuItem, TextField, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';


function HapusDataBPJ({ open, handleClose }) {
    const HapusDataBPJButtonStyle = {
        border: '1px solid #EF4123',
        color: '#EF4123',
        borderRadius: '12px',
        padding: '14px 24px',
        transition: 'background-color 0.3s',
        fontSize: '14px'
    };

    const batalkanButtonStyle = {
        backgroundColor: '#D32F2F',
        color: '#fff',
        borderRadius: '12px',
        padding: '14px 24px',
        transition: 'background-color 0.3s',
        fontSize: '14px'
    };

    const hoverHapusDataBPJStyle = {
        backgroundColor: '#D32F2F',
        color: '#fff',
    };

    const hoverBatalkanStyle = {
        backgroundColor: '#B71C1C' 
    };

    const ButtonsContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '0px 8px',
        gap: '128px',
        justifyContent: 'space-between'
    });

    const [IsHoverHapusDataBPJ, setIsHoverHapusDataBPJ] = useState(false);
    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

    const HapusDataBPJButton = (
        <Button
            endIcon={<DeleteOutlineRoundedIcon />}
            style={IsHoverHapusDataBPJ ? { ...HapusDataBPJButtonStyle, ...hoverHapusDataBPJStyle } : HapusDataBPJButtonStyle}
            onMouseEnter={() => setIsHoverHapusDataBPJ(true)}
            onMouseLeave={() => setIsHoverHapusDataBPJ(false)}
        >
            Ya, Hapus Data
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
        <Dialog open={open} onClose={handleClose} >
            <DialogTitle>
                <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginTop: '10px' }}>
                    Hapus Data
                </Typography>
            </DialogTitle>
            <DividerContainer>
                <Divider orientation="horizontal" flexItem />
            </DividerContainer>
            <DialogContent>
                <Box>
                    <div>
                        <Typography style={{textAlign:'center', fontWeight:'bold', fontSize:'14px', marginTop:'16px'}}>
                            Apakah anda yakin menghapus data BPJ ini?
                        </Typography>
                        <Typography style={{textAlign:'center', color:'#828282', fontSize:'14px', marginTop:'16px', marginBottom: '16px'}}>
                            Anda tidak dapat mengembalikan data yang sudah dihapus.
                        </Typography>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions sx={{ padding: '0 24px 24px 24px ' }}>
                <ButtonsContainer>
                    {batalkanButton}
                    {HapusDataBPJButton}
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default HapusDataBPJ;