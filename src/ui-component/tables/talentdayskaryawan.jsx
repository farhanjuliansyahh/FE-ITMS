import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import InputNilaiTalentDays from '../../ui-component/modal/input-nilai-talent-days';

const getStatusStyle = (status) => {
  let color, backgroundColor;
  switch (status) {
    case 'Belum Diisi':
      color = '#F44336';
      backgroundColor = '#FFEDED';
      break;
    case 'Sudah Diisi':
      color = '#66BB6A';
      backgroundColor = '#F5FFF5';
      break;
    default:
      color = '#000000';
      backgroundColor = 'transparent';
  }
  return { color, backgroundColor };
};

export default function TalentDaysBPJTable({ rows, question, eventid, refetchkaryawan, eventstatus_id, disabled }) {
  const [nilaiOpen, setNilaiOpen] = useState(false);
  const [selectedNippos, setSelectedNippos] = useState('');
  const [nilai, setNilai] = useState([]);

  const getnilai = (eventid, nippos) => {
    return fetch('http://localhost:4000/getnilaidays', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nippos: nippos,
        eventtalentid: eventid
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setNilai(data.nilai.map((item) => item.skor));
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        throw error;
      });
  };

  const handleOpen = (nippos) => {
    setSelectedNippos(nippos);
    setNilaiOpen(true);
    getnilai(eventid, nippos);
  };

  const handleClose = () => {
    setNilaiOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'No', width: 60 },
    { field: 'Nama', headerName: 'Nama', width: 200 },
    { field: 'Nippos', headerName: 'Nippos', width: 130 },
    { field: 'Posisi', headerName: 'Posisi', width: 400 },
    { field: 'Job Level', headerName: 'Job Level', width: 130 },
    { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 130 },
    { field: 'Nama Kantor', headerName: 'Kantor', width: 130 },
    { field: 'Komite Unit', headerName: 'Komite Unit', width: 130 },
    {
      field: 'Status',
      headerName: 'Status',
      width: 130,
      renderCell: (params) => {
        const { color, backgroundColor } = getStatusStyle(params.value);
        return (
          <div>
            <span
              style={{
                color,
                backgroundColor,
                padding: '4px 8px',
                borderRadius: '24px'
              }}
            >
              {params.value}
            </span>
          </div>
        );
      }
    },
    {
      field: 'aksi',
      headerName: 'Aksi',
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1C2D5A',
              color: '#FFFFFF',
              borderRadius: '12px',
              padding: '6px 16px'
            }}
            endIcon={<AssignmentOutlinedIcon />}
            onClick={() => handleOpen(params.row.Nippos)}
            disabled = {disabled}
          >
            Nilai
          </Button>
        );
      }
    }
  ];

  return (
    <div style={{ height: 400, width: '100%', overflow: 'hidden' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        pageSizeOptions={[5, 10]}
        sx={{
          borderRadius: '12px', // Apply border radius to the DataGrid itself
          '& .MuiDataGrid-main': {
            borderRadius: '12px' // Apply border radius to the main container
          },
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#F5F5F5', // Apply background color to each header cell
            padding: '0 24px' // Apply horizontal padding to each header cell
          },
          '& .MuiDataGrid-cell': {
            padding: '0 24px' // Apply horizontal padding to each header cell
          }
        }}
      />

      <InputNilaiTalentDays
        open={nilaiOpen}
        handleClose={() => setNilaiOpen(false)}
        questionList={question}
        nippos={selectedNippos}
        eventid={eventid}
        refetchkaryawan={refetchkaryawan}
        nilai={nilai}
        eventstatus_id={eventstatus_id}
      />
    </div>
  );
}
