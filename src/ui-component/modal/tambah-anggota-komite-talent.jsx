import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Button, MenuItem, TextField, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { AddCircleOutlineOutlined } from '@mui/icons-material';

function TambahKomiteTalent({ open, handleClose }) {
    const TambahKomiteTalentButtonStyle = {
        backgroundColor: '#1C2D5A',
        color: '#fff',
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

    const hoverTambahKomiteTalentStyle = {
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
        gap: '128px',
        justifyContent: 'space-between'
    });

    const [IsHoverTambahKomiteTalent, setIsHoverTambahKomiteTalent] = useState(false);
    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

    const TambahKomiteTalentButton = (
        <Button
            endIcon={<AddCircleOutlineOutlined />}
            style={IsHoverTambahKomiteTalent ? { ...TambahKomiteTalentButtonStyle, ...hoverTambahKomiteTalentStyle } : TambahKomiteTalentButtonStyle}
            onMouseEnter={() => setIsHoverTambahKomiteTalent(true)}
            onMouseLeave={() => setIsHoverTambahKomiteTalent(false)}
        >
            Tambah Komite Talent
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
                    Tambah Anggota Komite Talent
                </Typography>
            </DialogTitle>
            <DividerContainer>
                <Divider orientation="horizontal" flexItem />
            </DividerContainer>
            <DialogContent>
                <Box>
                    <TextField
                        select
                        required
                        id="nippos-bpj"
                        label="NIPPOS Komite Talent"
                        sx={{ width: '100%', marginBottom: '16px' }}
                    >
                        <MenuItem value="1">Nama - NIPPOS - Jabatan</MenuItem>
                        {/* Add more options if needed */}
                    </TextField>
                </Box>
            </DialogContent>
            <DialogActions sx={{ padding: '0 24px 24px 24px ' }}>
                <ButtonsContainer>
                    {batalkanButton}
                    {TambahKomiteTalentButton}
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default TambahKomiteTalent;