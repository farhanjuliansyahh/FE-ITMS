import  { useEffect, useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import MainCard from '../../ui-component/cards/MainCard';
import { Grid, Typography} from '@mui/material';
import { gridSpacing } from '../../store/constant';
import PropTypes from 'prop-types'; 

const seriesData = [
  { name: 'Gen X', value: 50, year: 2023 },
  { name: 'Gen Y', value: 88, year: 2023 },
  { name: 'Gen Z', value: 72, year: 2023 },
  { name: 'Gen X', value: 55, year: 2024 },
  { name: 'Gen Y', value: 58, year: 2024 },
  { name: 'Gen Z', value: 44, year: 2024 },
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
    formatter: function (val, opts) {
        const seriesIndex = opts.seriesIndex;
        const series = opts.w.config.series;
        const gen_xy = series.slice(0, series.length - 1).reduce((acc, val) => acc + val, 0);
        const total = series.slice(0, series.length ).reduce((acc, val) => acc + val, 0);
        const genx = series.slice(0, series.length-2).reduce((acc, val) => acc + val, 0);
        const geny = gen_xy-genx;
        const persentase_genx = Math.round((genx/total)*100);
        const persentase_geny = Math.round((geny/total)*100);
        console.log('genx :', genx)
        console.log('geny', geny)
        console.log(gen_xy)
        if (seriesIndex === 0){
          return Math.round((genx/total)*100) + '%'
        } else if (seriesIndex === 1) {
          return Math.round((geny/total)*100) + '%'
        } else {
          return (100 - (persentase_genx+persentase_geny)).toFixed(0) + '%'; 
        }
      }
  },
  labels: [], // This will be set dynamically
  colors: ['#1C2D5A', '#7e9bc8','#4978b1'],
  legend: {
    fontSize: '14px',
    position: 'right',
    offsetY: 100,
    offsetX: 0,
  },
};

const GenerasiTalent= ({selectedYear}) => {
  const chartRef = useRef(null);
  const [filteredData, setFilteredData] = useState(seriesData);
  const [aggregatedSeries, setAggregatedSeries] = useState(aggregateDataByName(filteredData));

  useEffect(() => {
    if (selectedYear === '0') {
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
        ApexCharts.exec('generasiTalentChart', 'updateOptions', updatedOptions);
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
          <div id="generasiTalentChart" ref={chartRef} />
        </Grid>
      </Grid>
    </MainCard>
  );
};
GenerasiTalent.propTypes = {
  selectedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
export default GenerasiTalent;

