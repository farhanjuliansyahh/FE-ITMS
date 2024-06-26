import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { toast } from 'react-toastify';
import.meta.env.VITE_API_BASE_URL

function KonfirmasiSubmitTalentProfile({ open, handleClose, activeEvent, confirm }) { 
    const url = import.meta.env.VITE_API_BASE_URL
    
    const loloskanprofile = async () => {
        try {
            // Make an HTTP DELETE request to your API endpoint
            const response = await fetch(url + `loloskanprofile`, {
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
            if (!response.ok) {
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
                    await notifpool(activeEvent)
                    await confirm();
                    handleClose();
                    toast.success('Submit semua talent berhasil !');
                } catch (error) {
                    // Handle error if loloskanprofile() fails
                    console.error("Error:", error);
                    // Optionally, you can show an error message to the user
                    toast.error('Gagal submit semua talant !');
                }
            }}
        >
            Perbaharui Status
        </Button>
    );

    const notifpool = (eventid) => {
        return fetch(url + 'notiftalent', {
          method: 'POST', // Specify the HTTP method (POST, GET, etc.)
          headers: {
            'Content-Type': 'application/json' // Specify the content type
          },
          body: JSON.stringify({
            // Include any data you want to send in the request body
            eventtalentid: eventid
          }) // Convert the bodyData object to a JSON string
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            return data; // Return the parsed JSON data
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to handle it elsewhere
          });
      };

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