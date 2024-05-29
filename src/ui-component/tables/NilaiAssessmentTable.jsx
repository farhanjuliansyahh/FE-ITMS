// src/pages/NilaiAssessmentTable.js
import React from 'react';
import MainTable from './table';

const currentYear = new Date().getFullYear();

const columnKeys = {
  // field : nama kolom
  'id': 'No',
  'nama': 'Nama',
  'nippos': 'NIPPOS',
  'posisi': 'Posisi',
  'joblevel': 'Job Level',
  'rumpunjabatan': 'Rumpun Jabatan',
  'kantor': 'Kantor',
  'komiteunit': 'Komite Unit',
  'kompbumn': 'Kompetensi BUMN',
  'komplead': 'Kompetensi Leadership',
  'kompteknis': 'Kompetensi Teknis',
  'potensi': 'Potensi',
  'akhlak': 'AKHLAK',
  'learningagility': 'Learning Agility',
  'PMS2yearsago': `PMS ${currentYear - 2}`,
  'PMS1yearago': `PMS ${currentYear - 1}`,
  'PMSthisyear': `PMS ${currentYear}`
};

export default function NilaiAssessmentTable({ filteredRows }) {
  return <MainTable columnKeys={columnKeys} filteredRows={filteredRows} minWidth={3000}/>;
}
