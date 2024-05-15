import { useEffect, useState } from 'react';
import { Grid, Stack } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import { RestartAltOutlined } from '@mui/icons-material';
import Header from '../../../ui-component/header/header';
import MainCard from '../../../ui-component/cards/MainCard';
import DetailTalentTable from '../../../ui-component/tables/detail-talent-table';
import CustomSearch from '../../../ui-component/searchsection/custom-search';
import ButtonErrorOutlined from '../../../ui-component/button/ButtonErrorOutlined';

// ==============================|| DETAIL TALENT - DASHBOARD ||============================== //

export default function TalentDetail() {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const [rows, selectedRows] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/getdetailtalent")
    .then(response => response.json())
        // 4. Setting *dogImage* to the image url that we received from the response above
    .then(data => selectedRows(data))
  },[])

  
  // create list of Nama, Nippos, Job Level, Rumpun Jabatan
  const listNama = [...new Set(rows.map(row => row.nama))];
  const listJobLevel = [...new Set(rows.map(row => row.joblevel))];
  const listRumpunJabatan = [...new Set(rows.map(row => row.jobfam))];
  const listKantor = [...new Set(rows.map(row => row.nama_kantor))];

  const [selectedNama, setSelectedNama] = useState(null);
  const [selectedJobLevel, setSelectedJobLevel] = useState(null);
  const [selectedRumpunJabatan, setSelectedRumpunJabatan] = useState(null);
  const [selectedKantor, setSelectedKantor] = useState(null);

  const resetNamaInput = () => {
    setSelectedNama('');
  };

  const resetJobLevelInput = () => {
    setSelectedJobLevel('');
  };

  const resetRumpunJabatanInput = () => {
    setSelectedRumpunJabatan('');
  };

  const resetKantorInput = () => {
    setSelectedKantor('');
  };

  const handleResetSearch = () => {
    setSelectedNama('');
    setSelectedJobLevel('');
    setSelectedRumpunJabatan('');
    setSelectedKantor('');

    // Call resetInput function for each CustomSearch component
    resetNamaInput();
    resetJobLevelInput();
    resetRumpunJabatanInput();
    resetKantorInput();

  };

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

            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width:'100%' }}>
              <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                <CustomSearch field={listNama} label={'Nama'} onSearch={setSelectedNama} value={selectedNama} resetInput={resetNamaInput} />
                <CustomSearch field={listJobLevel} label={'Job Level'} onSearch={setSelectedJobLevel} value={selectedJobLevel} resetInput={resetJobLevelInput} />
                <CustomSearch field={listRumpunJabatan} label={'Rumpun Jabatan'} onSearch={setSelectedRumpunJabatan} value={selectedRumpunJabatan} resetInput={resetRumpunJabatanInput} />
                <CustomSearch field={listKantor} label={'Kantor'} onSearch={setSelectedKantor} value={selectedKantor} resetInput={resetKantorInput} />
              </Stack>
              <ButtonErrorOutlined onClick={handleResetSearch} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'}/>
            </div>

            <Grid style={{marginBottom: '0.5%'}}>
               <DetailTalentTable 
                rows={rows}
                searchNama={selectedNama} // Pass selectedNama as searchTerm to the NilaiAssessmentTable component
                searchJobLevel={selectedJobLevel}
                searchRumpunJabatan={selectedRumpunJabatan}
                searchKantor={selectedKantor}
               />
            </Grid>
        </MainCard>
        </Grid>


      </Grid>
    </>
  );
};


