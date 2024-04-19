import React from 'react';
import Button from '@mui/material/Button';
import SaveOutlined from '@mui/icons-material/SaveOutlined';

function SimpanButton
() {
  return (
    <Button 
      variant="contained" 
      sx={{
        backgroundColor:'#1a2b5a', 
        borderRadius:'15px', 
        marginRight: '8px'
      }} 
      endIcon={<SaveOutlined />}
    >
      Simpan
    </Button>
  );
}

export default SimpanButton;
