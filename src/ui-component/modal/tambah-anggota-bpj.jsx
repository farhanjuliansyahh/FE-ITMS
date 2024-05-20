import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Dialog, Grid, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CloseOutlined, RestartAltOutlined } from '@mui/icons-material';
import TabelDaftarAnggotaBPJ from '../../ui-component/tables/daftar-anggota-bpj';
import KonfirmasiTambahAnggotaBPJ from './konfirmasi-tambah-anggota-bpj';
import CustomSearch from '../searchsection/custom-search';
import ButtonErrorOutlined from '../button/ButtonErrorOutlined';


export default function TambahAnggotaBPJ({ open, onClose, onConfirm, onOpenSecondModal }) {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    
    const [openKonfirmasiModal, setOpenKonfirmasiModal] = useState(false);
    const [rows, setRows] = useState([])

    useEffect(() => {
        // Fetch data from API
        fetch(`http://localhost:4000/getkomiteunitcandidate`)
          .then(response => response.json())
          .then(data => {
            // Update state with API data
            setRows(data.map((row, index) => ({ ...row, id: index + 1 })));
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []); // Empty dependency array to run effect only once

    const handleCloseKonfirmasiModal = () => {
        setOpenKonfirmasiModal(false);
    };

    const handleTambahAnggotaBPJButtonClick = (nippos) => {
        // event.stopPropagation(); // Stop event propagation here
        onClose(); // Close the first modal
        onOpenSecondModal(nippos); // Open the second modal
    };

    const HandleKonfirmasiModal = () => {
        onConfirm()
    }

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
    
    // DAFTAR KOMITE UNIT
    const listNama = [...new Set(rows.map(row => row.nama))]
    const listJabatan = [...new Set(rows.map(row => row.jabatan))];
    const listKantor = [...new Set(rows.map(row => row.kantor))]

    const [selectedNama, setSelectedNama] = useState(null);
    const [selectedJabatan, setSelectedJabatan] = useState(null);
    const [selectedKantor, setSelectedKantor] = useState(null);
    
    const resetNamaInput = () => {
        setSelectedNama('');
    };

    const resetJabatanInput = () => {
        setSelectedJabatan('');
    };

    const resetKantorInput = () => {
        setSelectedKantor('');
    };

    const handleResetSearch = () => {
        resetNamaInput();
        resetJabatanInput();
        resetKantorInput();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth >
            <Box sx={boxStyle}>
                <FlexContainer>
                    <Typography style={{fontSize:'24px', fontWeight:'700'}}>
                        Daftar Karyawan
                    </Typography>
                    <div style={{ flex: '1' }}> </div>
                    <IconButton onClick={onClose} sx={{ color: '#F44336' }}>
                        <CloseOutlined />
                    </IconButton>
                </FlexContainer>

                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width:'100%' }}>
                    <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                        <CustomSearch field={listNama} label={'Nama'} onSearch={setSelectedNama} value={selectedNama} resetInput={resetNamaInput} />
                        <CustomSearch field={listJabatan} label={'Jabatan'} onSearch={setSelectedJabatan} value={selectedJabatan} resetInput={resetJabatanInput} />
                        <CustomSearch field={listKantor} label={'Kantor'} onSearch={setSelectedKantor} value={selectedKantor} resetInput={resetKantorInput} />
                    </Stack>
                    <ButtonErrorOutlined onClick={handleResetSearch} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'}/>
                </div>

                <TabelDaftarAnggotaBPJ 
                    onOpenSecondModalTable={handleTambahAnggotaBPJButtonClick}
                    rows = {rows}
                    searchNama={selectedNama} // Pass selectedNama as searchTerm to the NilaiAssessmentTable component
                    searchJabatan={selectedJabatan}
                    searchKantor={selectedKantor}
                />
            </Box>

            <KonfirmasiTambahAnggotaBPJ
                open={openKonfirmasiModal} 
                onClose={handleCloseKonfirmasiModal} 
            />
        </Dialog>

    );
}
