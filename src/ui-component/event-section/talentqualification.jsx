import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined';
import GppBadOutlinedIcon from '@mui/icons-material/GppBadOutlined';
import TalentSource from '../../ui-component/tables/talentsource';
import EventDetailSearchSection from '../../ui-component/button/EventDetailSearchSection';
import SearchResetButton from '../../ui-component/button/SearchResetButton';
import { Container, Stack, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';


export default function TalentQualification() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab icon={<GppGoodOutlinedIcon/>}iconPosition="start" label="Terkualifikasi" value="1" />
            <Tab icon={<GppBadOutlinedIcon />} iconPosition="start" label="Tidak Terkualifikasi" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">

        <Container style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 0 }}>
          <Stack direction="row" spacing={2} alignItems="center"  style={{marginBottom: '15px'}}>
            <Typography variant="h2" style={{display: 'inline',fontFamily: 'Roboto',fontWeight: '600' }} gutterBottom>
              Tabel Karyawan
            </Typography>
          </Stack>
          
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ marginRight: '80px' }}>
                <EventDetailSearchSection PlaceHolder={'Nama'} />
            </div>
            <div style={{ marginRight: '80px' }}>
                <EventDetailSearchSection PlaceHolder={'NIPPOS'} />
            </div>
            <div style={{ marginRight: '80px' }}>
                <EventDetailSearchSection PlaceHolder={'Job Level'} />
            </div>
            <div style={{ marginRight: '100px' }}>
                <EventDetailSearchSection PlaceHolder={'Komite Unit'} />
            </div>
            <div style={{ marginRight: '15px' }}>
                <SearchResetButton outlineColor="#1C2D5A" icon={SearchIcon} LabelName={'Cari'} />
            </div>
            <div style={{ marginRight: '0px' }}>
                <SearchResetButton outlineColor="#D32F2F" icon={RestartAltIcon} LabelName={'Reset'} />
            </div>
          </div>
          </Container>
            <TalentSource />
        </TabPanel>
        <TabPanel value="2">

        </TabPanel>
      </TabContext>
    </Box>
  );
}

