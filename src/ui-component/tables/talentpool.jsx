import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CreateOutlined } from '@mui/icons-material/';
import ButtonPrimary from '../button/ButtonPrimary';
import UbahStatusTalent from '../modal/ubah-status-talent';

export default function TalentPool({ rows, eventid, updaterows, eventstatus_id }) {
  const [ubahStatusOpen, setUbahStatusOpen] = useState(false);
  const [selectedNippos, setSelectedNippos] = useState(null);

  const handleUbahStatusOpen = (nippos) => {
    setSelectedNippos(nippos);
    setUbahStatusOpen(true);
  };

  const columns = [
    { field: 'id', headerName: 'No', width: 70 },
    { field: 'Nama', headerName: 'Nama', width: 180 },
    { field: 'Nippos', headerName: 'NIPPOS', width: 180 },
    { field: 'Posisi', headerName: 'Posisi', width: 180 },
    { field: 'Job Level', headerName: 'Job Level', width: 180 },
    { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 180 },
    { field: 'Nama Kantor', headerName: 'Kantor', width: 180 },
    { field: 'Kategori Matrix Akhir', headerName: 'Kategori Matrix Akhir', width: 180 },
    { field: 'Status', headerName: 'Status', width: 180 },
    {
      field: 'aksi',
      headerName: 'Aksi',
      width: 320,
      renderCell: (params) => {
        return (
          <>
            <ButtonPrimary
              icon={CreateOutlined}
              LabelName={'Ubah Status'}
              padding={'6px 16px'}
              onClick={() => handleUbahStatusOpen(params.row.Nippos)}
              disabled={eventstatus_id !== 7}
            />
          </>
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
          },
          '& .MuiDataGrid-columnHeaderCheckbox, .MuiDataGrid-cellCheckbox': {
            padding: '0 0px' // Adjust padding for the checkbox cells
          }
        }}
      />

      <UbahStatusTalent
        open={ubahStatusOpen}
        handleClose={() => {
          // confirm()
          setUbahStatusOpen(false);
          setSelectedNippos(null); // Reset selected nippos when closing modal
          updaterows();
        }}
        nippos={selectedNippos} // Pass selected nippos as prop
        eventid={eventid}
      />
    </div>
  );
}
