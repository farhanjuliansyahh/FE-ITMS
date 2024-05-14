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
const RumpunJabatanTerbaru = ({ isLoading, data }) => {
  const [chartSeries, setChartSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!isLoading && data.length > 0) {
      // Define all desired categories
      const allCategories = ['OP', 'B', 'PP', 'MR', 'PR', 'TI', 'KU', 'SDM'];
  
      // Extracting unique categories from data
      const uniqueCategories = Array.from(new Set(data.map(item => item.nama_rumpun_jabatan)));
  
      // Add any missing categories to the unique categories array
      allCategories.forEach(category => {
        if (!uniqueCategories.includes(category)) {
          uniqueCategories.push(category);
        }
      });
  
      // Extracting unique stack categories
      const uniqueStackCategories = Array.from(new Set(data.map(item => item.Nama_Matriks_Kategori)));
  
      // Mapping data to series format
      const seriesData = uniqueStackCategories.map(stackCategory => {
        return {
          name: stackCategory,
          data: uniqueCategories.map(category => {
            const foundItem = data.find(item => item.nama_rumpun_jabatan === category && item.Nama_Matriks_Kategori === stackCategory);
            return foundItem ? parseInt(foundItem.count) : 0;
          })
        };
      });
  
      setChartSeries(seriesData);
      setCategories(uniqueCategories);
    }
  }, [isLoading, data]);

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
      xaxis: {
        categories: categories
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
    series: chartSeries
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
  isLoading: PropTypes.bool,
  data: PropTypes.array
};

export default RumpunJabatanTerbaru;
