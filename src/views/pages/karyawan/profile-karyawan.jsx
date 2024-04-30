import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CalendarMonthOutlined, EmojiEvents, Person, PersonPinOutlined, School, TaskOutlined } from '@mui/icons-material'

import MainCard from '../../../ui-component/cards/MainCard';
import CheckDataAlert from '../../../ui-component/cards/CheckDataAlert';
import notFoundImage from '../../../assets/images/ilustration/notfound.png';
import AccordionKaryawan from '../../../ui-component/cards/AccordionKaryawan';
import RiwayatPendidikanKaryawan from '../../../ui-component/submenu/karyawan-riwayatpendidikan';
import KompetensiKaryawan from '../../../ui-component/submenu/karyawan-kompetensi';
import DataDiriKaryawan from '../../../ui-component/submenu/karyawan-datadiri';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ pt: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

export default function ProfileKaryawan() {
    const nama_event = 'TRIAL EVENT_ E1-D3_BISNIS';
    const countdown = '53 Hari Lagi';
    const tgl_mulai_selesai = '22 Januari 2024 - 22 Maret 2024';

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    const boxStyle = {
        padding: '20px', 
        width: '100%',
        borderRadius:'12px'
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

            <Box sx={{ borderBottom: 1, borderTop: 1, borderColor: 'divider', marginTop: -3 }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab icon={<PersonPinOutlined />} iconPosition="start" label="Data Diri" {...a11yProps(0)} />
                    <Tab icon={<TaskOutlined />} iconPosition="start" label="Persetujuan Talent" {...a11yProps(1)} />
                </Tabs>
            </Box>

            {/* Data Diri */}
            <CustomTabPanel value={value} index={0}>
                <Box sx={boxStyle}>
                    <CheckDataAlert/>
                    <AccordionKaryawan 
                        summary={'Data Diri'} 
                        icon={Person} 
                        content={<DataDiriKaryawan/>}
                    />
                    <AccordionKaryawan 
                        summary={'Riwayat Pendidikan'} 
                        icon={School} 
                        content={<RiwayatPendidikanKaryawan/>}
                    />
                    <AccordionKaryawan 
                        summary={'Kompetensi'} 
                        icon={EmojiEvents} 
                        content={<KompetensiKaryawan/>}
                    />
                </Box> 
            </CustomTabPanel>

            {/* Persetujuan Talent*/}
            <CustomTabPanel value={value} index={1}>
                <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', marginBottom: '24px',}}>
                    <img src={notFoundImage} alt="Deskripsi gambar" />
                    <Typography variant='h4' marginTop={3}> Tidak Ada Data </Typography>
                </Box> 
            </CustomTabPanel>
        </MainCard>
    );
}
