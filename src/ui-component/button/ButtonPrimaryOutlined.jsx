import * as React from 'react';
import Button from '@mui/material/Button';

export default function ButtonPrimaryOutlined({ Color, backgroundColor, borderColor, icon, LabelName, onClick, disabled }) {
  const IconComponent = icon; 

  return (
    <Button
      variant="contained"
      sx={{
        color: Color || '#1C2D5A',
        backgroundColor: backgroundColor || '#FFFFFF',
        border: disabled ? 'none' : borderColor || '1px solid #1C2D5A',
        borderRadius: '12px',
        fontSize: '14px',
        padding: '14px 24px',
        boxShadow: 'none',
        '&:hover': {
          backgroundColor: '#F5F8FF',
          color: '#0F1C3E'
        },
        '&:disabled': {
          backgroundColor: '#FFFFFF',
          color: '#E0E0E0',
          border: borderColor || '1px solid #E0E0E0'
        }
      }}
      startIcon={<IconComponent />}
      onClick={onClick}
      disabled={disabled}
    >
      {LabelName}
    </Button>
  );
}
