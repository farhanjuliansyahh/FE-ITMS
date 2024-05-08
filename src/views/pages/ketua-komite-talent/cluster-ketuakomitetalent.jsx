import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Divider, Typography } from '@mui/material';
import { CalendarMonthOutlined, RestartAlt, Search } from '@mui/icons-material';
import { IconFileDownload } from '@tabler/icons-react';

import MainCard from '../../../ui-component/cards/MainCard';
import MatrixNineBox from '../../../ui-component/submenu/matrixninebox';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import SearchResetButton from '../../../ui-component/button/SearchResetButton';
import EventDetailSearchSection from '../../../ui-component/button/EventDetailSearchSection';
import TalentClusterKetuaKomiteTalentTable from '../../../ui-component/tables/talentclusterketuakomitetalent';

export default function ClusterKetuaKomiteTalent() {
    const nama_event = 'TRIAL EVENT_ E1-D3_BISNIS';
    const countdown = '53 Hari Lagi';
    const tgl_mulai_selesai = '22 Januari 2024 - 22 Maret 2024';

    const [filterNama, setFilterNama] = useState('');
    const [filterNippos, setFilterNippos] = useState('');
    const [filterJob, setFilterJob] = useState('');
    const [filterKategoriMatrix, setFilterKategoriMatrix] = useState('');

    const boxStyle = {
        padding: '20px', 
        width: '100%',
        borderRadius:'12px',
        marginBottom: '-16px'
    };

    const FlexContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap: '16px', 
        paddingBottom: '24px',
    });

    const BoxContainer = styled('div')({
        display: 'flex',
        flexDirection: 'column',
    });

    const FlexTitle = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        paddingBottom:0
    });

    const CalendarIcon = styled(CalendarMonthOutlined)({
        fontSize: '1rem',
        color: '#1C2D5A',
    });

    const CountdownLabel = styled('div')({
        backgroundColor: '#FFEDED', 
        color: '#F44336',
        padding: '8px 16px',
        borderRadius: '16px',
        fontWeight: 600,
        fontSize:'16px'
    });

    const DividerContainer = styled('div')({
        width: '100%',
        textAlign: 'center',
        marginBottom: '16px',
    });
    
    const dividerStyle = {
    margin: '0 auto',
    };

    return (
        <MainCard>
            <Box sx={boxStyle}>
                <FlexContainer>
                    <BoxContainer>
                        <FlexTitle style={{paddingBottom:'8px'}}>
                            <Typography style={{fontSize:'24px', fontWeight:'bold'}}>{nama_event}</Typography>
                        </FlexTitle>

                        <FlexTitle>
                            <CalendarIcon style={{color:'#828282'}}/>
                            <Typography style={{fontSize:'14px', color:'#828282'}}>{tgl_mulai_selesai}</Typography>
                        </FlexTitle>
                    </BoxContainer>

                    <div style={{ flex: '1' }}> </div>
          
                    <CountdownLabel>{countdown}</CountdownLabel>
                </FlexContainer>
            </Box>

            <DividerContainer>
                <Divider orientation="horizontal" flexItem sx={dividerStyle} />
            </DividerContainer>

            <MatrixNineBox/>

            <Box paddingLeft={3} paddingRight={3} paddingBottom={3} marginTop={3}>
                <FlexContainer>
                    <Typography style={{fontSize:'24px', fontWeight:'bold'}} gutterBottom>
                        Tabel Karyawan
                    </Typography>
                    <div style={{ flex: '1' }}> </div>
                    <ButtonPrimary Color="#ffffff" icon={IconFileDownload} LabelName={'Unduh Data'}/>
                </FlexContainer>
          
                <div style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '16px', width:'100%' }}>
                    <div style={{ marginRight: '12px', width:'100%'  }}>
                        <EventDetailSearchSection filter={filterNama} setFilter={setFilterNama} PlaceHolder={'Nama'} />
                    </div>
                    <div style={{ marginRight: '12px', width:'100%' }}>
                        <EventDetailSearchSection filter={filterNippos} setFilter={setFilterNippos} PlaceHolder={'NIPPOS'} />
                    </div>
                    <div style={{ marginRight: '12px', width:'100%' }}>
                        <EventDetailSearchSection filter={filterJob} setFilter={setFilterJob} PlaceHolder={'Job Level'} />
                    </div>
                    <div style={{ marginRight: '24px', width:'100%' }}>
                        <EventDetailSearchSection filter={filterKategoriMatrix} setFilter={setFilterKategoriMatrix} PlaceHolder={'Kategori Matrix'} />
                    </div>
                    <div style={{ marginRight: '12px' }}>
                        <SearchResetButton outlineColor="#1C2D5A" icon={Search} LabelName={'Cari'} />
                    </div>
                    <div style={{ marginRight: '0px' }}>
                        <SearchResetButton outlineColor="#D32F2F" icon={RestartAlt} LabelName={'Reset'} />
                    </div>
                </div>
         
                <TalentClusterKetuaKomiteTalentTable filter={{nama:filterNama, nippos:filterNippos, job:filterJob, KategoriMatrix:filterKategoriMatrix}}/>
            </Box>

        </MainCard>
    );
}
