import * as React  from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Tab, Tabs, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArrowForwardOutlined, CalendarMonthOutlined, PersonPinOutlined, TaskOutlined } from '@mui/icons-material'
import MainCard from '../../../ui-component/cards/MainCard';
import notFoundImage from '../../../assets/images/ilustration/notfound.png';
import KuotaKomiteUnitAlert from '../../../ui-component/cards/KuotaKomiteUnitAlert';
import SearchSectionManajemenPengguna from '../../../ui-component/button/ManajemenSearchSectionGroup';
import DetailKaryawandiKomiteUnit from './detail-karyawandikomiteunit';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';


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

export default function DaftarEventKomiteUnit() {
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
                    <Tab icon={<PersonPinOutlined />} iconPosition="start" label="Daftar Karyawan" {...a11yProps(0)} />
                    <Tab icon={<TaskOutlined />} iconPosition="start" label="Karyawan Terkualifikasi" {...a11yProps(1)} />
                </Tabs>
            </Box>

            {/* Daftar Karyawan */}
            <CustomTabPanel value={value} index={0}>
                <Box sx={boxStyle}>
                    <KuotaKomiteUnitAlert />
                    <DetailKaryawandiKomiteUnit 
                    Title={'Tabel Karyawan'} 
                    Icon={AddCircleOutlineRoundedIcon} 
                    Label={'Tambah Data'}
                    ActionForButton={true}/>
                </Box> 
            </CustomTabPanel>
            

            {/* Karyawan Terkualifikasi*/}
            
            <CustomTabPanel value={value} index={1}>
                <Box sx={boxStyle}>
                    <KuotaKomiteUnitAlert />
                    <DetailKaryawandiKomiteUnit Title={'Tabel Karyawan Terkualifikasi'} 
                    Icon={FileDownloadOutlinedIcon} 
                    Label={'Unduh Data'}
                    />

                </Box> 
                
                <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px', marginBottom: '24px',}}>
                    <img src={notFoundImage} alt="Deskripsi gambar" />
                    <Typography variant='h4' marginTop={3}> Tidak Ada Data </Typography>
                </Box> 
            </CustomTabPanel>
        </MainCard>
    );
}
