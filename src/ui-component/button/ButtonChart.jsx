// import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

function ButtonChart({ buttonText, detail }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', marginTop: '8px' }}>
      <Button variant="contained" size="small" style={{ color:"white", backgroundColor: '#0F1C3E' }} >
        {buttonText}
      </Button>
      <Typography variant="body1" style={{ fontSize:'14px', marginLeft: '10px' }}>
        {detail}
      </Typography>
    </div>
  );
}
ButtonChart.propTypes = {
    buttonText: PropTypes.string.isRequired, // Specify buttonText prop as a required string
    detail: PropTypes.string.isRequired, // Specify detail prop as a required string
  };
export default ButtonChart;