import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { AddCircleOutlineOutlined } from '@mui/icons-material';

function KonfirmasiTambahBPJ({ open, handleClose, eventid, nippos, onConfirm }) {

    const tambahdatabpj = (eventid, nippos) => {
        return fetch('http://localhost:4000/assignasbpj', {
            method: 'POST', // Specify the HTTP method (POST, GET, etc.)
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify({
                // Include any data you want to send in the request body
                eventtalentid: eventid,
                nippos: nippos
            }) // Convert the bodyData object to a JSON string
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data; // Return the parsed JSON data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error; // Rethrow the error to handle it elsewhere
            });
    };


    const TambahDataButtonStyle = {
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
    
    const hoverTambahDataStyle = {
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

    const [isHoveredTambahData, setIsHoveredTambahData] = useState(false);
    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

    const TambahDataButton = (
        <Button
            endIcon={<AddCircleOutlineOutlined />}
            style={isHoveredTambahData ? { ...TambahDataButtonStyle, ...hoverTambahDataStyle } : TambahDataButtonStyle}
            onMouseEnter={() => setIsHoveredTambahData(true)}
            onMouseLeave={() => setIsHoveredTambahData(false)}
            onClick={async () => {
                try {
                    await tambahdatabpj(eventid,nippos);
                    handleClose();
                    onConfirm();
                } catch (error) {
                    // Handle error if notifkasikaryawan() fails
                    console.error("Error:", error);
                    // Optionally, you can show an error message to the user
                }
            }}
        >
            Tambah Data
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
                    Konfirmasi Tambah BPJ
                </Typography>
            </DialogTitle>
            <DividerContainer>
                <Divider orientation="horizontal" flexItem /> 
            </DividerContainer>
            <DialogContent>
                <Box>
                    <div>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginTop: '16px' }}>
                            Apakah anda yakin menambah Anggota BPJ yang sudah dipilih?
                        </Typography>
                        <Typography style={{textAlign:'center', color:'#828282', fontSize:'14px', marginTop:'16px', marginBottom: '24px'}}>
                            Anda dapat mengubah data di kemudian hari.
                        </Typography>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions sx={{padding:'0 24px 24px 24px '}}>
                <ButtonsContainer>
                    {batalkanButton}
                    {TambahDataButton}
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default KonfirmasiTambahBPJ;