import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Grid, Tab, Tabs, Typography, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import SimpanButton from '../../../ui-component/button/SimpanButton';
import BatalkanButton from '../../../ui-component/button/ButtonErrorOutlined';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import PropTypes from 'prop-types';
import { Container } from '@mui/system';
import MainCardParameterTalent from '../../../ui-component/cards/MainCardParameterTalent';
import MainCard from '../../../ui-component/cards/MainCard';
import PassingGradeTable from '../../../ui-component/tables/PassingGradeTable';
import KuotaTable from '../../../ui-component/tables/KuotaTable'
import DaftarPertanyaanTable from '../../../ui-component/tables/DaftarPertanyaanTable'
import { AssignmentTurnedInOutlined, PersonOutlineOutlined, QuizOutlined } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchSection2 from '../../../ui-component/searchsection';

// ==============================|| PARAMETER TALENT PAGE ||============================== //

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
        <Box>
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

const EventKomiteTalentDua = () => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>

      <MainCard title="Daftar Event"  secondary={
        <Stack direction="row" spacing={2}>
          <SearchSection2 /> 

          <ButtonPrimary Color="#ffffff" icon={AddCircleOutlineIcon} LabelName={'Tambah Event'} onClick={handleOpen}/>
        
        </Stack>
      }>
        {/* Bagian Tab */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<AssignmentTurnedInOutlined />} iconPosition="start" label="Passing Grade" {...a11yProps(0)} />
            <Tab icon={<PersonOutlineOutlined />} iconPosition="start" label="Kuota" {...a11yProps(1)} />
          </Tabs>
        </Box>

        {/* Passing Grade */}
        <CustomTabPanel value={value} index={0}>
            <Box display="flex" flexDirection="column" alignItems="center" paddingLeft={3} paddingRight={3} paddingBottom={3}> 
            {/* Container with Flexbox layout */}
                <Grid>
                </Grid>
            
                <Box display="flex" justifyContent="flex-end" marginTop={4} width="100%"> {/* Stack of buttons with Flexbox layout */}
                  <SimpanButton></SimpanButton>
                  <BatalkanButton></BatalkanButton>
                </Box>
            </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <Box display="flex" flexDirection="column" alignItems="center" paddingLeft={3} paddingRight={3} paddingBottom={3}> 
            {/* Container with Flexbox layout */}
                <Grid>
                </Grid>
            
                <Box display="flex" justifyContent="flex-end" marginTop={4} width="100%"> {/* Stack of buttons with Flexbox layout */}
                  <SimpanButton></SimpanButton>
                  <BatalkanButton></BatalkanButton>
                </Box>
            </Box>
        </CustomTabPanel>

      </MainCard>
    </>
  );
};

export default EventKomiteTalentDua;