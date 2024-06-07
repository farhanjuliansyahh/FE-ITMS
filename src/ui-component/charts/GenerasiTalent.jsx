import { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import MainCard from '../../ui-component/cards/MainCard.jsx';
import { Grid, Typography } from '@mui/material';
import { gridSpacing } from '../../store/constant.jsx';
import PropTypes from 'prop-types';

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
  dataLabels: {
    enabled: true,
    style: {
      fontFamily: 'Roboto',
      fontWeight: 380,
      fontSize: '18px',
      colors: ['#fff'],
    },
    formatter: function (val, opts) {
      return Math.round(val) + '%';
    }
  },
  labels: [], // This will be set dynamically
  colors: ['#1C2D5A', '#7e9bc8', '#4978b1'],
  legend: {
    fontSize: '14px',
    position: 'right',
    offsetY: 100,
    offsetX: 0,
  },
};

const GenerasiTalent = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const labels = data.map(item => item.name);
    const series = data.map(item => parseFloat(item.value));

    if (chartRef.current) {
      const updatedOptions = {
        ...chartOptions,
        labels,
        series,
      };
      ApexCharts.exec('generasiTalentChart', 'updateOptions', updatedOptions);
    }
  }, [data]);

  useEffect(() => {
    const labels = data.map(item => item.name);
    const series = data.map(item => parseFloat(item.value));

    const options = {
      ...chartOptions,
      labels,
      series,
    };
    const chart = new ApexCharts(chartRef.current, options);
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <MainCard maxWidth="lg">
      <Grid container spacing={gridSpacing} paddingTop={3} paddingLeft={3} paddingRight={3} paddingBottom={3}>
        <Grid item xs={12}>
          <Typography variant="h3">Rasio Talent Menurut Kelompok Generasi</Typography>
        </Grid>
        <Grid item xs={12}>
          <div id="generasiTalentChart" ref={chartRef} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

GenerasiTalent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
};

export default GenerasiTalent;
