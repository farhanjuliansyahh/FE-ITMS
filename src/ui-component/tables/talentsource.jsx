import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { AddCircleOutline } from '@mui/icons-material';

import ButtonPrimary from '../button/ButtonPrimary';
import TambahKomiteUnit from '../modal/tambah-komite-unit';
import KonfirmasiTambahKomiteUnit from '../modal/konfirmasi-tambah-komite-unit';

// TalentSourceTable component
const TalentSourceTable = ({eventid, 
  rows,
  checkboxSelection,
  selectedRows, 
  onSelectedRowsChange,
  getkandidatfalse,
  getkandidattrue,
  showButton
}) => {

  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const [selectedNippos, setSelectedNippos] = useState('')
  const [selectedKU, setSelectedKU]         = useState('')

  const activeEvent = eventid

  const updatekomiteunit = (eventid, nippos, komite_unit) => {
    return fetch(`http://localhost:4000/updatekomiteunit?eventtalentid=${eventid}`, {
        method: 'POST', // Specify the HTTP method (POST, GET, etc.)
        headers: {
            'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({
            // Include any data you want to send in the request body
            nippos: nippos,
            komite_unit: komite_unit
        }) // Convert the bodyData object to a JSON string
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data; // Return the parsed JSON data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; // Rethrow the error to handle it elsewhere
        });
};

const updatekomiterole = (eventid, nippos) => {
  return fetch(`http://localhost:4000/assignkomiteunibybutton`, {
        method: 'POST', // Specify the HTTP method (POST, GET, etc.)
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({
            // Include any data you want to send in the request body
            eventtalentid: eventid,
            nippos: nippos
        }) // Convert the bodyData object to a JSON string
      }) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        return data; // Return the parsed JSON data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error to handle it elsewhere
      });
  };

  const handleOpenFirstModal = (nippos) => {
      setSelectedNippos(nippos); 
      setOpenFirstModal(true);
  };

  const handleCloseFirstModal = () => {
      setOpenFirstModal(false); 
  };

  const handleOpenSecondModal = (nippos) => {
      setOpenSecondModal(true);
      setSelectedKU(nippos)
  };

  const handleCloseSecondModal = () => {
      setOpenSecondModal(false);
  };



  const handleConfirm = () => {
    updatekomiteunit(activeEvent, selectedNippos, selectedKU)
      .then(() => {
        // After updating komite unit, call updatekomiterole
        return updatekomiterole(activeEvent, selectedKU);
      })
      .then(() => {
        // Refetch data to refresh the table
        return Promise.all([getkandidatfalse(), getkandidattrue()]);
      })
      .then(() => {
        // Close the modal after successfully refreshing the data
        setOpenSecondModal(false);
      })
      .catch(error => {
        console.error('Error updating data:', error);
        // Handle error if needed
      });
  };

  const columns = [
    { field: 'id', headerName: 'No', minWidth: 60 },
    { field: 'Nama', headerName: 'Nama', minWidth: 200 },
    { field: 'Nippos', headerName: 'Nippos', minWidth: 130 },
    { field: 'Posisi', headerName: 'Posisi', minWidth: 300 },
    { field: 'Job Family', headerName: 'Job Family', minWidth: 130 },
    { field: 'Job Level', headerName: 'Job Level', minWidth: 130 },
    { field: 'Nama Kantor', headerName: 'Kantor', minWidth: 200 },
    { field: 'Komite Unit', headerName: 'Komite Unit', minWidth: 230, renderCell: (params) => {
      if (params.value === null && showButton) {
        return (
          <ButtonPrimary
            icon={AddCircleOutline}
            LabelName={'Tambah Komite Unit'}
            padding={'6px 16px'}
            onClick={() => handleOpenFirstModal(params.row.Nippos)}
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
      <div style={{ height: 400, width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection={checkboxSelection}
          onRowSelectionModelChange={handleSelectionChange} // Handle checkbox selection
          rowSelectionModel={selectedRows}
          sx={{
            borderRadius: '12px', // Apply border radius to the DataGrid itself
            '& .MuiDataGrid-main': {
              borderRadius: '12px', // Apply border radius to the main container
            },
            '& .MuiDataGrid-columnHeader': {
              backgroundColor: '#F5F5F5', // Apply background color to each header cell
              padding: '0 24px', // Apply horizontal padding to each header cell
            },
            '& .MuiDataGrid-cell': {
              padding: '0 24px', // Apply horizontal padding to each header cell
            },
            '& .MuiDataGrid-columnHeaderCheckbox, .MuiDataGrid-cellCheckbox': {
              padding: '0 0px', // Adjust padding for the checkbox cells
            },
          }}
        />

        <TambahKomiteUnit 
            open={openFirstModal} 
            onClose={handleCloseFirstModal}
            onOpenSecondModal={handleOpenSecondModal} />

        <KonfirmasiTambahKomiteUnit 
            open={openSecondModal} 
            onClose={handleCloseSecondModal} 
            onConfirm={handleConfirm} />

      </div>
  );
};

export default TalentSourceTable;
