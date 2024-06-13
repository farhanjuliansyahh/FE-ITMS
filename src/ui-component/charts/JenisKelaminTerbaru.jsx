import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import MainCard from '../../ui-component/cards/MainCard.jsx';
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../store/constant.jsx';
import PropTypes from 'prop-types'; 

const chartOptions = {
  chart: {
    type: 'donut',
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
      customScale: 1,
      dataLabels: {
        enabled: false,
        formatter: function (val, opts) {
          return opts.w.config.labels[opts.seriesIndex] + " : " + val;
        }
      },
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      fontFamily: 'Roboto',
      fontWeight: 380,
      fontSize: '18px',
      colors: ['#fff'],
    },
    formatter: function (val) {
      return `${Math.round(val)}%`;
    },
  },
  labels: [], // This will be set dynamically
  colors: ['#4978b1', '#1C2D5A', '#8a9db0'], // Add an additional color for the third category
  legend: {
    fontSize: '14px',
    position: 'right',
    offsetY: 100,
    offsetX: 0,
    formatter: function (seriesName) {
      return `${seriesName}`;
    },
  },
};

const JenisKelaminTerbaru = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // Map the data to correct labels
      const modifiedData = data.map(item => {
        let newName = item.name;
        if (newName === 'tidak diketahui') newName = 'Tidak diketahui';
        return { ...item, name: newName };
      });

      const options = {
        ...chartOptions,
        labels: modifiedData.map(item => item.name),
        series: modifiedData.map(item => parseInt(item.value, 10)),
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();
      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return (
    <MainCard maxWidth="lg">
      <Grid container spacing={gridSpacing} paddingTop={3} paddingLeft={3} paddingRight={3} paddingBottom={3}>
        <Grid item xs={12}>
          <Typography variant="h3">Rasio Talent Menurut Kelompok Jenis Kelamin</Typography>
        </Grid>
        <Grid item xs={12}>
          <div id="jenisKelaminTerbaruChart" ref={chartRef} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

JenisKelaminTerbaru.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default JenisKelaminTerbaru;
