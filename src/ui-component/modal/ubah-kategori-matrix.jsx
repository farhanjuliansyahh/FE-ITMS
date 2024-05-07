import React, { useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import { CancelOutlined, CreateOutlined } from '@mui/icons-material';
import KonfirmasiUbahMatrix from './konfirmasi-ubah-matrix';
import UbahMatrix from '../../ui-component/tables/ubahmatrix';

function UbahKategoriMatrix({ open, onClose, onOpenSecondModal }) {
    const [openKonfirmasiModal, setOpenKonfirmasiModal] = useState(false);

    const handleCloseKonfirmasiModal = () => {
        setOpenKonfirmasiModal(false);
    };

    const handleUbahMatrixButtonClick = (event) => {
        // event.stopPropagation(); // Stop event propagation here
        onClose(); // Close the first modal
        onOpenSecondModal(); // Open the second modal
    };

    const ButtonsContainer = (
        <Box sx={{ display: 'flex', alignItems: 'center', width:'100%', padding: '0px 8px', gap:'16px', justifyContent: 'space-between' }}>
            <Button variant="contained" endIcon={<CancelOutlined />} sx={{ width: '100%', bgcolor: '#D32F2F', color: '#fff', borderRadius: '12px', padding: '14px 24px', transition: 'background-color 0.3s', fontSize: '14px', ':hover': { bgcolor: '#B71C1C' } }} 
                onClick={onClose}>
                Batalkan
            </Button>
            {/* <Button variant="contained" endIcon={<CreateOutlined />} sx={{ bgcolor: '#1C2D5A', color: '#fff', borderRadius: '12px', padding: '14px 24px', transition: 'background-color 0.3s', fontSize: '14px', ':hover': { bgcolor: '#122350' } }}
                onClick={handleUbahMatrixButtonClick}>
                Ubah Matrix
            </Button> */}
        </Box>
    );

    const DividerContainer = (
        <Box sx={{ width: '100%', textAlign: 'center', backgroundColor: '#E0E0E0' }}>
            <Divider orientation="horizontal" flexItem /> 
        </Box>
    );

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Typography sx={{ fontSize: '24px', fontWeight: '700', textAlign:'center', marginTop: '10px' }}>
                    Ubah Kategori Matrix
                </Typography>
            </DialogTitle>
            {DividerContainer}
            <DialogContent>
                <Box>
                    <UbahMatrix onOpenSecondModalTable={handleUbahMatrixButtonClick}/>
                    <Typography variant="body1" sx={{ width: '90%', margin: 'auto', marginTop: '24px', marginBottom: '24px', fontFamily: 'Roboto', fontSize: '14px', fontWeight: 400, lineHeight: '20px', letterSpacing: '0.5px', textAlign: 'center' }}>
                        Perubahan hanya diperbolehkan maksimal naik 2 level atau turun 2 level dari kategori matrix yang sudah ditentukan saat BPJ.
                    </Typography>
                </Box>
            </DialogContent>
            <DialogActions sx={{ padding:'0 24px 24px 24px ' }}>
                {ButtonsContainer}
            </DialogActions>

            <KonfirmasiUbahMatrix 
                open={openKonfirmasiModal} 
                onClose={handleCloseKonfirmasiModal} />

        </Dialog>
    );
}

export default UbahKategoriMatrix;
