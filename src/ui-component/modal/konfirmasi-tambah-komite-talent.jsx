import React, { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Divider } from '@mui/material';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';

function KonfirmasiTambahKomiteTalent({ open, handleClose, nippos, nama, onConfirm, komiteTalentId }) {
    const [TotalAddedMember, setTotalAddedMember] = useState([]);

    const fetchTotalAddedMember = (nippos) => {
        fetch(`http://localhost:4000/gettotaladdedmember?nippos=${nippos}`)
            .then(response => response.json())
            .then(data => {
                setTotalAddedMember(data.map((row, index) => ({ ...row, id: index + 1 })));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        setTotalAddedMember([]);
        if (nippos) {
            fetchTotalAddedMember(nippos);
        }
    }, [nippos, komiteTalentId]);

    const tambahdatakomitetalent = (komiteTalentId, nippos) => {
        return fetch('http://localhost:4000/assignaskomitetalent', {
            method: 'POST', // Specify the HTTP method (POST, GET, etc.)
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify({
                // Include any data you want to send in the request body
                komiteTalentId: komiteTalentId,
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
        color: '#fff',
        borderRadius: '12px',
        padding: '14px 24px',
        transition: 'background-color 0.3s'
    };

    const batalkanButtonStyle = {
        backgroundColor: '#D32F2F',
        color: '#fff',
        borderRadius: '12px',
        padding: '14px 24px',
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
        width: '100%',
        padding: '0px 8px',
        gap: '16px',
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
                    await tambahdatakomitetalent(komiteTalentId, nippos);
                    toast.success('Data berhasil dimasukkan.');
                    handleClose();
                    onConfirm();
                } catch (error) {
                    if (error.message === "Network response was not ok") {
                        toast.error('Data sudah ada.');
                        handleClose();
                    } else {
                        console.error("Error:", error);
                    }
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
                <Typography style={{ fontSize: '24px', fontWeight: '700', textAlign: 'center', marginTop: '10px' }}>
                    Konfirmasi Tambah Anggota Komite Talent
                </Typography>
            </DialogTitle>
            <DividerContainer>
                <Divider orientation="horizontal" flexItem />
            </DividerContainer>
            <DialogContent>
                <Box>
                    <div>
                        <Typography style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginTop: '16px' }}>
                            Apakah anda yakin menambah Anggota Komite Talent yang sudah dipilih?
                        </Typography>
                        <Typography style={{ textAlign: 'center', color: '#828282', fontSize: '14px', marginTop: '16px', marginBottom: '24px' }}>
                            Anda akan menambah
                            <span style={{ color: '#1C2D5A', fontWeight: 'bold' }}> {nama} </span>
                            {TotalAddedMember.length > 1 && (
                                <>
                                    dan <span style={{ color: '#1C2D5A', fontWeight: 'bold' }}>{TotalAddedMember.length - 1} </span>
                                    karyawan lainnya
                                    <br /> dengan jabatan dan bagian yang sama&nbsp;
                                </>
                            )}
                            ke daftar anggota komite talent.
                        </Typography>
                    </div>
                </Box>
            </DialogContent>
            <DialogActions sx={{ padding: '0 24px 24px 24px ' }}>
                <ButtonsContainer>
                    {batalkanButton}
                    {TambahDataButton}
                </ButtonsContainer>
            </DialogActions>
        </Dialog>
    );
}

export default KonfirmasiTambahKomiteTalent;