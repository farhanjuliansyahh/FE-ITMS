import { useEffect, useState } from 'react';
import React, { useRef } from 'react';
import ApexCharts from 'apexcharts';
import MainCard from '../../ui-component/cards/MainCard';
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../store/constant';


const GenerasiTalent = () => {
  const chartRef = useRef(null);
  const seriesData = [50, 88, 110];
  const chartOptions = {
    chart: {
      type: 'pie',
      height: 400,
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
            filename: 'Rasio talent menurut kelompok generasi',
            columnDelimiter: ',',
            headerCategory: 'Rasio talent menurut kelompok generasi',
            headerValue: 'Rasio talent menurut kelompok generasi',
            dateFormatter(timestamp) {
              return new Date(timestamp).toDateString();
            }
          },
          svg: {
            filename: 'Rasio talent menurut kelompok generasi',
          },
          png: {
            filename: 'Rasio talent menurut kelompok generasi',
          },
        },
      },
    },
    plotOptions: {
      pie: {
        customScale: 1,
        dataLabels: {
          enabled: true,
          formatter: function (val, opts) {
            return opts.w.config.labels[opts.seriesIndex] + " : " + val;
          }
        }
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontFamily:'Roboto',
        fontWeight: 380,
        fontSize: '18px', 
        colors: ['#fff'],
      },
      // formatter: function (val, opts) {
      //   return `${Math.round(val )}%`;    
      // },
      formatter: function (val, opts) {
        const seriesIndex = opts.seriesIndex;
        let formattedValue;
        
        if (seriesIndex === 1) {
            formattedValue = Math.floor(val) + '%';
        } else if (seriesIndex === 2){
            formattedValue = Math.floor(val) + '%';
        } else {
          formattedValue = Math.ceil(val) + '%';
      } 
    
        return formattedValue;
    }
    },
    labels: ["Gen X", "Gen Y", "Gen Z"],
    colors: ['#1C2D5A', '#7e9bc8','#4978b1'], 
    legend: {
      position: 'right',
      offsetY: 140,
      offsetX: 40,
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
      <Grid container spacing={gridSpacing} paddingTop={3} paddingLeft={3} paddingRight={3} paddingBottom={3}>
        <Grid item xs={12} md={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h3">Rasio Talent Menurut Kelompok Generasi </Typography>
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

export default GenerasiTalent;
