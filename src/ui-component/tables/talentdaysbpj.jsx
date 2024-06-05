// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Button from '@mui/material/Button';
// import ButtonErrorOutlined from '../../ui-component/button/ButtonErrorOutlined'
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
// import HapusDataBPJ from '../../ui-component/modal/hapus-data-bpj';

// export default function TalentDaysBPJTable({ 
//     eventid, 
//     rows,
//     searchNama, // Receive the search term as a prop
//     searchNippos,
//     confirm,
//     disabled
//  }) {
//   const filteredRows = rows.filter((row) => {
//     const namaMatch = !searchNama || (row.nama && row.nama.toLowerCase().includes(searchNama.toLowerCase())); // Add null check for row.nama
//     const nipposMatch = !searchNippos || (row.nippos && row.nippos.toLowerCase().includes(searchNippos.toLowerCase())); // Add null check for row.nippos

//     return (!searchNama || namaMatch) 
//     && (!searchNippos || nipposMatch);
//   });

//   const resetRowIndex = (filteredRows) => {
//     return filteredRows.map((row, index) => ({
//       ...row,
//       id: index + 1, // Adding 1 to start the index from 1 instead of 0
//     }));
//   };

//   const resetRows = resetRowIndex(filteredRows);

//   const [HapusBPJOpen, setHapusBPJOpen] = useState(false);
//   const [selectedNippos, setSelectedNippos] = useState(null); // State to store selected nippos

//   useEffect(() => {
//   }, [selectedNippos]); // Run this effect whenever selectedNippos changes

//   const handleHapusBPJOpen = (nippos) => {
//     setSelectedNippos(nippos);
//     setHapusBPJOpen(true);
//   };

//   const handleHapusBPJClose = () => {
//     setHapusBPJOpen(false);
//   };

//   const columns = [
//     { field: 'id', headerName: 'No', width: 90 },
//     { field: 'nama', headerName: 'Nama', width: 400 },
//     { field: 'nippos', headerName: 'Nippos', width: 150 },
//     { field: 'Posisi', headerName: 'Posisi', width: 600 },
//     {
//       field: 'aksi',
//       headerName: 'Aksi',
//       width: 160,
//       renderCell: (params) => {
//         return (
//           <ButtonErrorOutlined 
//               icon={DeleteOutlineOutlinedIcon}
//               LabelName={'Hapus'}
//               padding={'6px 16px'}
//               onClick={() => handleHapusBPJOpen(params.row.nippos)}
//               disabled={disabled}
//               />
//         );
//       },
//     },
//   ];

//   return (
//     <div style={{ height: 400, width: '100%', overflow: 'hidden' }}>
//       <DataGrid
//         rows={resetRows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//         sx={{
//           borderRadius: '12px', // Apply border radius to the DataGrid itself
//           '& .MuiDataGrid-main': {
//             borderRadius: '12px', // Apply border radius to the main container
//           },
//           '& .MuiDataGrid-columnHeader': {
//             backgroundColor: '#F5F5F5', // Apply background color to each header cell
//             padding: '0 24px', // Apply horizontal padding to each header cell
//           },
//           '& .MuiDataGrid-cell': {
//             padding: '0 24px', // Apply horizontal padding to each header cell
//           },
//         }}
//       />
//       <HapusDataBPJ
//         open={HapusBPJOpen}
//         handleClose={() => {
//           confirm()
//           setHapusBPJOpen(false);
//           setSelectedNippos(null); // Reset selected nippos when closing modal
//         }}
//         nippos={selectedNippos} // Pass selected nippos as prop
//       />
//     </div>
//   );
// }

import * as React from 'react';
import { useEffect, useState } from 'react';
import ButtonErrorOutlined from '../../ui-component/button/ButtonErrorOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import HapusDataBPJ from '../../ui-component/modal/hapus-data-bpj';
import {Pagination, Stack, TableCell } from '@mui/material';
import FilterButton from '../../ui-component/button/FilterButton';

export default function TalentDaysBPJTable({ 
    eventid, 
    rows,
    searchNama, // Receive the search term as a prop
    searchNippos,
    confirm,
    disabled
 }) {
  const filteredRows = rows.filter((row) => {
    const namaMatch = !searchNama || (row.nama && row.nama.toLowerCase().includes(searchNama.toLowerCase())); // Add null check for row.nama
    const nipposMatch = !searchNippos || (row.nippos && row.nippos.toLowerCase().includes(searchNippos.toLowerCase())); // Add null check for row.nippos

    return (!searchNama || namaMatch) 
    && (!searchNippos || nipposMatch);
  });

  const resetRowIndex = (filteredRows) => {
    return filteredRows.map((row, index) => ({
      ...row,
      id: index + 1, // Adding 1 to start the index from 1 instead of 0
    }));
  };

  const resetRows = resetRowIndex(filteredRows);

  const [HapusBPJOpen, setHapusBPJOpen] = useState(false);
  const [selectedNippos, setSelectedNippos] = useState(null); // State to store selected nippos

  useEffect(() => {
  }, [selectedNippos]); // Run this effect whenever selectedNippos changes

  const handleHapusBPJOpen = (nippos) => {
    setSelectedNippos(nippos);
    setHapusBPJOpen(true);
  };

  const handleHapusBPJClose = () => {
    setHapusBPJOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'No', width: 90 },
    { field: 'nama', headerName: 'Nama', width: 400 },
    { field: 'nippos', headerName: 'Nippos', width: 150 },
    { field: 'Posisi', headerName: 'Posisi', width: 600 },
    {
      field: 'aksi',
      headerName: 'Aksi',
      width: 160,
      renderCell: (params) => {
        return (
          <ButtonErrorOutlined 
              icon={DeleteOutlineOutlinedIcon}
              LabelName={'Hapus'}
              padding={'6px 16px'}
              onClick={() => handleHapusBPJOpen(params.row.nippos)}
              disabled={disabled}
              />
        );
      },
    },
  ];
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  
  const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
  const handleItemsPerPageChange = (newItemsPerPage) => {
      setItemsPerPage(newItemsPerPage);
      setPage(1);
    };
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return (
    <div style={{ height: 400, width: '100%', overflow: 'hidden' }}>
      <div>
      <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '12px', overflow: 'hidden' }}>
        <thead style={{ backgroundColor: '#F5F5F5' }}>
          <tr>
            <th style={{ padding: '0 24px' }}>No</th>
            <th style={{ padding: '0 24px' }}>Nama</th>
            <th style={{ padding: '0 24px' }}>Nippos</th>
            <th style={{ padding: '0 24px' }}>Posisi</th>
            <th style={{ padding: '0 24px' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {resetRows.slice(startIndex, endIndex).map((row) => (
            <tr key={row.id}>
              <td style={{ padding: '0 24px' }}>{row.id}</td>
              <td style={{ padding: '0 24px' }}>{row.nama}</td>
              <td style={{ padding: '0 24px' }}>{row.nippos}</td>
              <td style={{ padding: '0 24px' }}>{row.Posisi}</td>
              <td style={{ padding: '0 24px' }}>
                <ButtonErrorOutlined 
                  icon={DeleteOutlineOutlinedIcon}
                  LabelName={'Hapus'}
                  padding={'6px 16px'}
                  onClick={() => handleHapusBPJOpen(row.nippos)}
                  disabled={disabled}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <Stack spacing={2} direction="row" marginTop={2}>
        <Pagination
          count={Math.ceil(rows.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary" />
        <div style={{ flex: '1' }}> </div>
        <FilterButton itemsPerPage={itemsPerPage} setItemsPerPage={handleItemsPerPageChange} />
      </Stack>
      <HapusDataBPJ
        open={HapusBPJOpen}
        handleClose={() => {
          confirm()
          setHapusBPJOpen(false);
          setSelectedNippos(null); // Reset selected nippos when closing modal
        }}
        nippos={selectedNippos} // Pass selected nippos as prop
      />
    </div>
  );
}
