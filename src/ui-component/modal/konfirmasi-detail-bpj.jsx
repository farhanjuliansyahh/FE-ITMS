import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { toast } from 'react-toastify';

function KonfirmasiDetailBPJ({ open, handleClose, handleCloseBatalkan, eventid, selectedTipe, selectedDate, selectedLokasi }) {

    const eventactive = eventid
    const notifikasikaryawan = (eventid, jenis_bpj,tanggal_bpj, lokasi_bpj) => {
        return fetch('http://localhost:4000/notifbpj', {
            method: 'POST', // Specify the HTTP method (POST, GET, etc.)
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify({
                // Include any data you want to send in the request body
                eventtalentid: eventid,
                jenis_bpj: jenis_bpj,
                tanggal_bpj: tanggal_bpj,
                lokasi_bpj: lokasi_bpj
            }) // Convert the bodyData object to a JSON string
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                toast.success('Notifikasi berhasil dikirim !');
                return data; // Return the parsed JSON data
            })
            .catch(error => {
                toast.error('Gagal mengirim Notifikasi !');
                console.error('Error fetching data:', error);
                throw error; // Rethrow the error to handle it elsewhere
            });
    };

    const KirimNotifikasiButtonStyle = {
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
    
    const hoverKirimNotifikasiStyle = {
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

    const [isHoveredKirimNotifikasi, setIsHoveredKirimNotifikasi] = useState(false);
    const [isHoveredBatalkan, setIsHoveredBatalkan] = useState(false);

    const KirimNotifikasiButton = (
        <Button
            endIcon={<CheckCircleOutlineOutlinedIcon />}
            style={isHoveredKirimNotifikasi ? { ...KirimNotifikasiButtonStyle, ...hoverKirimNotifikasiStyle } : KirimNotifikasiButtonStyle}
            onMouseEnter={() => setIsHoveredKirimNotifikasi(true)}
            onMouseLeave={() => setIsHoveredKirimNotifikasi(false)}
            onClick={async () => {
                try {
                    await notifikasikaryawan(eventactive, selectedTipe, selectedDate, selectedLokasi);
                    handleClose();
                } catch (error) {
                    // Handle error if notifkasikaryawan() fails
                    console.error("Error:", error);
                    // Optionally, you can show an error message to the user
                }
            }}
        >
            Kirim Notifikasi
        </Button>
    );

    const batalkanButton = (
        <Button
            endIcon={<CancelOutlinedIcon />}
            style={isHoveredBatalkan ? { ...batalkanButtonStyle, ...hoverBatalkanStyle } : batalkanButtonStyle}
            onMouseEnter={() => setIsHoveredBatalkan(true)}
            onMouseLeave={() => setIsHoveredBatalkan(false)}
            onClick={handleCloseBatalkan}
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
        <Dialog open={open} onClose={handleCloseBatalkan}>
            <DialogTitle>
                <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign:'center', marginTop: '10px' }}>
                    Konfirmasi Detail BPJ
                </Typography>
            </DialogTitle>
            <DividerContainer>
                <Divider orientation="horizontal" flexItem /> 
            </DividerContainer>
            <DialogContent>
                <Box>
                    <div>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginTop: '16px' }}>
                            Apakah anda yakin data tipe, tanggal, dan lokasi sudah sesuai?
                        </Typography>
                        <Typography style={{textAlign:'center', color:'#828282', fontSize:'14px', marginTop:'16px', marginBottom: '24px'}}>
                            Anda tidak dapat mengubah data di kemudian hari.
                        </Typography>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions sx={{padding:'0 24px 24px 24px '}}>
                <ButtonsContainer>
                    {batalkanButton}
                    {KirimNotifikasiButton}
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default KonfirmasiDetailBPJ;