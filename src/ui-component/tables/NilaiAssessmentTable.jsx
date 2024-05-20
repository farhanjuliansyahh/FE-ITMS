// src/pages/NilaiAssessmentTable.js
import React from 'react';
import MainTable from './table';

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
  'performance': 'Performance'
};

export default function NilaiAssessmentTable({ filteredRows }) {
  return <MainTable columnKeys={columnKeys} filteredRows={filteredRows} minWidth={3000}/>;
}
