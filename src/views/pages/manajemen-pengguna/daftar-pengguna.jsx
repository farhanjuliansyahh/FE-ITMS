import { useEffect, useState } from 'react';
import { gridSpacing } from '../../../store/constant';
import { Grid, Stack,Typography, Box} from '@mui/material';
import { FileDownloadOutlined } from '@mui/icons-material';

import MainCard from '../../../ui-component/cards/MainCard';
import SearchSectionManajemenPengguna from '../../../ui-component/button/ManajemenSearchSectionGroup';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import DaftarPenggunaTabel from '../../../ui-component/tables/daftarpengguna';

// ==============================|| MANAJEMEN PENGGUNA ||============================== //

const DaftarPengguna = () => {
  const [isLoading, setLoading] = useState(true);
  const [rowsUser, setRowsUser] = useState([])

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Fetch data from API
    fetch(`http://localhost:4000/getallroles`)
      .then(response => response.json())
      .then(data => {
        // Update state with API data
        setRowsUser(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const userLength = rowsUser.length

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
                      fontWeight: 500
                    }}>
                    {userLength} Talent Karyawan
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} /> {/* This will push the following elements to the right */}
                  <Stack direction="row" spacing={1}>
                    <ButtonPrimary Color="#ffffff" icon={FileDownloadOutlined} LabelName={'Unduh Data'}/>
                  </Stack>
                </Stack>
                <SearchSectionManajemenPengguna />
                <DaftarPenggunaTabel rows={rowsUser}/>
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
