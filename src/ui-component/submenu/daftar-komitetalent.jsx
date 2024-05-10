import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AddCircleOutline } from '@mui/icons-material';
import ButtonPrimary from '../../ui-component/button/ButtonPrimary';
import TabelDaftarAnggotaKomiteTalent from '../../ui-component/tables/anggota-komite-talent';
import TambahKomiteTalent from '../../ui-component/modal/tambah-anggota-komite-talent';

function createData(id, nama, nippos, posisi, joblevel, bagian, kantor, aksi) {
  return { id, nama, nippos, posisi, joblevel, bagian, kantor, aksi };
}

const rows = [
  createData(1, 'Sri Hartini', '998494379', 'Asisten Manajer Pengembangan Join Operation', 'D3', 'Bisnis', 'Kantor Pusat Bandung'),
  createData(2, 'Muhamad Arsyi', '998494379', 'Asisten Manajer Acquisition Biller', 'D3', 'Bisnis', 'Kantor Pusat Bandung'),
  createData(3, 'Adinda', '998494379', 'Asisten Manajer Pengelolaan Remittance LN', 'D3', 'Bisnis', 'Kantor Pusat Bandung'),
  createData(4, 'Niken Wijaya', '998494379', 'Asisten Manajer Penjualan dan Kemitraan Pospay', 'D3', 'Bisnis', 'Kantor Pusat Bandung'),
  createData(5, 'Niken Wijaya', '998494379', 'Asisten Manajer Pengelolaan Administrasi dan Kinerja Bidding', 'D3', 'Bisnis', 'Kantor Pusat Bandung'),
];

export default function DaftarKomiteTalent() {
    const [tambahKomiteTalentOpen, setTambahKomiteTalentOpen] = useState(false);

    const handleOpen = () => {
        setTambahKomiteTalentOpen(true);
      };
    
      const handleClose = () => {
        setTambahKomiteTalentOpen(false);
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
        <Box sx={boxStyle}>
            <FlexContainer>
                <Typography style={{fontSize:'22px', fontWeight:'600'}}>
                    Tabel Anggota Komite Talent
                </Typography>
                <Button
                    variant="contained"
                    style={{ fontSize: '16px', color: '#2196F3', borderRadius: '15px', borderColor: '#EAF8FF', backgroundColor: '#EAF8FF', boxShadow: 'none' }}
                >
                    5 Orang
                </Button>
                <div style={{ flex: '1' }}> </div>
                <ButtonPrimary Color="#ffffff" icon={AddCircleOutline} LabelName={'Tambah Anggota'} onClick={handleOpen}/>
            </FlexContainer>

            <TabelDaftarAnggotaKomiteTalent rows={rows} />

            <TambahKomiteTalent
                open={tambahKomiteTalentOpen}
                handleClose={() => setTambahKomiteTalentOpen(false)}
            />
        </Box>
    );
}
