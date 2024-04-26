import { useEffect, useState } from 'react';

// material-ui
import { Grid, Container, Stack,Typography, Box, Button} from '@mui/material';

import { gridSpacing } from '../../../store/constant';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import TalentSourceTable from '../../../ui-component/tables/talentsource';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchSectionManajemenPengguna from '../../../ui-component/button/ManajemenSearchSectionGroup';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import DaftarPenggunaTabel from '../../../ui-component/tables/daftarpengguna';
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
                  <ButtonPrimary Color="#ffffff" icon={FileDownloadOutlinedIcon} LabelName={'Unduh Data'}/>
                </Stack>
              </Stack>
              <SearchSectionManajemenPengguna />
              <DaftarPenggunaTabel/>
            </Box>
            </Grid>
          </Grid>
        </Grid>


        
       
      </Grid>
    </>
  );
};

export default DaftarPengguna;
