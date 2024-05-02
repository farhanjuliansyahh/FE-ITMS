import * as React from 'react';
import { useState } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CalendarMonthOutlined, RestartAlt, Search } from '@mui/icons-material';
import { IconFileDownload } from '@tabler/icons-react';
import MainCard from '../../../ui-component/cards/MainCard';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import SearchResetButton from '../../../ui-component/button/SearchResetButton';
import EventDetailSearchSection from '../../../ui-component/button/EventDetailSearchSection';
import KaryawanKomiteUnit from '../../../ui-component/tables/karyawankomiteunit';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import KonfirmasiTalentSource from '../../../ui-component/modal/konfirmasi-talentsource';

export default function DetailKaryawandiKomiteUnit({Title, Icon, Label, ActionForButton}) {
    const [filterNama, setFilterNama] = useState('');
    const [filterNippos, setFilterNippos] = useState('');
    const [filterJob, setFilterJob] = useState('');
    const [showModal, setShowModal] = useState(false);  // State to control the visibility of the modal

    const toggleModal = () => {
        if (ActionForButton) {
            setShowModal(!showModal);
        }
    };
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
            <Box paddingLeft={3} paddingRight={3} paddingBottom={3} marginTop={3}>
                <FlexContainer>
                    <Typography style={{fontSize:'24px', fontWeight:'bold'}} gutterBottom>
                        {Title}
                    </Typography>
                    <div style={{ flex: '1' }}> </div>
                    <ButtonPrimary Color="#ffffff" icon={Icon} LabelName={Label} onClick={toggleModal}/>
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
                    <div style={{ marginRight: '12px' }}>
                        <SearchResetButton outlineColor="#1C2D5A" icon={Search} LabelName={'Cari'} />
                    </div>
                    <div style={{ marginRight: '0px' }}>
                        <SearchResetButton outlineColor="#D32F2F" icon={RestartAlt} LabelName={'Reset'} />
                    </div>
                </div>
                <KaryawanKomiteUnit filter={{nama:filterNama, nippos:filterNippos, job:filterJob}}/>
                {ActionForButton && <KonfirmasiTalentSource open={showModal} handleClose={() => setShowModal(false)} />}
            </Box>

        </MainCard>
    );
}
