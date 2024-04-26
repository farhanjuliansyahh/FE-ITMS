import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const minimumCompetencyQualified = 3
const minimumPmsQualified = 60
const minimumAkhlakQualified = 3
const minimumLearningAgilityQualified = 3

const getColorStyle = (value, minimumValueQualified) => {
    let color, backgroundColor;
    if (value < minimumValueQualified) {
      color = '#F44336';
      backgroundColor = '#FFEDED';
    } else {
      color = '#66BB6A';
      backgroundColor = '#F5FFF5';
    }
  
    return { color, backgroundColor };
};
  
const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'nama', headerName: 'Nama', width: 130 },
    { field: 'nippos', headerName: 'NIPPOS', width: 130 },
    { field: 'posisi', headerName: 'Posisi', width: 130 },
    { field: 'joblevel', headerName: 'Job Level', width: 130 },
    { field: 'jobfam', headerName: 'Rumpun Jabatan', width: 130 },
    { field: 'kantor', headerName: 'Kantor', width: 130 },
    { field: 'komiteunit', headerName: 'Komite Unit', width: 130 },
    {
        field: 'competency',
        headerName: 'Competency/Psychotest',
        width: 180,
        renderCell: (params) => {
          const { color, backgroundColor } = getColorStyle(params.value, minimumCompetencyQualified);
          return (
            <div>
              <span style={{
                color,
                backgroundColor,
                padding: '4px 8px',
                borderRadius: '24px'
              }}>{params.value}</span>
            </div>
          );
        },
    },
    {
        field: 'pms',
        headerName: 'PMS',
        width: 180,
        renderCell: (params) => {
          const { color, backgroundColor } = getColorStyle(params.value, minimumPmsQualified);
          return (
            <div>
              <span style={{
                color,
                backgroundColor,
                padding: '4px 8px',
                borderRadius: '24px'
              }}>{params.value}</span>
            </div>
          );
        },
    },
    {
        field: 'akhlak',
        headerName: 'AKHLAK',
        width: 180,
        renderCell: (params) => {
          const { color, backgroundColor } = getColorStyle(params.value, minimumAkhlakQualified);
          return (
            <div>
              <span style={{
                color,
                backgroundColor,
                padding: '4px 8px',
                borderRadius: '24px'
              }}>{params.value}</span>
            </div>
          );
        },
    },
    {
        field: 'learningagility',
        headerName: 'Learning Agility',
        width: 180,
        renderCell: (params) => {
          const { color, backgroundColor } = getColorStyle(params.value, minimumLearningAgilityQualified);
          return (
            <div>
              <span style={{
                color,
                backgroundColor,
                padding: '4px 8px',
                borderRadius: '24px'
              }}>{params.value}</span>
            </div>
          );
        },
    },
];

const rows = [
    { id: 1, nama: 'Sri Hartini', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation',
    joblevel: 'D3', jobfam: 'Bisnis', kantor: 'Kantor Pusat Bandung', komiteunit: 'ABD HAFID',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9 },
    { id: 2, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9 },
    { id: 3, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9 },
    { id: 4, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9 },
    { id: 5, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9 },
    { id: 6, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9 },
    { id: 7, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9 },
    { id: 8, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9 },
    { id: 9, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
    joblevel:'D3', jobfam :'Bisnis', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD',
    competency: 3.5, pms: 88, akhlak: 4.9, learningagility: 4.9 },
];

export default function TalentQualificationTable({ competencyValue, pmsValue, akhlakValue, learningagilityValue }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows.map(row => ({
          ...row,
          competency: competencyValue,
          pms: pmsValue,
          akhlak: akhlakValue,
          learningagility: learningagilityValue
        }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
