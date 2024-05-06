import { useEffect, useState } from 'react';
import { gridSpacing } from '../../../store/constant';
import { Grid, Stack,Typography, Box} from '@mui/material';
import { FileDownloadOutlined } from '@mui/icons-material';

import MainCard from '../../../ui-component/cards/MainCard';
import SearchSectionManajemenPengguna from '../../../ui-component/button/ManajemenSearchSectionGroup';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import DaftarPenggunaTabel from '../../../ui-component/tables/daftarpengguna';
import DaftarPenggunaTabel2 from '../../../ui-component/tables/daftarpengguna2';

// ==============================|| MANAGEMEN PENGGUNA ||============================== //

const DaftarPengguna = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {/* <MainLayout/> */}
      <MainCard>
        <Grid container spacing={gridSpacing} padding={'24px'} >
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
              <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center"  style={{marginBottom: '16px'}}>
                  <Typography variant="h2" style={{display: 'inline',fontFamily: 'Roboto',fontSize:'20px',fontWeight: '500' }} gutterBottom>
                    Tabel Karyawan
                  </Typography>
                  <Typography variant="body2" 
                    style={{
                      color:'#2196F3',
                      backgroundColor:'#EAF8FF', // Default background color
                      padding: '8px 16px', // Adjust padding as needed
                      borderRadius: '16px', // Adjust border radius for rounded corners
                      display: 'inline-block', // Ensure inline display
                      fontSize: '16px',
                      fontFamily:'Roboto',
                      fontWeight:500
                    }}>
                    14.000 Talent Karyawan
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} /> {/* This will push the following elements to the right */}
                  <Stack direction="row" spacing={1}>
                    <ButtonPrimary Color="#ffffff" icon={FileDownloadOutlined} LabelName={'Unduh Data'}/>
                  </Stack>
                </Stack>
                <SearchSectionManajemenPengguna />
                <DaftarPenggunaTabel/>
              </Box>
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </MainCard>
    </>
  );
};

export default DaftarPengguna;
