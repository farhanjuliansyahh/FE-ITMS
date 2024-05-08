import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { AddCircleOutline } from '@mui/icons-material';

import ButtonPrimary from '../button/ButtonPrimary';
import TambahKomiteUnit from '../modal/tambah-komite-unit';
import KonfirmasiTambahKomiteUnit from '../modal/konfirmasi-tambah-komite-unit';

// TalentSourceTable component
const TalentSourceTable = ({rows,checkboxSelection,selectedRows, onSelectedRowsChange}) => {
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);

  const handleOpenFirstModal = () => {
      setOpenFirstModal(true); 
  };

  const handleCloseFirstModal = () => {
      setOpenFirstModal(false); 
  };

  const handleOpenSecondModal = () => {
      setOpenSecondModal(true);
  };

  const handleCloseSecondModal = () => {
      setOpenSecondModal(false);
  };

  const columns = [
    { field: 'id', headerName: 'No', minWidth: 70 },
    { field: 'Nama', headerName: 'Nama', minWidth: 130 },
    { field: 'Nippos', headerName: 'Nippos', minWidth: 130 },
    { field: 'Posisi', headerName: 'Posisi', minWidth: 130 },
    { field: 'Job Family', headerName: 'Job Family', minWidth: 130 },
    { field: 'Job Level', headerName: 'Job Level', minWidth: 130 },
    { field: 'Nama Kantor', headerName: 'Kantor', minWidth: 130 },
    { field: 'Komite Unit', headerName: 'Komite Unit', minWidth: 230, renderCell: (params) => {
      if (params.value === null) {
        return (
          <ButtonPrimary
            icon={AddCircleOutline}
            LabelName={'Tambah Komite Unit'}
            padding={'6px 16px'}
            onClick={handleOpenFirstModal}
          />
        );
      }
      return params.value;
      }
    }
  ];

  const handleSelectionChange = (newSelection) => {
    onSelectedRowsChange(newSelection); // Pass the selectionModel directly
  };

  return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection={checkboxSelection}
          onRowSelectionModelChange={handleSelectionChange} // Handle checkbox selection
          rowSelectionModel={selectedRows}
        />

        <TambahKomiteUnit 
            open={openFirstModal} 
            onClose={handleCloseFirstModal} 
            onOpenSecondModal={handleOpenSecondModal} />

        <KonfirmasiTambahKomiteUnit 
            open={openSecondModal} 
            onClose={handleCloseSecondModal} 
            onConfirm={handleCloseSecondModal} />

      </div>
  );
};

export default TalentSourceTable;
