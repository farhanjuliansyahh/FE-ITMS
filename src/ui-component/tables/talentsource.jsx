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
  searchNama, // Receive the search term as a prop
  searchNippos,
  searchJobLevel,
  searchKomiteUnit
}) => {
  // Filter the rows based on selected filters and search term
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

  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const [selectedNippos, setSelectedNippos] = useState('')
  const [selectedKU, setSelectedKU]         = useState('')
  const [refreshTable, setRefreshTable] = useState(false); // State to trigger table refresh

  useEffect(() => {
    if (refreshTable) {
        // Fetch new data or update existing data
        setRefreshTable(false); // Reset the flag after refreshing
    }
}, [refreshTable]);

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

const updatekomiterole = (nippos) => {
  return fetch(`http://localhost:4000/assignkomiteunibybutton`, {
        method: 'POST', // Specify the HTTP method (POST, GET, etc.)
        headers: {
          'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify({
            // Include any data you want to send in the request body
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
      console.log("selected ku", selectedKU);
  };



  const handleConfirm = () => {
    console.log("Confirm button clicked");
    updatekomiteunit(activeEvent,selectedNippos,selectedKU)
        .then(() => {
            // Trigger the callback function passed from the parent component to refresh the table data
            updatekomiterole(selectedKU)
            setRefreshTable(true);
            setOpenSecondModal(false);
        })
        .catch(error => {
            console.error('Error updating data:', error);
            // Handle error if needed
        });
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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
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
            onConfirm={handleConfirm} />

      </div>
  );
};

export default TalentSourceTable;
