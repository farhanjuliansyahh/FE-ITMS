import React from 'react';
import ApexCharts from 'apexcharts';
import MainCard from '../cards/MainCard';
import { Grid, Typography, Button, MenuItem, Menu } from '@mui/material';
import { gridSpacing } from '../../store/constant';

const GenerasiChart = ({ series, options }) => {
  const chartRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleExportClick = (format) => {
    setAnchorEl(null);
    switch (format) {
      case 'csv':
        exportCSV();
        break;
      case 'png':
        exportImage('png');
        break;
      case 'svg':
        exportImage('svg');
        break;
      default:
        break;
    }
  };

  const exportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Generasi,Total\n"
      + series.map((data, index) => [`Gen ${index + 1}`, data]).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "generasi_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  const exportImage = (format) => {
    const chart = chartRef.current.chart;
    chart.toImageURI(format).then(function (uri) {
      const link = document.createElement('a');
      link.setAttribute('href', uri);
      link.setAttribute('download', `generasi_chart.${format}`);
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <MainCard maxWidth="lg">
      <Grid container spacing={gridSpacing} padding={3}>
        <Grid item xs={12} md={12}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item> 
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="h3">Total Talent Berdasarkan Generasi</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)}>Export</Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => handleExportClick('csv')}>CSV</MenuItem>
                <MenuItem onClick={() => handleExportClick('png')}>PNG</MenuItem>
                <MenuItem onClick={() => handleExportClick('svg')}>SVG</MenuItem>
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

GenerasiChart.defaultProps = {
  series: [50, 88, 65], // Mengubah struktur data series menjadi sesuai dengan pie chart
  options: {
    chart: {
      type: 'pie', // Mengubah tipe chart menjadi 'pie'
      width: 500, // Menyesuaikan lebar pie chart
      height: 500, // Menyesuaikan tinggi pie chart
    },
    
    labels: ['Gen X', 'Gen Y', 'Gen Z'], // Menambahkan label untuk pie chart
    colors: ['#1C2D5A', '#EF4123', '#4CAF50'], // Mengubah warna pie chart
  },
};

export default GenerasiChart;
