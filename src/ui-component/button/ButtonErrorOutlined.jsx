import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonErrorOutlined({ Color, backgroundColor, icon, LabelName, padding, onClick, disabled }) {
  const IconComponent = icon; // Assuming the icon is passed as a component

  return (
    <Button 
      variant="contained"
      sx={{ 
        color: Color || '#D32F2F',  
        backgroundColor: backgroundColor || '#FFFFFF', 
        border: '1px solid #D32F2F', // Warna dan lebar border
        borderRadius: '12px', 
        fontSize: '14px', // Custom font size
        padding: padding || '14px 24px',  // Custom padding using relative units
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#FFEDED', // Warna latar belakang saat hover
          color: '#D32F2F', // Warna teks saat hover
        },
      }} 
      endIcon={<IconComponent />} // Dynamically setting the icon size using relative units
      onClick={onClick}
      disabled={disabled}
    >
        {LabelName}
    </Button>
  );
}



