import * as React from 'react';
import Button from '@mui/material/Button';

export default function SearchResetButton({ outlineColor, icon, LabelName }) {
  const IconComponent = icon; // Assuming the icon is passed as a component

  return (
    <Button 
      variant="outlined"
      sx={{ 
        borderColor: outlineColor, 
        borderRadius: '12px', 
        fontSize: '1rem', // Custom font size
        padding: '0.5em 1em', // Custom padding using relative units
        minWidth: '6.25em', // Custom minimum width using relative units
        minHeight: '3.125em' // Custom minimum height using relative units
      }} 
      style={{ borderColor: outlineColor, color: outlineColor }} // Dynamically setting the border color
      endIcon={<IconComponent style={{ fontSize: '1.2em' ,color: outlineColor}} />} // Dynamically setting the icon size using relative units
    >
        {LabelName}
    </Button>
  );
}