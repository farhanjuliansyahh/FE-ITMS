import { useEffect, useState } from 'react';
import React from 'react';
import MainCard from '../../ui-component/cards/MainCard';
import { Grid, Typography} from '@mui/material';
import { gridSpacing } from '../../store/constant';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// ==============================|| TOTAL GROWTH BAR CHART ||============================== //
const RumpunJabatanTerbaru = ({ isLoading }) => {
  const chartDataStackBar = {
    height: 480,
    type: 'bar',
    options: {
      chart: {
        id: 'bar-chart',
        stacked: true,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        }
      },
      responsive: [
        {
          breakpoint: 300,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0
            }
          }
        }
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '63%'
        }
      },
      xaxis: {
        type: 'category',
        categories: ['PP', 'B', 'OP', 'MR', 'PR', 'DI', 'KU', 'SD'],
        titles: ['Perencanaan dan Pengelolaan Strategis', 'Bisnis', 'Operasi', 'Manajemen Risiko dan Kepatuhan', 
                'Pengelolaan Regulasi', 'Pengelolaan Teknologi', 'Keuangan', 'Sumber Daya Manusia']
      },
      legend: {
        show: true,
        fontFamily: `'Roboto', sans-serif`,
        position: 'bottom',
        offsetX: -25,
        labels: {
          useSeriesColors: false
        },
        markers: {
          width: 16,
          height: 16,
          radius: 5
        },
        itemMargin: {
          horizontal: 5,
          vertical: 8
        }
      },
      fill: {
        type: 'solid'
      },
      dataLabels: {
        enabled: false
      },
      grid: {
        show: true
      }
    },
    series: [
      {
        name: 'High Potential',
        data: [35, 125, 35, 35, 35, 80, 35, 20]
      },
      {
        name: 'Promotable-2',
        data: [35, 15, 15, 35, 65, 40, 80, 25]
      },
      {
        name: 'Promotable-3',
        data: [35, 145, 35, 35, 20, 105, 100, 10]
      },
      {
        name: 'Promotable-4',
        data: [0, 0, 75, 0, 0, 115, 0, 0]
      }
    ]
  };

  const theme = useTheme();

  const { primary } = theme.palette.text;
  const divider = theme.palette.divider;
  const grey500 = theme.palette.grey[500];
  const text = '#1F1F1F';
  const primary200 = '#1C2D5A';
  const primaryDark = '#7e9bc8';
  const secondaryMain = '#4978b1';
  const secondaryLight = '#3c6494';

  React.useEffect(() => {
    const newChartData = {
      ...chartDataStackBar.options,
      colors: [primary200, primaryDark, secondaryMain, secondaryLight],
      xaxis: {
        labels: {
          style: {
            colors: [primary, primary, primary, primary, primary, primary, primary, primary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [text, text, text, text]
          }
        }
      },
      grid: { borderColor: divider },
      tooltip: { theme: 'light' },
      legend: { labels: { colors: text} }
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [primary200, primaryDark, secondaryMain, secondaryLight, primary, divider, isLoading, grey500]);

  return (
    <>
      {isLoading ? (
        <Card>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                  <Grid item xs zeroMinWidth>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Skeleton variant="text" />
                      </Grid>
                      <Grid item xs={12}>
                        <Skeleton variant="rectangular" height={20} />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Skeleton variant="rectangular" height={50} width={80} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rectangular" height={530} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing} paddingTop={3} paddingLeft={3} paddingRight={3}>
            <Grid item xs={12}>
              <Grid container direction="column" spacing={1}>
                <Grid item xs={12} md={12}>
                  <Typography variant="h3">Jumlah Talent Menurut Rumpun Jabatan</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                '& .apexcharts-menu.apexcharts-menu-open': {
                  bgcolor: 'background.paper'
                }
              }}
            >
              <Chart {...chartDataStackBar} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

RumpunJabatanTerbaru.propTypes = {
  isLoading: PropTypes.bool
};

export default RumpunJabatanTerbaru;
