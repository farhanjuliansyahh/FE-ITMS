import React, { useRef, useState } from 'react';
import ApexCharts from 'apexcharts';
import MainCard from '../cards/MainCard';
import { Grid, Typography, Button, Menu, MenuItem } from '@mui/material';
import { gridSpacing } from '../../store/constant';

const JenisKelaminChart = ({ series, options }) => {
  const chartRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = (format) => {
    switch (format) {
      case 'svg':
        downloadChartAsSVG();
        break;
      case 'png':
        downloadChartAsPNG();
        break;
      case 'csv':
        downloadChartDataAsCSV();
        break;
      default:
        break;
    }
    handleMenuClose();
  };

  const downloadChartAsSVG = () => {
    const { chart } = chartRef.current;
    chart.dataURI().then((svgData) => {
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = 'chart.svg';
      downloadLink.click();
      URL.revokeObjectURL(svgUrl);
    });
  };

  const downloadChartAsPNG = () => {
    const { chart } = chartRef.current;
    chart.dataURI().then((pngData) => {
      const pngBlob = new Blob([pngData], { type: 'image/png' });
      const pngUrl = URL.createObjectURL(pngBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'chart.png';
      downloadLink.click();
      URL.revokeObjectURL(pngUrl);
    });
  };

  const downloadChartDataAsCSV = () => {
    const { options: chartOptions, series: chartSeries } = options;
    const csvContent = chartOptions.labels.join(',') + '\n' + chartSeries.join(',');
    const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const downloadLink = document.createElement('a');
    downloadLink.href = csvUrl;
    downloadLink.download = 'chart.csv';
    downloadLink.click();
    URL.revokeObjectURL(csvUrl);
  };

  React.useEffect(() => {
    const chart = new ApexCharts(chartRef.current, {
      ...options,
      series,
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
                  <Typography variant="h3">Total Talent Berdasarkan Jenis Kelamin</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleMenuOpen}>
                Download
              </Button>
              <Menu
                id="download-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => handleDownload('svg')}>Download as SVG</MenuItem>
                <MenuItem onClick={() => handleDownload('png')}>Download as PNG</MenuItem>
                <MenuItem onClick={() => handleDownload('csv')}>Download Data as CSV</MenuItem>
              </Menu>
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

JenisKelaminChart.defaultProps = {
  series: [50, 88], // Mengubah struktur data series menjadi sesuai dengan pie chart
  options: {
    chart: {
      type: 'pie', // Mengubah tipe chart menjadi 'pie'
      width: 500, // Menyesuaikan lebar pie chart
      height: 500, // Menyesuaikan tinggi pie chart
    },
    labels: ['Laki-laki', 'Perempuan'], // Menambahkan label untuk pie chart
    colors: ['#1C2D5A', '#EF4123'], // Mengubah warna pie chart
  },
};

export default JenisKelaminChart;