import { useEffect, useState } from 'react';
import React, { useRef } from 'react';
import ApexCharts from 'apexcharts';
import MainCard from '../../ui-component/cards/MainCard';
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../store/constant';
import { fontSize } from '@mui/system';

const JenisKelaminTerbaru = () => {
  const chartRef = useRef(null);
  const seriesData = [50, 88];
  const chartOptions = {
    chart: {
      type: 'donut',
      height: 300,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true | '<img src="/static/icons/reset.png" class="icon" width="20">',
          customIcons: [],
        },
        export: {
          csv: {
            filename: 'Rasio talent menurut kelompok jenis kelamin',
            columnDelimiter: ',',
            headerCategory: 'Jenis Kelamin',
            headerValue: 'Rasio talent menurut kelompok jenis kelamin',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            }
          },
          svg: {
            filename: 'Rasio talent menurut kelompok jenis kelamin',
          },
          png: {
            filename: 'Rasio talent menurut kelompok jenis kelamin',
          },
        },
      },
    },
    plotOptions: {
      donut: {
        customScale: 0.6,
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return opts.w.config.labels[opts.seriesIndex] + ": " + val;
          }
        }
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontFamily:'Roboto',
        fontWeight: 380,
        fontSize: '18px', // Adjust the font size as needed
        colors: ['#fff'], // Color of the labels
        placement: 'mid-center',
      },
    },
    labels: ["Perempuan", "Laki-laki"],
    colors: ['#4978b1', '#1C2D5A'], // Change the colors here
    legend: {
      fontsize:'20px',
      position: 'right',
      offsetY: 120,
      offsetX: 0,
    },
  };

  useEffect(() => {
    const chart = new ApexCharts(chartRef.current, {
      ...chartOptions,
      series: seriesData,
    });

    chart.render();

    return () => {
      chart.destroy();
    };
  }, [seriesData, chartOptions]);

  return (
    <MainCard maxWidth="lg">
      <Grid container spacing={gridSpacing} paddingTop={3} paddingLeft={3} paddingRight={3}>
        <Grid item xs={12} md={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h3">Rasio Talent Menurut Kelompok Jenis Kelamin </Typography>
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

export default JenisKelaminTerbaru;
