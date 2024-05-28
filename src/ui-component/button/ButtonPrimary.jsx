import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonPrimary({ Color, backgroundColor, hoverColor, hoverBackgroundColor, icon, LabelName, padding, onClick, disabled }) {
  const IconComponent = icon; // Assuming the icon is passed as a component

  return (
    <Button 
      variant="contained"
      sx={{ 
        color: Color || '#ffffff',  
        backgroundColor: backgroundColor || '#1C2D5A', 
        borderRadius: '12px', 
        fontSize: '14px', // Custom font size
        padding: padding || '14px 24px', // Custom padding using relative units
        boxShadow: 'none',
        '&:hover': {
          color: hoverColor || '#ffffff', // Hover color
          backgroundColor: hoverBackgroundColor || '#122350', // Hover background color
          boxShadow: 15
        }
      }} 
      endIcon={<IconComponent />} // Dynamically setting the icon size using relative units
      onClick={onClick}
      disabled={disabled}
    >
        {LabelName}
    </Button>
  );
}