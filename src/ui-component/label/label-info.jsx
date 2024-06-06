import React from 'react';
import { styled } from '@mui/material/styles';

const CurrentEventLabel = styled('div')({
  backgroundColor: '#EAF8FF', 
  color: '#2196F3',
  padding: '8px 16px',
  borderRadius: '24px',
  fontWeight: 500,
  fontSize:'16px'
});

export default function LabelInfo({length, kuota}) {

  return (
    <>
      <CurrentEventLabel>Terpilih {length} dari {kuota} Talent Karyawan</CurrentEventLabel>
    </>
  );
}