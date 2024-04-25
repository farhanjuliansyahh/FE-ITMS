import React from 'react';
import ApexCharts from 'apexcharts';
import MainCard from '../../ui-component/cards/MainCard';
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../store/constant';
import ButtonChart from '../../ui-component/button/ButtonChart';

const RumpunJabatanChart = ({ series, options }) => {
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
                  <Typography variant="h3">Proporsi Talent Berdasarkan Rumpun Jabatan </Typography>
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

RumpunJabatanChart.defaultProps = {
  series: [
    {
      data: [50, 88, 118, 139, 151, 135, 98, 144],
    },
  ],
  options: {
    chart: {
      type: 'bar',
      height: 400,
    },
    plotOptions: {
      bar: {
        borderRadius: 1,
        // Remove horizontal property to make the chart vertical
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
        'PP',
        'B',
        'OP',
        'MR',
        'PR',
        'DI',
        'KU',
        'SD',
      ],
    },
  },
};

export default RumpunJabatanChart;
