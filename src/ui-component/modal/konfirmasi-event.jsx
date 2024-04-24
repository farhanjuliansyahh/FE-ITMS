import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function KonfirmasiNextEvent({ open, handleClose }) {
    const mulaiButtonStyle = {
        backgroundColor: '#1C2D5A',
        color:'#fff',
        borderRadius: '12px',
        padding : '14px 24px',
        transition: 'background-color 0.3s',
    };

    const batalkanButtonStyle = {
        backgroundColor: '#D32F2F',
        color:'#fff',
        borderRadius: '12px',
        padding : '14px 24px',
        transition: 'background-color 0.3s',
        fontSize: '14px'
    };
    
    const hovermulaiStyle = {
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

    const [isHoveredmulai, setIsHoveredmulai] = useState(false);
    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

    const mulaiButton = (
        <Button
            endIcon={<ArrowForwardRoundedIcon />}
            style={isHoveredmulai ? { ...mulaiButtonStyle, ...hovermulaiStyle } : mulaiButtonStyle}
            onMouseEnter={() => setIsHoveredmulai(true)}
            onMouseLeave={() => setIsHoveredmulai(false)}
        >
            Mulai Event
        </Button>
    );

    const batalkanButton = (
        <Button
            endIcon={<CancelOutlinedIcon />}
            style={isHoveredBatalkan ? { ...batalkanButtonStyle, ...hoverBatalkanStyle } : batalkanButtonStyle}
            onMouseEnter={() => setIsHoveredBatalkan(true)}
            onMouseLeave={() => setIsHoveredBatalkan(false)}
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
                <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign:'center', marginTop: '10px' }}>
                    Konfirmasi Mulai Event
                </Typography>
            </DialogTitle>
            <DividerContainer>
                <Divider orientation="horizontal" flexItem /> 
            </DividerContainer>
            <DialogContent>
                <Box
                    component="form"
                    sx={{'& .MuiTextField-root': { m: 1, width: '500px' }}}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        {/* <TextField
                            required
                            id="outlined-required"
                            label="Tanggal Berakhir Talent Profile"
                        /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoItem>
                            <DatePicker
                                disableFuture
                                views={['year', 'month', 'day']}
                                InputLabelProps={{ shrink: true }}
                                label="Tanggal Berakhir Talent Source *"
                                required
                            />
                            </DemoItem>
                        </LocalizationProvider>
                        <Typography style={{textAlign:'center', fontWeight:'bold', fontSize:'14px', marginTop:'16px'}}>
                        Apakah anda yakin memulai Event ini?
                        </Typography>
                        <Typography style={{textAlign:'center', color:'#828282', fontSize:'14px', marginTop:'16px'}}>
                        Anda tidak dapat menghapus event setelah dimulai.
                        </Typography>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions sx={{padding:'0 24px 24px 24px '}}>
                <ButtonsContainer>
                    {batalkanButton}
                    {mulaiButton}
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default KonfirmasiNextEvent;