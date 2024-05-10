import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Dialog, Grid, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloseOutlined } from '@mui/icons-material';
import TabelDaftarAnggotaKomiteUnit from '../../ui-component/tables/daftar-komite-unit';
import KonfirmasiTambahKomiteUnit from './konfirmasi-tambah-komite-unit';
import DetailTalentPertama from '../../ui-component/button/DropdownDetailTalentPertama';
import ButtonPrimary from '../../ui-component/button/ButtonPrimary';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DetailTalentTable from '../../ui-component/tables/detail-talent-table';

export default function TambahKomiteUnit({ open, onClose, onOpenSecondModal }) {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    const [selectedKantor, setSelectedKantor] = useState(null);
    const [selectedRumpunJabatan, setSelectedRumpunJabatan] = useState(null);
    const [selectedJobLevel, setSelectedJobLevel] = useState(null);
    const [selectedStatusIDP, setSelectedStatusIDP] = useState(null);
    const [openKonfirmasiModal, setOpenKonfirmasiModal] = useState(false);

    const handleCloseKonfirmasiModal = () => {
        setOpenKonfirmasiModal(false);
    };

    const handleTambahKomiteUnitButtonClick = (event) => {
        // event.stopPropagation(); // Stop event propagation here
        onClose(); // Close the first modal
        onOpenSecondModal(); // Open the second modal
    };

    const boxStyle = {
        padding: '20px',
        width: '100%',
        borderRadius: '12px'
    };

    const FlexContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap: '16px', 
        paddingBottom: '24px',
    });

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth >
            <Box sx={boxStyle}>
                <FlexContainer>
                    <Typography style={{fontSize:'24px', fontWeight:'700'}}>
                        Daftar Komite Unit
                    </Typography>
                    <div style={{ flex: '1' }}> </div>
                    <IconButton onClick={onClose} sx={{ color: '#F44336' }}>
                        <CloseOutlined />
                    </IconButton>
                </FlexContainer>

                <Grid style={{marginBottom: '0.2%'}}>
                    <DetailTalentPertama 
                        selectedRumpunJabatan={selectedRumpunJabatan}
                        setSelectedRumpunJabatan={setSelectedRumpunJabatan}
                        selectedJobLevel={selectedJobLevel}
                        setSelectedJobLevel={setSelectedJobLevel}
                        selectedKantor={selectedKantor}
                        setSelectedKantor={setSelectedKantor}
                        />
                </Grid>

                <TabelDaftarAnggotaKomiteUnit 
                    onOpenSecondModalTable={handleTambahKomiteUnitButtonClick}
                    selectedKantor={selectedKantor}
                    selectedRumpunJabatan={selectedRumpunJabatan}
                    selectedJobLevel={selectedJobLevel}
                    selectedStatusIDP={selectedStatusIDP}
                />
            </Box>

            <KonfirmasiTambahKomiteUnit
                open={openKonfirmasiModal} 
                onClose={handleCloseKonfirmasiModal} 
            />
        </Dialog>

    );
}
