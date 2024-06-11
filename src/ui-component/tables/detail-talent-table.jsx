// src/pages/DetailTalentTable.js
import React from 'react';
import MainTable from './table';

const columnKeys = {
  id: 'No',
  nama: 'Nama',
  nippos: 'NIPPOS',
  posisi: 'Posisi',
  joblevel: 'Job Level',
  jobfam: 'Rumpun Jabatan',
  nama_kantor: 'Kantor',
  nama_event: 'Nama Event',
  kategori_talent: 'Kategori Talent',
  year: 'Tahun'
};

export default function DetailTalentTable({ filteredRows, initialDataLength, caption }) {
  return <MainTable columnKeys={columnKeys} filteredRows={filteredRows} initialDataLength={initialDataLength} caption={caption} />;
}
