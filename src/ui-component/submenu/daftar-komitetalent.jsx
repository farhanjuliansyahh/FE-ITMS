import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AddCircleOutline } from '@mui/icons-material';
import ButtonPrimary from '../../ui-component/button/ButtonPrimary';
import TabelDaftarAnggotaKomiteTalent from '../../ui-component/tables/anggota-komite-talent';
import TambahKomiteTalent from '../../ui-component/modal/tambah-anggota-komite-talent';

export default function DaftarKomiteTalent({ komiteTalentId }) {
    const [tambahKomiteTalentOpen, setTambahKomiteTalentOpen] = useState(false);
    const [openKonfirmasiKomiteTalent, setKonfirmasiKomiteTalentOpen] = useState(false);
    const [selectedKomiteTalent, setSelectedKomiteTalent] = useState('')

    const handleOpen = () => {
        setTambahKomiteTalentOpen(true);
    };

    const handleClose = () => {
        setTambahKomiteTalentOpen(false);
    };

    const handleOpenSecondModalKonfirmasi = (nippos, nama) => {
        setKonfirmasiKomiteTalentOpen(true);
        setSelectedKomiteTalent(nippos, nama)
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

    const [anggotaKomiteTalent, setAnggotaKomiteTalent] = useState([]);

    const fetchKomiteTalentData = (komiteTalentId) => {
        fetch(`http://localhost:4000/getanggotakomitetalent?komitetalentid=${komiteTalentId}`)
            .then(response => response.json())
            .then(data => {
                setAnggotaKomiteTalent(data.map((row, index) => ({ ...row, id: index + 1 })));
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchKomiteTalentData(komiteTalentId);
    }, []);

    return (
        <Box sx={boxStyle}>
            <FlexContainer>
                <Typography style={{ fontSize: '22px', fontWeight: '600' }}>
                    Tabel Anggota Komite Talent
                </Typography>
                <Button
                    variant="contained"
                    style={{ fontSize: '16px', color: '#2196F3', borderRadius: '15px', borderColor: '#EAF8FF', backgroundColor: '#EAF8FF', boxShadow: 'none' }}
                >
                    {anggotaKomiteTalent.length} Orang
                </Button>
                <div style={{ flex: '1' }}> </div>
                <ButtonPrimary Color="#ffffff" icon={AddCircleOutline} LabelName={'Tambah Anggota'} onClick={handleOpen} />
            </FlexContainer>

            <TabelDaftarAnggotaKomiteTalent rows={anggotaKomiteTalent} />

            <TambahKomiteTalent
                open={tambahKomiteTalentOpen}
                onClose={handleClose}
                onOpenSecondModal={handleOpenSecondModalKonfirmasi}
                komiteTalentId={komiteTalentId}
                onConfirm={() => fetchKomiteTalentData(komiteTalentId)}
            />
        </Box>
    );
}
