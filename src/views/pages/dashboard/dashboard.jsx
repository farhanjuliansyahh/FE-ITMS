import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import GroupsIcon from '@mui/icons-material/Groups';
import Header from '../../../ui-component/header/header';
import DashboardCard from '../../../ui-component/cards/DashboardCard';
import LevelJabatanChart from '../../../ui-component/charts/LevelJabatanChart';
import ButtonChart from '../../../ui-component/button/ButtonChart';
import MainCard from '../../../ui-component/cards/MainCard';
import RumpunJabatanTerbaru from '../../../ui-component/charts/RumpunJabatanChartTerbaru';
import JenisKelaminTerbaru from '../../../ui-component/charts/JenisKelaminTerbaru';
import GenerasiTalent from '../../../ui-component/charts/GenerasiTalent';


// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
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
    // { title: "Total IDP Aktif",
    //   content: 1019,
    //   icon: NotificationsActiveOutlinedIcon,
    //   // navigateTo: '/dashboard/total-pegawai',
    // },
  ]

  return (
    <>
      {/* <MainLayout/> */}
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Header title={'Dashboard'}/>
            </Grid>
          </Grid>
        </Grid>

        
        <Grid container spacing={2} item xs={12}>
            {cards.map((card, index) => (
              // <Grid item xs={12}sm={6} md={6} key={index}>
              <Grid item xs={12}>
                <DashboardCard
                  isLoading={isLoading}
                  title={card.title}
                  content={card.content}
                  icon={<card.icon />}
                  PathLink={"/dashboard/detail-talent"}
                />
              </Grid>
            ))}
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6}>
              {/* <JenisKelaminChart isLoading={isLoading} /> */}
              <JenisKelaminTerbaru isLoading={isLoading}/>
            </Grid>
            <Grid item xs={12} md={6}>
              <GenerasiTalent/>
              {/* <GenerasiChart isLoading={isLoading} /> */}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6}>
              {/* <RumpunJabatanChart isLoading={isLoading} /> */}
              <RumpunJabatanTerbaru isLoading={isLoading} />
              
            </Grid>
            <Grid item xs={12} md={6}>
              <LevelJabatanChart isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
        <MainCard style={{ padding: '24px 24px'}} >
          <Grid item xs={12} md={12}>
            <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '6px'}}>Keterangan</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2} justifyContent="start">
              <Grid item xs={4}>
                <ButtonChart buttonText="PP" detail="Perencanaan dan Pengelolaan Strategis"/>
              </Grid>
              <Grid item xs={4}> 
                <ButtonChart buttonText="B" detail="Bisnis" />
              </Grid>
              <Grid item xs={4}>
                <ButtonChart buttonText="OP" detail="Operasi" />
              </Grid>
              <Grid item xs={4} >
                <ButtonChart buttonText="MR" detail="Manajemen Risiko dan Kepatuhan" />
              </Grid>
              <Grid item xs={4}>
                <ButtonChart buttonText="PR" detail="Pengelolaan Regulasi" />
              </Grid>
              <Grid item xs={4}>
                <ButtonChart buttonText="DI" detail="Pengelolaan Teknologi" />
              </Grid>
              <Grid item xs={4}>
                <ButtonChart buttonText="KU" detail="Keuangan" />
              </Grid>
              <Grid item xs={4}>
                <ButtonChart buttonText="SD" detail="Sumber Daya Manusia" />
              </Grid>
            </Grid>
          </Grid>
          </MainCard>
        </Grid>
        
      </Grid>
    </>
  );
};

export default Dashboard;
