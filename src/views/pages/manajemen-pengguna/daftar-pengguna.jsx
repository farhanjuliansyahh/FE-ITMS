import { useEffect, useState } from 'react';

// material-ui
import { Grid, Container, Stack,Typography, Box, Button} from '@mui/material';

import { gridSpacing } from '../../../store/constant';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import EventDetailSearchSection from '../../../ui-component/button/EventDetailSearchSection';
import SearchResetButton from '../../../ui-component/button/SearchResetButton';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import TalentSourceTable from '../../../ui-component/tables/talentsource';
import KomiteUnitListButton from '../../../ui-component/button/KomiteUnitListButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DownloadIcon from '@mui/icons-material/Download';
import SearchSectionManajemenPengguna from '../../../ui-component/button/SearchSectionGroup';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const DaftarPengguna = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const cards = [
    { title: "Total Talent",
    content: 512,
    icon: GroupsIcon,
    // navigateTo: '/dashboard/total-pegawai',
    },
    { title: "Total IDP Aktif",
      content: 1019,
      icon: NotificationsActiveOutlinedIcon,
      // navigateTo: '/dashboard/total-pegawai',
    },
  ]

  return (
    <>
      {/* <MainLayout/> */}
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
            <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingLeft: 18 }}>
              <Stack direction="row" spacing={2} alignItems="center"  style={{marginBottom: '15px'}}>
                <Typography variant="h2" style={{display: 'inline',fontFamily: 'Roboto',fontSize:'20px',fontWeight: '500' }} gutterBottom>
                  Tabel Karyawan
                </Typography>
                <Button
                  variant="contained"
                  style={{
                    color: '#2196F3',
                    borderRadius: '15px',
                    borderColor: '#EAF8FF',
                    backgroundColor: '#EAF8FF',
                    fontSize: '16px'
                  }}
                >
                 14.000 Talent Karyawan
                </Button>
                <Box sx={{ flexGrow: 1 }} /> {/* This will push the following elements to the right */}
                <Stack direction="row" spacing={1}>
                  
                  <Button variant="contained"  alignItems="center"
                  sx={{ 
                    backgroundColor: '#1a2b5a', 
                    borderRadius: '15px' ,
                    height: '48px', /* Adjust height as needed */
                    minWidth: '171px', /* Adjust width as needed */
                    paddingLeft: '24px',
                    fontFamily: 'Roboto',
                    fontSize: '14',
                  }} endIcon={<DownloadIcon />}>
                    Unduh Data
                  </Button>
                </Stack>
              </Stack>
              <SearchSectionManajemenPengguna />
              {/* <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{ marginRight: '80px' }}>
                    <EventDetailSearchSection PlaceHolder={'Nama'} />
                </div>
                <div style={{ marginRight: '80px' }}>
                    <EventDetailSearchSection PlaceHolder={'NIPPOS'} />
                </div>
                <div style={{ marginRight: '80px' }}>
                    <EventDetailSearchSection PlaceHolder={'Peran'} />
                </div>
                <div style={{ marginRight: '15px' }}>
                    <SearchResetButton outlineColor="#1C2D5A" icon={SearchIcon} LabelName={'Cari'} />
                </div>
                <div style={{ marginRight: '0px' }}>
                    <SearchResetButton outlineColor="#D32F2F" icon={RestartAltIcon} LabelName={'Reset'} />
                </div>
              </div> */}
              <TalentSourceTable/>
            </Box>
            </Grid>
          </Grid>
        </Grid>


        
       
      </Grid>
    </>
  );
};

export default DaftarPengguna;
