import * as React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Tab, Tabs, Typography } from '@mui/material';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import ButtonErrorOutlined from '../../../ui-component/button/ButtonErrorOutlined';
import ButtonOptional from '../../../ui-component/button/ButtonOptional';
import MainCard from '../../../ui-component/cards/MainCard';
import PassingGradeTable from '../../../ui-component/tables/PassingGradeTable';
import KuotaTable from '../../../ui-component/tables/KuotaTable'
import DaftarPertanyaanTable from '../../../ui-component/tables/DaftarPertanyaanTable'
import AccordionKomiteTalent from '../../../ui-component/cards/AccordionKomiteTalent';
import DaftarKomiteTalent from '../../../ui-component/submenu/daftar-komitetalent';
import NilaiAssessmentTable from '../../../ui-component/tables/NilaiAssessmentTable';
import DetailTalentPertama from '../../../ui-component/button/DropdownDetailTalentPertama';
import UnggahDataNilaiAssessment from '../../../ui-component/modal/unggah-data-nilai-assessment';

import { 
  AddCircleOutline, AssignmentOutlined, AssignmentTurnedInOutlined, CancelOutlined, 
  FileDownloadOutlined, FileUploadOutlined, GroupsOutlined,
  PersonOutlineOutlined, QuizOutlined, SaveOutlined, SimCardDownloadOutlined 
} from '@mui/icons-material';

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

  const [selectedKantor, setSelectedKantor] = useState(null);
  const [selectedRumpunJabatan, setSelectedRumpunJabatan] = useState(null);
  const [selectedJobLevel, setSelectedJobLevel] = useState(null);
  const [selectedStatusIDP, setSelectedStatusIDP] = useState(null);
  const [openKonfirmasiModal, setOpenKonfirmasiModal] = useState(false);
  const [updatekkmstate, setUpdatekkmstate] = useState(false)
  const [updatekuotastate, setUpdatekuotastate] = useState(false)
  const [refetchstate, setRefetchstate] = useState(true)
  
  const handleClickKKM = () =>{
    setUpdatekkmstate(true);
  }

  const handleClickKuota = () =>{
    setUpdatekuotastate(true);
  }


  const handleBatalkanKKM = () => {
    setRefetchstate(true)
  }

  const [openUnggahData, setopenUnggahData] = useState(false);

  const handleOpen = () => {
      setopenUnggahData(true);
    };
  
  const handleClose = () => {
      setopenUnggahData(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setRefetchstate(true)
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  const boxStyle = {
    padding: '20px',
    width: '100%',
    borderRadius: '12px',
    marginTop: '-55px'
};

  const FlexContainer = styled('div')({
      display: 'flex',
      alignItems: 'center',
      gap: '16px', 
      paddingBottom: '24px',
  });

  return (
    <>

      <MainCard>
        {/* Bagian Tab */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab icon={<AssignmentTurnedInOutlined />} iconPosition="start" label="Passing Grade" {...a11yProps(0)} />
            <Tab icon={<PersonOutlineOutlined />} iconPosition="start" label="Kuota" {...a11yProps(1)} />
            <Tab icon={<QuizOutlined />} iconPosition="start" label="Question Event" {...a11yProps(2)} />
            <Tab icon={<GroupsOutlined />} iconPosition="start" label="Komite Talent" {...a11yProps(3)} />
            <Tab icon={<AssignmentOutlined />} iconPosition="start" label="Nilai Assessment" {...a11yProps(4)} />
          </Tabs>
        </Box>

        {/* Passing Grade */}
        <CustomTabPanel value={value} index={0}>
            <Box display="flex" marginTop={2} flexDirection="column" alignItems="center" paddingLeft={'24px'} paddingRight={'24px'}> 
                <Grid>
                <Typography fontSize={22} fontWeight={600} marginTop={2} marginBottom={2}>Komite Talent I</Typography>
                <PassingGradeTable tipekomite={1}  updatekkmstate={updatekkmstate} refetchstate={refetchstate} onUpdateKkmStateChange={() => setUpdatekkmstate(false)} handlerefetch={() => setRefetchstate(false)}/>
                <Typography fontSize={22} fontWeight={600} marginTop={2} marginBottom={2}>Komite Talent II</Typography>
                <PassingGradeTable tipekomite={2}  updatekkmstate={updatekkmstate} refetchstate={refetchstate} onUpdateKkmStateChange={() => setUpdatekkmstate(false)} handlerefetch={() => setRefetchstate(false)}/>
                <Typography fontSize={22} fontWeight={600} marginTop={2} marginBottom={2}>Komite Talent III</Typography>
                <PassingGradeTable tipekomite={3}  updatekkmstate={updatekkmstate} refetchstate={refetchstate} onUpdateKkmStateChange={() => setUpdatekkmstate(false)} handlerefetch={() => setRefetchstate(false)}/>
                </Grid>
            
                <Box display="flex" justifyContent="flex-end" width="100%"> 
                  <Box sx={{ marginRight: '16px' }}>
                    <ButtonPrimary Color="#ffffff" icon={SaveOutlined} LabelName={'Simpan'} onClick={handleClickKKM}/>
                  </Box>
                  <ButtonErrorOutlined Color="#D32F2F" icon={CancelOutlined} LabelName={'Batalkan'} onClick={handleBatalkanKKM}/>
                </Box>
            </Box>
        </CustomTabPanel>

        {/* Kuota */}
        <Box display="flex" marginTop={4} width="100%" paddingLeft={'24px'} paddingRight={'24px'} paddingBottom={'24px'}>
          {/* Left Table */}
          <Box flex={1} marginRight={2}>
            <CustomTabPanel value={value} index={1}>
              <Grid>
                <Typography fontSize={22} fontWeight={600} marginBottom={2}>Komite Unit</Typography>
                <KuotaTable header="Kuota Talent Source- (Dalam Satuan Persen)" initialValue={50} bobot={1} 
                refetchstate={refetchstate} 
                handlerefetch={() => setRefetchstate(false)}
                updatekuotastate={updatekuotastate} 
                onUpdateKuotaStateChange={() => setUpdatekuotastate(false)}
                />
              </Grid>
            </CustomTabPanel>
          </Box>

          {/* Right Table */}
          <Box flex={1} marginLeft={2}>
            <CustomTabPanel value={value} index={1}>
              <Container style={{ textAlign: 'left', paddingLeft: 0, paddingRight: 0 }}>
                <Typography fontSize={22} fontWeight={600} marginBottom={2}>Ketua Komite Talent</Typography>
                <KuotaTable header="Kuota Diskresi- (Dalam Satuan Persen)" initialValue={10} bobot={2} 
                refetchstate={refetchstate} 
                handlerefetch={() => setRefetchstate(false)} 
                updatekuotastate={updatekuotastate} 
                onUpdateKuotaStateChange={() => setUpdatekuotastate(false)} />
              </Container>

              {/* Buttons */}
              <Box display="flex" justifyContent="flex-end" marginTop={'24px'}>
                <Box sx={{ marginRight: '16px' }}>
                  <ButtonPrimary Color="#ffffff" icon={SaveOutlined} LabelName={'Simpan'} onClick={handleClickKuota}/>
                </Box>
                <ButtonErrorOutlined Color="#D32F2F" icon={CancelOutlined} LabelName={'Batalkan'}  onClick={handleBatalkanKKM}/>
              </Box>
            </CustomTabPanel>
          </Box>
        </Box>

        {/* Question Event */}
        <CustomTabPanel value={value} index={2}>
          <Box display="flex" flexDirection="column" alignItems="center" marginTop={'-35px'} paddingLeft={'24px'} paddingRight={'24px'} paddingBottom={'24px'}> 
          {/* Container with Flexbox layout */}
            <Grid>
              {/* Flex container for the title and button */}
              <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={0} marginBottom={'16px'}>
                <Typography fontSize={22} fontWeight={600}>Daftar Pertanyaan</Typography>
                  <ButtonPrimary Color="#ffffff" icon={AddCircleOutline} LabelName={'Tambah Data'}/>
       
              </Box>
              
              {/* Table */}
              <DaftarPertanyaanTable></DaftarPertanyaanTable>
            </Grid>

            <Box display="flex" justifyContent="flex-end" width="100%">
              <Box sx={{ marginRight: '16px' }}>
                <ButtonPrimary Color="#ffffff" icon={SaveOutlined} LabelName={'Simpan'}/>
              </Box>
              <ButtonErrorOutlined Color="#D32F2F" icon={CancelOutlined} LabelName={'Batalkan'}/>
            </Box>
          </Box>
        </CustomTabPanel>

        {/* Komite Talent */}
        <CustomTabPanel value={value} index={3}>
          <Box display="block" width='100%' flexDirection="column" alignItems="center" padding={'12px 24px'} marginTop={-5}> 
            <AccordionKomiteTalent 
              title={'Komite Talent 1'} 
              subtitle={'Direktur Utama - Faizal Rochmad Djoemadi'}
              icon={GroupsOutlined} 
              content={<DaftarKomiteTalent/>}
            />
            <AccordionKomiteTalent 
              title={'Komite Talent 2'} 
              subtitle={'Direktur HCM - Tonggo Marbun'}
              icon={GroupsOutlined} 
              content={<DaftarKomiteTalent/>}
            />
            <AccordionKomiteTalent 
              title={'Komite Talent 3'} 
              subtitle={'Senior Vice President HCSBP - Chandra Dewi'}
              icon={GroupsOutlined} 
              content={<DaftarKomiteTalent/>}
            />
          </Box> 
        </CustomTabPanel>

        {/* Nilai Assessment */}
        <CustomTabPanel value={value} index={4}>
        <Box sx={boxStyle}>
            <FlexContainer>
                <Typography style={{fontSize:'22px', fontWeight:'600'}}>
                    Tabel Karyawan
                </Typography>
                <div style={{ flex: '1' }}> </div>
                <ButtonPrimary Color="#ffffff" icon={FileUploadOutlined} LabelName={'Unggah Data'} onClick={handleOpen}/>
                <ButtonOptional icon={SimCardDownloadOutlined} LabelName={'Unduh Template'}/>
                <ButtonOptional icon={FileDownloadOutlined} LabelName={'Unduh Data'}/>
            </FlexContainer>

            <Grid style={{marginBottom: '0.2%'}}>
                <DetailTalentPertama 
                    selectedRumpunJabatan={selectedRumpunJabatan}
                    setSelectedRumpunJabatan={setSelectedRumpunJabatan}
                    selectedJobLevel={selectedJobLevel}
                    setSelectedJobLevel={setSelectedJobLevel}
                    selectedKantor={selectedKantor}
                    setSelectedKantor={setSelectedKantor}
                    />
            </Grid>

            <NilaiAssessmentTable 
                selectedKantor={selectedKantor}
                selectedRumpunJabatan={selectedRumpunJabatan}
                selectedJobLevel={selectedJobLevel}
                selectedStatusIDP={selectedStatusIDP}
            />

          </Box>

        </CustomTabPanel>

        <UnggahDataNilaiAssessment
            open={openUnggahData}
            handleClose={() => setopenUnggahData(false)}
        />

     </MainCard>
    </>
  );
};

export default ParameterTalent;