import { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import MainCard from '../../ui-component/cards/MainCard';
import { Grid, Typography} from '@mui/material';
import { gridSpacing } from '../../store/constant';
import PropTypes from 'prop-types'; 

const seriesData = [
  { name: 'Perempuan', value: 50, year: 2023 },
  { name: 'Laki-laki', value: 88, year: 2023 },
  { name: 'Perempuan', value: 55, year: 2024 },
  { name: 'Laki-laki', value: 58, year: 2024 },
];

const aggregateDataByName = (data) => {
  const categories = [...new Set(data.map(item => item.name))];
  return categories.map(category => {
    const categoryData = data.filter(item => item.name === category);
    return {
      name: category,
      data: categoryData.map(item => item.value),
      years: categoryData.map(item => item.year),
    };
  });
};

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
  colors: ['#4978b1', '#1C2D5A'],
  legend: {
    fontSize: '14px',
    position: 'right',
    offsetY: 100,
    offsetX: 0,
  },
};

const JenisKelaminTerbaru = ({selectedYear}) => {
  const chartRef = useRef(null);
  const [filteredData, setFilteredData] = useState(seriesData);
  const [aggregatedSeries, setAggregatedSeries] = useState(aggregateDataByName(filteredData));

  useEffect(() => {
    if (selectedYear === 'all') {
      setFilteredData(seriesData);
    } else {
      setFilteredData(seriesData.filter(item => item.year === parseInt(selectedYear, 10)));
    }
  }, [selectedYear]);

  useEffect(() => {
    setAggregatedSeries(aggregateDataByName(filteredData));
  }, [filteredData]);

  useEffect(() => {
        if (chartRef.current) {
          const updatedOptions = {
            ...chartOptions,
            labels: aggregatedSeries.map(item => item.name),
            series: aggregatedSeries.map(item => item.data.reduce((acc, value) => acc + value, 0)),
          };
          ApexCharts.exec('jenisKelaminTerbaruChart', 'updateOptions', updatedOptions);
        }
      }, [aggregatedSeries]);
    
    useEffect(() => {
        const options = {
          ...chartOptions,
          labels: aggregatedSeries.map(item => item.name),
          series: aggregatedSeries.map(item => item.data.reduce((acc, value) => acc + value, 0)),
        };
        const chart = new ApexCharts(chartRef.current, options);
        chart.render();
    return () => {
      chart.destroy();
    };
  }, [aggregatedSeries]);

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
    selectedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  };
export default JenisKelaminTerbaru;

