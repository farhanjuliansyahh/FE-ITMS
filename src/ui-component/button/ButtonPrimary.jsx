import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonPrimary({ Color, icon, LabelName }) {
  const IconComponent = icon; // Assuming the icon is passed as a component

  return (
    <Button 
      variant="contained"
      sx={{ 
        textColor: Color, 
        borderRadius: '12px', 
        fontSize: '14px', // Custom font size
        padding: '14px 24px', // Custom padding using relative units
      }} 
      endIcon={<IconComponent />} // Dynamically setting the icon size using relative units
    >
        {LabelName}
    </Button>
  );
}


