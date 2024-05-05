import * as React from 'react';
import { useEffect, useState } from 'react';
import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import ButtonErrorOutlined from '../../../ui-component/button/ButtonErrorOutlined';

import PropTypes from 'prop-types';
import { Container } from '@mui/system';
import MainCardParameterTalent from '../../../ui-component/cards/MainCardParameterTalent';
import MainCard from '../../../ui-component/cards/MainCard';
import PassingGradeTable from '../../../ui-component/tables/PassingGradeTable';
import KuotaTable from '../../../ui-component/tables/KuotaTable'
import DaftarPertanyaanTable from '../../../ui-component/tables/DaftarPertanyaanTable'
import { AssignmentTurnedInOutlined, PersonOutlineOutlined, QuizOutlined } from '@mui/icons-material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';


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

const ParameterTalent = () => {
  const [isLoading, setLoading] = useState(true);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <>

      <MainCard>
        {/* Bagian Tab */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<AssignmentTurnedInOutlined />} iconPosition="start" label="Passing Grade" {...a11yProps(0)} />
            <Tab icon={<PersonOutlineOutlined />} iconPosition="start" label="Kuota" {...a11yProps(1)} />
            <Tab icon={<QuizOutlined />} iconPosition="start" label="Question Event" {...a11yProps(2)} />
          </Tabs>
        </Box>

        {/* Passing Grade */}
        <CustomTabPanel value={value} index={0}>
            <Box display="flex" flexDirection="column" alignItems="center" paddingLeft={'24px'} paddingRight={'24px'}> 
            {/* Container with Flexbox layout */}
                <Grid>
                <Typography fontSize={22} fontWeight={600} marginTop={2} marginBottom={2}>Komite Talent I</Typography>
                <PassingGradeTable ></PassingGradeTable>
                <Typography fontSize={22} fontWeight={600} marginTop={2} marginBottom={2}>Komite Talent II</Typography>
                <PassingGradeTable></PassingGradeTable>
                <Typography fontSize={22} fontWeight={600} marginTop={2} marginBottom={2}>Komite Talent III</Typography>
                <PassingGradeTable></PassingGradeTable>
                </Grid>
            
                <Box display="flex" justifyContent="flex-end" marginTop={'24px'} width="100%"> {/* Stack of buttons with Flexbox layout */}
                  <Box sx={{ marginRight: '16px' }}>
                    <ButtonPrimary Color="#ffffff" icon={SaveOutlinedIcon} LabelName={'Simpan'}/>
                  </Box>
                  <ButtonErrorOutlined Color="#D32F2F" icon={CancelOutlinedIcon} LabelName={'Batalkan'}/>
                </Box>
            </Box>
        </CustomTabPanel>

        {/* Kuota */}
        <Box display="flex" marginTop={2} width="100%" paddingLeft={'24px'} paddingRight={'24px'} paddingBottom={'24px'}>
          {/* Left Table */}
          <Box flex={1} marginRight={2}>
            <CustomTabPanel value={value} index={1}>
              <Grid>
                <Typography fontSize={22} fontWeight={600} marginBottom={2}>Komite Unit</Typography>
                <KuotaTable header="Kuota Talent Source- (Dalam Satuan Persen)" initialValue={50}></KuotaTable>
              </Grid>
            </CustomTabPanel>
          </Box>

          {/* Right Table */}
          <Box flex={1} marginLeft={2}>
            <CustomTabPanel value={value} index={1}>
              <Container style={{ textAlign: 'left', paddingLeft: 0, paddingRight: 0 }}>
                <Typography fontSize={22} fontWeight={600} marginBottom={2}>Ketua Komite Talent</Typography>
                <KuotaTable header="Kuota Diskresi- (Dalam Satuan Persen)" initialValue={10}></KuotaTable>
              </Container>

              {/* Buttons */}
              <Box display="flex" justifyContent="flex-end" marginTop={'24px'}>
                <Box sx={{ marginRight: '16px' }}>
                  <ButtonPrimary Color="#ffffff" icon={SaveOutlinedIcon} LabelName={'Simpan'}/>
                </Box>
                <ButtonErrorOutlined Color="#D32F2F" icon={CancelOutlinedIcon} LabelName={'Batalkan'}/>
              </Box>
            </CustomTabPanel>
          </Box>
        </Box>

        {/* Question Event */}
        <CustomTabPanel value={value} index={2}>
          <Box display="flex" flexDirection="column" alignItems="center" paddingLeft={'24px'} paddingRight={'24px'} paddingBottom={'24px'}> 
          {/* Container with Flexbox layout */}
            <Grid>
              {/* Flex container for the title and button */}
              <Box display="flex" justifyContent="space-between" alignItems="center">
                {/* Title */}
                <Typography fontSize={22} fontWeight={600} marginBottom={4}>Daftar Pertanyaan</Typography>
                
                {/* "Tambah Data" button */}
                <Box sx={{ marginBottom: '16px' }}>
                  <ButtonPrimary Color="#ffffff" icon={AddCircleOutlineIcon} LabelName={'Tambah Data'}/>
                </Box>
              </Box>
              
              {/* Table */}
              <DaftarPertanyaanTable></DaftarPertanyaanTable>
            </Grid>

            {/* Stack of buttons with Flexbox layout */}
            <Box display="flex" justifyContent="flex-end" marginTop={'24px'} width="100%">
              <Box sx={{ marginRight: '16px' }}>
                <ButtonPrimary Color="#ffffff" icon={SaveOutlinedIcon} LabelName={'Simpan'}/>
              </Box>
              <ButtonErrorOutlined Color="#D32F2F" icon={CancelOutlinedIcon} LabelName={'Batalkan'}/>
            </Box>
          </Box>
        </CustomTabPanel>

     </MainCard>
    </>
  );
};

export default ParameterTalent;