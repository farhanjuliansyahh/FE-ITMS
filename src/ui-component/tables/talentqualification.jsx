import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

// const minimumCompetencyQualified = 3
// const minimumPmsQualified = 60
// const minimumAkhlakQualified = 3
// const minimumLearningAgilityQualified = 3

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
  

export default function TalentQualificationTable({
  rows,
  minimumCompeten5cyQualified,
  minimumPmsQualified,
  minimumAkhlakQualified,
  minimumLearningAgilityQualified,
  searchNama, // Receive the search term as a prop
  searchNippos,
  searchJobLevel,
  searchKomiteUnit
}) {
  console.log(minimumCompeten5cyQualified,minimumPmsQualified,minimumAkhlakQualified,minimumLearningAgilityQualified);
  const columns = [
      { field: 'id', headerName: 'No', width: 70 },
      { field: 'Nama', headerName: 'Nama', width: 130 },
      { field: 'Nippos', headerName: 'NIPPOS', width: 130 },
      { field: 'Posisi', headerName: 'Posisi', width: 130 },
      { field: 'Job Level', headerName: 'Job Level', width: 130 },
      { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 130 },
      { field: 'Nama Kantor', headerName: 'Kantor', width: 130 },
      { field: 'Komite Unit', headerName: 'Komite Unit', width: 130 },
      {
          field: 'Competency/Psychotest',
          headerName: 'Competency/Psychotest',
          width: 180,
          renderCell: (params) => {
            const { color, backgroundColor } = getColorStyle(params.value, minimumCompeten5cyQualified);
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
          field: 'PMS',
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
          field: 'AKHLAK',
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
          field: 'Learning Agility',
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

    const filteredRows = rows.filter((row) => {
      const namaMatch = !searchNama || (row.Nama && row.Nama.toLowerCase().includes(searchNama.toLowerCase())); // Add null check for row.nama
      const nipposMatch = !searchNippos || (row.Nippos && row.Nippos.toLowerCase().includes(searchNippos.toLowerCase())); // Add null check for row.nippos
      const jobLevelMatch = !searchJobLevel || (row['Job Level'] && row['Job Level'].toLowerCase().includes(searchJobLevel.toLowerCase())); // Add null check for row.nippos
      const komiteUnitMatch = !searchKomiteUnit || (row['Komite Unit'] && row['Komite Unit'].toLowerCase().includes(searchKomiteUnit.toLowerCase())); // Add null check for row.nippos
  
      return (!searchNama || namaMatch) 
      && (!searchNippos || nipposMatch) 
      && (!searchJobLevel || jobLevelMatch) 
      && (!searchKomiteUnit || komiteUnitMatch);
    });

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={filteredRows}
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
