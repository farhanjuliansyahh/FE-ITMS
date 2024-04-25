import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonPrimary({ Color, icon, LabelName, onClick }) {
  const IconComponent = icon; // Assuming the icon is passed as a component

  return (
    <Button 
      variant="contained"
      sx={{ 
        textColor: Color, 
        borderRadius: '12px', 
        fontSize: '14px', // Custom font size
        padding: '14px 24px', // Custom padding using relative units
        boxShadow: 'none',
      }} 
      endIcon={<IconComponent />} // Dynamically setting the icon size using relative units
      onClick={onClick}
    >
        {LabelName}
    </Button>
  );
}


