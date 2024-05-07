import { useEffect, useState } from 'react';
// material-ui
import { Grid} from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import Header from '../../../ui-component/header/header';
import MainCard from '../../../ui-component/cards/MainCard';
import DetailTalentPertama from '../../../ui-component/button/DropdownDetailTalentPertama';
import DetailTalentTable from '../../../ui-component/tables/detail-talent-table';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// ==============================|| DETAIL TALENT - DASHBOARD ||============================== //

export default function TalentDetail() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);
  const [selectedKantor, setSelectedKantor] = useState(null);
  const [selectedRumpunJabatan, setSelectedRumpunJabatan] = useState(null);
  const [selectedJobLevel, setSelectedJobLevel] = useState(null);
  const [selectedStatusIDP, setSelectedStatusIDP] = useState(null);
  
  return (
    <>
      {/* <MainLayout/> */}
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Header title={'Monitoring Talent'}/>
            </Grid>
          </Grid>
        </Grid>

        
        <Grid item xs={12}>
        <MainCard style={{ padding: '24px 24px'}} >
            <Grid style={{marginBottom: '0.2%'}}>
               <DetailTalentPertama 
                selectedKantor={selectedKantor}
                setSelectedKantor={setSelectedKantor}
                selectedRumpunJabatan={selectedRumpunJabatan}
                setSelectedRumpunJabatan={setSelectedRumpunJabatan}
                selectedJobLevel={selectedJobLevel}
                setSelectedJobLevel={setSelectedJobLevel}
                selectedStatusIDP={selectedStatusIDP}
                setSelectedStatusIDP={setSelectedStatusIDP}/>
            </Grid>
            <Grid style={{marginBottom: '2%'}}>
              <div  style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <ButtonPrimary Color='#ffffff' backgroundColor='#1C2D5A' icon={FileDownloadOutlinedIcon} LabelName='Unduh Data' />
              </div>
               
            </Grid>
            <Grid style={{marginBottom: '0.5%'}}>
               <DetailTalentTable 
                selectedKantor={selectedKantor}
                selectedRumpunJabatan={selectedRumpunJabatan}
                selectedJobLevel={selectedJobLevel}
                selectedStatusIDP={selectedStatusIDP}/>
            </Grid>
        </MainCard>
        </Grid>


      </Grid>
    </>
  );
};


