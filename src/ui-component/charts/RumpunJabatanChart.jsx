import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from './RumpunJabatanChart00';
import MainCard from '../../ui-component/cards/MainCard';
import { gridSpacing } from '../../store/constant';

// chart data
import chartData from '../../views/dashboard/Default/chart-data/total-growth-bar-chart';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const RumpunJabatanChart = ({ isLoading }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  useEffect(() => {
    const newChartData = {
      ...chartData.options,
      width: 300,
      height: 400,
      colors: ['#0F1C3E'], // Mengubah warna grafik menjadi '#0F1C3E'
      xaxis: {
        labels: {
          style: {
            colors: ['#0F1C3E'] // Mengubah warna label sumbu x menjadi '#0F1C3E'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary] // Menggunakan warna utama yang sudah ditentukan
          }
        }
      },
      grid: {
        borderColor: grey200 // Menggunakan warna grid yang sudah ditentukan
      },
      tooltip: {
        theme: 'light' // Menggunakan tema tooltip yang sudah ditentukan
      },
      legend: {
        labels: {
          colors: grey500 // Menggunakan warna label legenda yang sudah ditentukan
        }
      }
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [navType, primary, grey200, grey500, isLoading]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard maxWidth="lg">
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} md={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item> 
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h3">Total Talent Berdasarkan Rumpun Jabatan</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartData} />
            </Grid>
            <Grid item xs={12} md={6}>
              {/* <Typography variant="body1">Keterangan</Typography>
              <Typography variant="body2" textAlign="right"></Typography>
              PP: Perencanaan dan Pengelolaan Strategis<br />
              B  :  Bisnis<br/>
              OP :  Operasi<br />
              MR : Manajemen Resiko dan Kepatuhan<br />
              PR : Pengelolaan Regulasi<br />
              DI : Pengelolaan Teknologi<br />
              KU : Keuangan<br />
              SD : Sumber Daya Manusia<br /> */}
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

RumpunJabatanChart.propTypes = {
  isLoading: PropTypes.bool
};

export default RumpunJabatanChart;
