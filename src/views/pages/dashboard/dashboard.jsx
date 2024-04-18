import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

import { gridSpacing } from '../../../store/constant';
import GroupsIcon from '@mui/icons-material/Groups';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import Header from '../../../ui-component/header/header';
import DashboardCard from '../../../ui-component/cards/DashboardCard';
import RumpunJabatanChart from '../../../ui-component/charts/RumpunJabatanChart';
import LevelJabatanChart from '../../../ui-component/charts/LevelJabatanChart';

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
              <Header title={'Dashboard'}/>
            </Grid>
          </Grid>
        </Grid>

        
        <Grid container spacing={2} item xs={12}>
            {cards.map((card, index) => (
              <Grid item xs={12}sm={6} md={6} key={index}>
                <DashboardCard
                  isLoading={isLoading}
                  title={card.title}
                  content={card.content}
                  icon={<card.icon />}  
                />
              </Grid>
            ))}
        </Grid>
        
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={6}>
              <RumpunJabatanChart isLoading={isLoading} />
            </Grid>
            <Grid item xs={12} md={6}>
              <LevelJabatanChart isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
