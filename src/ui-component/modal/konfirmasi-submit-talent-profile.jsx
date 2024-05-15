import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

function KonfirmasiSubmitTalentProfile({ open, handleClose, activeEvent, confirm }) { 
    
    const loloskanprofile = async () => {
        try {
            // Make an HTTP DELETE request to your API endpoint
            const response = await fetch(`http://localhost:4000/loloskanprofile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any other headers if needed
                },
                body: JSON.stringify({
                    // Include any data you want to send in the request body
                    eventid: activeEvent
                })
                // You can pass any data in the request body if required
                // body: JSON.stringify({}),
            });
    
            // Check if the request was successful (status code 200-299)
            if (response.ok) {
                // If successful, handle the response or perform any necessary actions
                console.log('Data updated successfully');
            } else {
                // If not successful, throw an error or handle the error response
                throw new Error('Failed to update data');
            }
        } catch (error) {
            // Handle any errors that occurred during the process
            console.error('Error update data:', error.message);
        }
    };
    const PerbaharuiButtonStyle = {
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
    
    const hoverPerbaharuiStyle = {
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

    const [isHoveredPerbaharui, setIsHoveredPerbaharui] = useState(false);
    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

    const PerbaharuiButton = (
        <Button
            endIcon={<CheckCircleOutlineOutlinedIcon />}
            style={isHoveredPerbaharui ? { ...PerbaharuiButtonStyle, ...hoverPerbaharuiStyle } : PerbaharuiButtonStyle}
            onMouseEnter={() => setIsHoveredPerbaharui(true)}
            onMouseLeave={() => setIsHoveredPerbaharui(false)}
            onClick={async () => {
                try {
                    await loloskanprofile();
                    await confirm();
                    handleClose();
                } catch (error) {
                    // Handle error if loloskanprofile() fails
                    console.error("Error:", error);
                    // Optionally, you can show an error message to the user
                }
            }}
        >
            Perbaharui Status
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
                    Konfirmasi Submit Semua Talent
                </Typography>
            </DialogTitle>
            <DividerContainer>
                <Divider orientation="horizontal" flexItem /> 
            </DividerContainer>
            <DialogContent>
                <Box>
                    <div>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginTop: '16px' }}>
                            Apakah anda yakin memperbaharui status talent menjadi sudah submit?
                        </Typography>
                        <Typography style={{textAlign:'center', color:'#828282', fontSize:'14px', marginTop:'16px', marginBottom: '24px'}}>
                            Anda tidak dapat mengubah status di kemudian hari.
                        </Typography>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions sx={{padding:'0 24px 24px 24px '}}>
                <ButtonsContainer>
                    {batalkanButton}
                    {PerbaharuiButton}
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default KonfirmasiSubmitTalentProfile;