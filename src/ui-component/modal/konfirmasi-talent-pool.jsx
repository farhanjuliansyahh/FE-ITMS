import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

function KonfirmasiTalentPool({ open, handleClose, handleConfirmation, eventid }) {    
    const eventaktif = eventid;
    console.log("aktif", eventid);

    const statusselesai = async () => {
        try {
            // Make the POST request to the API endpoint
            const response = await fetch('http://localhost:4000/statusselesai', {
                
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // Include any data you want to send in the request body
                    eventid : eventaktif})
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error('Failed to post data');
            }

            // If successful, handle the response data (if needed)
            const responseData = await response.json();
            console.log('Response data:', responseData);
        } catch (error) {
            // Handle any errors that occur during the API call
            console.error('Error posting data:', error.message);
        }
    };

    const handleSelesai = () => {
        statusselesai().then(() => {
            handleConfirmation();
        });
    };

    const SelesaiButtonStyle = {
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
    
    const hoverSelesaiStyle = {
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

    const [isHoveredSelesai, setIsHoveredSelesai] = useState(false);
    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

    const SelesaiButton = (
        <Button
            endIcon={<CheckCircleOutlinedIcon />}
            style={isHoveredSelesai ? { ...SelesaiButtonStyle, ...hoverSelesaiStyle } : SelesaiButtonStyle}
            onMouseEnter={() => setIsHoveredSelesai(true)}
            onMouseLeave={() => setIsHoveredSelesai(false)}
            onClick={handleSelesai}
        >
            Selesai
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
                <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign:'center', marginTop: '10px' }}>
                    Konfirmasi Talent Pool
                </Typography>
            </DialogTitle>
            <DividerContainer>
                <Divider orientation="horizontal" flexItem /> 
            </DividerContainer>
            <DialogContent>
                <Box>
                    <div>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginTop: '16px' }}>
                            Apakah anda yakin seluruh event sudah selesai?
                        </Typography>
                        <Typography style={{textAlign:'center', color:'#828282', fontSize:'14px', marginTop:'16px', marginBottom: '24px'}}>
                            Anda tidak dapat kembali ke tahap sebelumnya jika klik selesai.
                        </Typography>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions sx={{padding:'0 24px 24px 24px '}}>
                <ButtonsContainer>
                    {batalkanButton}
                    {SelesaiButton}
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default KonfirmasiTalentPool;