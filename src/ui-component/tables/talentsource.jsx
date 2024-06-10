// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { useEffect, useState } from 'react';
// import { AddCircleOutline } from '@mui/icons-material';

// import ButtonPrimary from '../button/ButtonPrimary';
// import TambahKomiteUnit from '../modal/tambah-komite-unit';
// import KonfirmasiTambahKomiteUnit from '../modal/konfirmasi-tambah-komite-unit';

// // TalentSourceTable component
// const TalentSourceTable = ({eventid, 
//   rows,
//   checkboxSelection,
//   selectedRows, 
//   onSelectedRowsChange,
//   getkandidatfalse,
//   getkandidattrue,
//   showButton
// }) => {

//   const [openFirstModal, setOpenFirstModal] = useState(false);
//   const [openSecondModal, setOpenSecondModal] = useState(false);
//   const [selectedNippos, setSelectedNippos] = useState('')
//   const [selectedKU, setSelectedKU]         = useState('')

//   const activeEvent = eventid

//   const updatekomiteunit = (eventid, nippos, komite_unit) => {
//     return fetch(`http://localhost:4000/updatekomiteunit?eventtalentid=${eventid}`, {
//         method: 'POST', // Specify the HTTP method (POST, GET, etc.)
//         headers: {
//             'Content-Type': 'application/json', // Specify the content type
//         },
//         body: JSON.stringify({
//             // Include any data you want to send in the request body
//             nippos: nippos,
//             komite_unit: komite_unit
//         }) // Convert the bodyData object to a JSON string
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             return data; // Return the parsed JSON data
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//             throw error; // Rethrow the error to handle it elsewhere
//         });
// };

// const updatekomiterole = (eventid, nippos) => {
//   return fetch(`http://localhost:4000/assignkomiteunibybutton`, {
//         method: 'POST', // Specify the HTTP method (POST, GET, etc.)
//         headers: {
//           'Content-Type': 'application/json', // Specify the content type
//         },
//         body: JSON.stringify({
//             // Include any data you want to send in the request body
//             eventtalentid: eventid,
//             nippos: nippos
//         }) // Convert the bodyData object to a JSON string
//       }) 
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         return data; // Return the parsed JSON data
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         throw error; // Rethrow the error to handle it elsewhere
//       });
//   };

//   const handleOpenFirstModal = (nippos) => {
//       setSelectedNippos(nippos); 
//       setOpenFirstModal(true);
//   };

//   const handleCloseFirstModal = () => {
//       setOpenFirstModal(false); 
//   };

//   const handleOpenSecondModal = (nippos) => {
//       setOpenSecondModal(true);
//       setSelectedKU(nippos)
//   };

//   const handleCloseSecondModal = () => {
//       setOpenSecondModal(false);
//   };



//   const handleConfirm = () => {
//     updatekomiteunit(activeEvent, selectedNippos, selectedKU)
//       .then(() => {
//         // After updating komite unit, call updatekomiterole
//         return updatekomiterole(activeEvent, selectedKU);
//       })
//       .then(() => {
//         // Refetch data to refresh the table
//         return Promise.all([getkandidatfalse(), getkandidattrue()]);
//       })
//       .then(() => {
//         // Close the modal after successfully refreshing the data
//         setOpenSecondModal(false);
//       })
//       .catch(error => {
//         console.error('Error updating data:', error);
//         // Handle error if needed
//       });
//   };

//   const columns = [
//     { field: 'id', headerName: 'No', minWidth: 60 },
//     { field: 'Nama', headerName: 'Nama', minWidth: 200 },
//     { field: 'Nippos', headerName: 'Nippos', minWidth: 130 },
//     { field: 'Posisi', headerName: 'Posisi', minWidth: 300 },
//     { field: 'Job Family', headerName: 'Job Family', minWidth: 130 },
//     { field: 'Job Level', headerName: 'Job Level', minWidth: 130 },
//     { field: 'Nama Kantor', headerName: 'Kantor', minWidth: 200 },
//     { field: 'Komite Unit', headerName: 'Komite Unit', minWidth: 230, renderCell: (params) => {
//       if (params.value === null && showButton) {
//         return (
//           <ButtonPrimary
//             icon={AddCircleOutline}
//             LabelName={'Tambah Komite Unit'}
//             padding={'6px 16px'}
//             onClick={() => handleOpenFirstModal(params.row.Nippos)}
//           />
//         );
//       }
//       return params.value;
//       }
//     }
//   ];

//   const handleSelectionChange = (newSelection) => {
//     onSelectedRowsChange(newSelection); // Pass the selectionModel directly
//   };

//   return (
//       <div style={{ height: 400, width: '100%', overflow: 'hidden' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           checkboxSelection={checkboxSelection}
//           onRowSelectionModelChange={handleSelectionChange} // Handle checkbox selection
//           rowSelectionModel={selectedRows}
//           sx={{
//             borderRadius: '12px', // Apply border radius to the DataGrid itself
//             '& .MuiDataGrid-main': {
//               borderRadius: '12px', // Apply border radius to the main container
//             },
//             '& .MuiDataGrid-columnHeader': {
//               backgroundColor: '#F5F5F5', // Apply background color to each header cell
//               padding: '0 24px', // Apply horizontal padding to each header cell
//             },
//             '& .MuiDataGrid-cell': {
//               padding: '0 24px', // Apply horizontal padding to each header cell
//             },
//             '& .MuiDataGrid-columnHeaderCheckbox, .MuiDataGrid-cellCheckbox': {
//               padding: '0 0px', // Adjust padding for the checkbox cells
//             },
//           }}
//         />

//         <TambahKomiteUnit 
//             open={openFirstModal} 
//             onClose={handleCloseFirstModal}
//             onOpenSecondModal={handleOpenSecondModal} />

//         <KonfirmasiTambahKomiteUnit 
//             open={openSecondModal} 
//             onClose={handleCloseSecondModal} 
//             onConfirm={handleConfirm} />

//       </div>
//   );
// };

// export default TalentSourceTable;


// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { useEffect, useState } from 'react';
// import { AddCircleOutline } from '@mui/icons-material';

// import ButtonPrimary from '../button/ButtonPrimary';
// import TambahKomiteUnit from '../modal/tambah-komite-unit';
// import KonfirmasiTambahKomiteUnit from '../modal/konfirmasi-tambah-komite-unit';

// // TalentSourceTable component
// const TalentSourceTable = ({eventid, 
//   rows,
//   checkboxSelection,
//   selectedRows, 
//   onSelectedRowsChange,
//   getkandidatfalse,
//   getkandidattrue,
//   showButton
// }) => {

//   const [openFirstModal, setOpenFirstModal] = useState(false);
//   const [openSecondModal, setOpenSecondModal] = useState(false);
//   const [selectedNippos, setSelectedNippos] = useState('')
//   const [selectedKU, setSelectedKU]         = useState('')

//   const activeEvent = eventid

//   const updatekomiteunit = (eventid, nippos, komite_unit) => {
//     return fetch(`http://localhost:4000/updatekomiteunit?eventtalentid=${eventid}`, {
//         method: 'POST', // Specify the HTTP method (POST, GET, etc.)
//         headers: {
//             'Content-Type': 'application/json', // Specify the content type
//         },
//         body: JSON.stringify({
//             // Include any data you want to send in the request body
//             nippos: nippos,
//             komite_unit: komite_unit
//         }) // Convert the bodyData object to a JSON string
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             return data; // Return the parsed JSON data
//         })
//         .catch(error => {
//             console.error('Error fetching data:', error);
//             throw error; // Rethrow the error to handle it elsewhere
//         });
// };

// const updatekomiterole = (eventid, nippos) => {
//   return fetch(`http://localhost:4000/assignkomiteunibybutton`, {
//         method: 'POST', // Specify the HTTP method (POST, GET, etc.)
//         headers: {
//           'Content-Type': 'application/json', // Specify the content type
//         },
//         body: JSON.stringify({
//             // Include any data you want to send in the request body
//             eventtalentid: eventid,
//             nippos: nippos
//         }) // Convert the bodyData object to a JSON string
//       }) 
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         return data; // Return the parsed JSON data
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         throw error; // Rethrow the error to handle it elsewhere
//       });
//   };

//   const handleOpenFirstModal = (nippos) => {
//       setSelectedNippos(nippos); 
//       setOpenFirstModal(true);
//   };

//   const handleCloseFirstModal = () => {
//       setOpenFirstModal(false); 
//   };

//   const handleOpenSecondModal = (nippos) => {
//       setOpenSecondModal(true);
//       setSelectedKU(nippos)
//   };

//   const handleCloseSecondModal = () => {
//       setOpenSecondModal(false);
//   };



//   const handleConfirm = () => {
//     updatekomiteunit(activeEvent, selectedNippos, selectedKU)
//       .then(() => {
//         // After updating komite unit, call updatekomiterole
//         return updatekomiterole(activeEvent, selectedKU);
//       })
//       .then(() => {
//         // Refetch data to refresh the table
//         return Promise.all([getkandidatfalse(), getkandidattrue()]);
//       })
//       .then(() => {
//         // Close the modal after successfully refreshing the data
//         setOpenSecondModal(false);
//       })
//       .catch(error => {
//         console.error('Error updating data:', error);
//         // Handle error if needed
//       });
//   };

//   const columns = [
//     { field: 'id', headerName: 'No', minWidth: 60 },
//     { field: 'Nama', headerName: 'Nama', minWidth: 200 },
//     { field: 'Nippos', headerName: 'Nippos', minWidth: 130 },
//     { field: 'Posisi', headerName: 'Posisi', minWidth: 300 },
//     { field: 'Job Family', headerName: 'Job Family', minWidth: 130 },
//     { field: 'Job Level', headerName: 'Job Level', minWidth: 130 },
//     { field: 'Nama Kantor', headerName: 'Kantor', minWidth: 200 },
//     { field: 'Komite Unit', headerName: 'Komite Unit', minWidth: 230, renderCell: (params) => {
//       if (params.value === null && showButton) {
//         return (
//           <ButtonPrimary
//             icon={AddCircleOutline}
//             LabelName={'Tambah Komite Unit'}
//             padding={'6px 16px'}
//             onClick={() => handleOpenFirstModal(params.row.Nippos)}
//           />
//         );
//       }
//       return params.value;
//       }
//     }
//   ];

//   const handleSelectionChange = (newSelection) => {
//     onSelectedRowsChange(newSelection); // Pass the selectionModel directly
//   };

//   return (
//       <div style={{ height: 400, width: '100%', overflow: 'hidden' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           checkboxSelection={checkboxSelection}
//           onRowSelectionModelChange={handleSelectionChange} // Handle checkbox selection
//           rowSelectionModel={selectedRows}
//           sx={{
//             borderRadius: '12px', // Apply border radius to the DataGrid itself
//             '& .MuiDataGrid-main': {
//               borderRadius: '12px', // Apply border radius to the main container
//             },
//             '& .MuiDataGrid-columnHeader': {
//               backgroundColor: '#F5F5F5', // Apply background color to each header cell
//               padding: '0 24px', // Apply horizontal padding to each header cell
//             },
//             '& .MuiDataGrid-cell': {
//               padding: '0 24px', // Apply horizontal padding to each header cell
//             },
//             '& .MuiDataGrid-columnHeaderCheckbox, .MuiDataGrid-cellCheckbox': {
//               padding: '0 0px', // Adjust padding for the checkbox cells
//             },
//           }}
//         />

//         <TambahKomiteUnit 
//             open={openFirstModal} 
//             onClose={handleCloseFirstModal}
//             onOpenSecondModal={handleOpenSecondModal} />

//         <KonfirmasiTambahKomiteUnit 
//             open={openSecondModal} 
//             onClose={handleCloseSecondModal} 
//             onConfirm={handleConfirm} />

//       </div>
//   );
// };

// export default TalentSourceTable;

import * as React from 'react';
import { useState } from 'react';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import FilterButton from '../../ui-component/button/FilterButton';
import ButtonPrimary from '../button/ButtonPrimary';
import TambahKomiteUnit from '../modal/tambah-komite-unit';
import KonfirmasiTambahKomiteUnit from '../modal/konfirmasi-tambah-komite-unit';
import.meta.env.VITE_API_BASE_URL

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F5F5F5',
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    height: '60px',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    minHeight: 20,
    verticalAlign: 'center',
    height: '60px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const ButtonContainer = styled('div')({
  whiteSpace: 'nowrap',
});

const TalentSourceTable = ({ eventid, rows, checkboxSelection, selectedRows, onSelectedRowsChange, getkandidatfalse, getkandidattrue, showButton, caption }) => {
  const [openFirstModal, setOpenFirstModal] = useState(false);
  const [openSecondModal, setOpenSecondModal] = useState(false);
  const [selectedNippos, setSelectedNippos] = useState('');
  const [selectedKU, setSelectedKU] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const activeEvent = eventid;
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const url = import.meta.env.VITE_API_BASE_URL

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1);
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    const newSelection = isChecked ? rows.map(row => row.id) : [];
    onSelectedRowsChange(newSelection);
  };

  const handleCheckboxChange = (event, rowId) => {
    const isChecked = event.target.checked;
    const newSelection = isChecked ? [...selectedRows, rowId] : selectedRows.filter(id => id !== rowId);
    onSelectedRowsChange(newSelection);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, rows.length);
  const [selectedOption, setSelectedOption] = useState(false)

  const calculateColumnWidth = (data, accessor, headerText) => {
    const maxLength = Math.max(...data.map((item) => (item[accessor] ? item[accessor].toString().length : 0)), headerText.length);
    return maxLength * 11;
  };

  const updatekomiteunit = (eventid, nippos, komite_unit, selectedOption) => {
    return fetch(url + `updatekomiteunit?eventtalentid=${eventid}`, {
      method: 'POST', // Specify the HTTP method (POST, GET, etc.)
      headers: {
        'Content-Type': 'application/json', // Specify the content type
      },
      body: JSON.stringify({
        // Include any data you want to send in the request body
        nippos: nippos,
        komite_unit: komite_unit,
        permanent: selectedOption
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
    return fetch(url + `assignkomiteunibybutton`, {
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
    setSelectedKU(nippos);
  };

  const handleCloseSecondModal = () => {
    setOpenSecondModal(false);
    setOpenSecondModal(false);
  };

  const handleConfirm = () => {
    setSelectedOption(selectedOption)
    updatekomiteunit(activeEvent, selectedNippos, selectedKU, selectedOption)
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

  return (
    <div>
      {
        rows.length > 0 ? (
          <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    {checkboxSelection && (
                      <StyledTableCell sx={{ width: 60 }}>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </StyledTableCell>
                    )}
                    <StyledTableCell >No</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 150 }}>Nama</StyledTableCell>
                    <StyledTableCell >Nippos</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 250 }}>Posisi</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'jobfam', 'Job Family') }}>Job Family</StyledTableCell>
                    <StyledTableCell >Job Level</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'Kantor', 'Nama Kantor') }}>Kantor</StyledTableCell>
                    <StyledTableCell >Komite Unit</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(startIndex, endIndex).map((row, index) => (
                    <TableRow key={row.id}>
                      {checkboxSelection && (
                        <StyledTableCell>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(row.id)}
                            onChange={(event) => handleCheckboxChange(event, row.id)}
                          />
                        </StyledTableCell>
                      )}
                      <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{startIndex + index + 1}</StyledTableCell>
                      <StyledTableCell>{row.Nama}</StyledTableCell>
                      <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{row.Nippos}</StyledTableCell>
                      <StyledTableCell>{row.Posisi}</StyledTableCell>
                      <StyledTableCell>{row['Job Family']}</StyledTableCell>
                      <StyledTableCell sx={{ textAlign: 'center' }}>{row['Job Level']}</StyledTableCell>
                      <StyledTableCell>{row['Nama Kantor']}</StyledTableCell>
                      <StyledTableCell>
                        <ButtonContainer >
                          {row['Komite Unit'] === null && showButton ? (
                            <ButtonPrimary
                              icon={AddCircleOutline}
                              LabelName={'Tambah Komite Unit'}
                              padding={'6px 16px'}
                              onClick={() => handleOpenFirstModal(row.Nippos)}
                            />
                          ) : (
                            row['Komite Unit']
                          )}
                        </ButtonContainer>
                      </StyledTableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : (
          <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px', height: '400px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <StyledTableRow>
                    {checkboxSelection && (
                      <StyledTableCell sx={{ width: 60 }}>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </StyledTableCell>
                    )}
                    <StyledTableCell >No</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 150 }}>Nama</StyledTableCell>
                    <StyledTableCell >Nippos</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 250 }}>Posisi</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'jobfam', 'Job Family') }}>Job Family</StyledTableCell>
                    <StyledTableCell >Job Level</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'Kantor', 'Nama Kantor') }}>Kantor</StyledTableCell>
                    <StyledTableCell >Komite Unit</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
              {caption}
            </Typography>
          </div>
        )
      }

      {rows.length > 0 && (
        <Stack spacing={2} direction="row" marginTop={2}>
          <Pagination
            count={Math.ceil(rows.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
          />
          <div style={{ flex: '1' }}></div>
          <FilterButton itemsPerPage={itemsPerPage} setItemsPerPage={handleItemsPerPageChange} />
        </Stack>
      )}



      <TambahKomiteUnit
        open={openFirstModal}
        onClose={handleCloseFirstModal}
        onOpenSecondModal={handleOpenSecondModal}
      />
      <KonfirmasiTambahKomiteUnit
        open={openSecondModal}
        onClose={handleCloseSecondModal}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default TalentSourceTable;
