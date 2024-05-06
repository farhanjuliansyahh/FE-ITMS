import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonOptional({ Color, backgroundColor, borderColor, icon, LabelName, onClick, disabled }) {
  const IconComponent = icon; // Assuming the icon is passed as a component

  return (
    <Button 
      variant="contained"
      sx={{ 
        color: Color || '#1C2D5A',  
        backgroundColor: backgroundColor || '#FFFFFF', 
        border: disabled ? 'none' : (borderColor || '1px solid #1C2D5A'),
        borderRadius: '12px', 
        fontSize: '14px',
        padding: '14px 24px', 
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: '#1C2D5A',
            color: '#FFFFFF', 
          },
      }} 
      endIcon={<IconComponent />} 
      onClick={onClick}
      disabled={disabled}
    >
        {LabelName}
    </Button>
  );
}


