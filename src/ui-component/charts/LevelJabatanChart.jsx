import React from 'react';
import ApexCharts from 'apexcharts';
import MainCard from '../../ui-component/cards/MainCard';
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../store/constant';

const LevelJabatanChart = ({ series, options }) => {
  const chartRef = React.createRef();

  React.useEffect(() => {
    const chart = new ApexCharts(chartRef.current, {
      ...options,
      series,
      width: 300,
      height: 400,
    });

    chart.render();

    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [series, options]);

  return (
      <MainCard maxWidth="lg">
          <Grid container spacing={gridSpacing} paddingTop={3} paddingLeft={3} paddingRight={3}>
            <Grid item xs={12} md={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item> 
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="h3">Jumlah Talent Menurut Level Jabatan</Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <div ref={chartRef} />
            </Grid>
          </Grid>
        </MainCard>
  );
};

LevelJabatanChart.defaultProps = {
  series: [
    {
      name: 'Total Talent',
      data: [0, 88, 118, 139, 151, 135, 98, 144, 173, 184, 117, 112],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 400,
      toolbar: {
        export: {
          csv: {
            filename: 'Jumlah_talent_menurut_joblevel.csv',
            columnDelimiter: ',',
            headerCategory: 'Level_Jabatan',
            headerValue: 'Total_Talent',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString()
            },
          },
          svg: {
            filename: 'Jumlah_talent_menurut_joblevel',
          },
          png: {
            filename: 'Jumlah_talent_menurut_joblevel',
          }
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 1,
        horizontal: true,
        colors: {
          ranges: [
            { from: 1, to: 200, color: '#0F1C3E' },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        'A2',
        'A1',
        'B2',
        'B1',
        'C2',
        'C1',
        'D3',
        'D2',
        'D1',
        'E3',
        'E2',
        'E1',
      ],
    },
  },
};

export default LevelJabatanChart;
