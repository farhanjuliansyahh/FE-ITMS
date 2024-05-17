import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CreateOutlined } from '@mui/icons-material/';
import ButtonPrimary from '../button/ButtonPrimary';
import UbahStatusTalent from '../modal/ubah-status-talent';

export default function TalentPool({ rows }) {
  const [ubahStatusOpen, setUbahStatusOpen] = useState(false);
  const [selectedNippos, setSelectedNippos] = useState(null); 

  useEffect(() => {
    console.log("Nippos yang ingin diubah status: ", selectedNippos);
  }, [selectedNippos]); // Run this effect whenever selectedNippos changes

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
    { field: 'aksi', headerName: 'Aksi', width: 320, 
    renderCell: (params) => {
      return (
        <>
          <ButtonPrimary
              icon={CreateOutlined}
              LabelName={'Ubah Status'}
              padding={'6px 16px'}
              onClick={() => handleUbahStatusOpen(params.row.Nippos)}
            />
        </>
      );
    },
    },
  ];
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />

      <UbahStatusTalent
        open={ubahStatusOpen}
        handleClose={() => {
          // confirm()
          setUbahStatusOpen(false);
          setSelectedNippos(null); // Reset selected nippos when closing modal
        }}
        nippos={selectedNippos} // Pass selected nippos as prop
      />
    </div>
  );
}