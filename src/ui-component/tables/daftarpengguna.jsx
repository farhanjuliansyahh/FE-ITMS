// import * as React from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { idID } from '@mui/material/locale';
// import { Button } from '@mui/material';
// const columns = [
//   { field: 'id', headerName: 'No', width: 70 },
//   { field: 'nama', headerName: 'Nama', width: 130 },
//   { field: 'nippos', headerName: 'Nippos', width: 130 },
//   { field: 'posisi', headerName: 'Posisi', width: 130 },
//   { field: 'jobfam', headerName: 'Job Family', width: 130 },
//   { field: 'joblevel', headerName: 'Job Level', width: 130 },
//   { field: 'Peran', headerName: 'Peran', width: 130 },
//   { field: 'Aksi', headerName: 'Aksi', width: 130 },
//   {
//     field: 'action', // field for the button
//     headerName: 'Actions', // header for the column
//     width: 130,
//     renderCell: (params) => ( // renderCell function to render the button
//       <Button
//         variant="contained"
//         color="primary"
//         size="small"
//         onClick={() => handleButtonClick(params.row.id)} // handleButtonClick is a function to handle button click
//       >
//         Action
//       </Button>
//     ),
//   },
// ];

// const rows = [
//   { id: 1, nama : 'Sri Hartini', nippos:'998494379', posisi :'Asisten Manajer Pengembangan Join Operation', 
//   jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABD HAFID'},
//   { id: 2, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//   jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
//   { id: 3, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//   jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
//   { id: 4, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//   jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
//   { id: 5, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//   jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
//   { id: 6, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//   jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
//   { id: 7, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//   jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
//   { id: 8, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//   jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
//   { id: 9, nama : 'Muhamad Arsyi', nippos:'999494379', posisi :'Asisten Manajer Acquisition Biller', 
//   jobfam :'Bisnis', joblevel:'D3', kantor:'Kantor Pusat Bandung', komiteunit:'ABDU SOMAD'},
// ];

// export default function DaftarPenggunaTabel() {
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//           },
//         }}
//         pageSizeOptions={[5, 10]}
//       />
//     </div>
//   );
// }
// import * as React from 'react';
// import { useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel } from '@mui/material';

// const columns = [
//   { field: 'id', headerName: 'No', width: 70 },
//   { field: 'nama', headerName: 'Nama', width: 130 },
//   { field: 'nippos', headerName: 'Nippos', width: 130 },
//   { field: 'posisi', headerName: 'Posisi', width: 130 },
//   { field: 'jobfam', headerName: 'Job Family', width: 130 },
//   { field: 'joblevel', headerName: 'Job Level', width: 130 },
//   { field: 'peran', headerName: 'Peran', width: 130 },
//   {
//     field: 'Aksi',
//     headerName: 'Aksi',
//     width: 130,
//     renderCell: (params) => (
//       <ActionButton rowId={params.row.id} setRows={params.setRowsData} />
//     ),
//   },
// ];

// const initialRows = [
//   { id: 1, nama: 'Sri Hartini', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation', jobfam: 'Bisnis', joblevel: 'D3', kantor: 'Kantor Pusat Bandung', komiteunit: 'ABD HAFID', Peran: '' },
// ];

// const peranOptions = ['Admin Talent', 'Coach', 'Karyawan', 'Ketua Komite Talent','Komite Unit', 'Talent'];

// const ActionButton = ({ rowId, setRows }) => {
//   const [open, setOpen] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]);

//   const handleButtonClick = () => {
//     setOpen(true);
//   };

//   const handleModalClose = () => {
//     setOpen(false);
//   };

//   const handleCheckboxChange = (option) => (event) => {
//     if (event.target.checked) {
//       setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, option]);
//     } else {
//       setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((item) => item !== option));
//     }
//   };

//   const handleSavePeran = () => {
//     const updatedRows = initialRows.map(row => {
//       if (row.id === rowId) {
//         return { ...row, peran: selectedOptions.join(', ') };
//       }
//       return row;
//     });
//     setRows(updatedRows);
//     setOpen(false);
//     setSelectedOptions([]);
//   };

//   return (
//     <>
//       <Button
//         variant="contained"
//         color="primary"
//         size="small"
//         onClick={handleButtonClick}
//       >
//         Ubah Aksi
//       </Button>
//       <Dialog open={open} onClose={handleModalClose}>
//         <DialogTitle>Select Peran</DialogTitle>
//         <DialogContent>
//           {peranOptions.map((option, index) => (
//             <FormControlLabel
//               key={index}
//               control={<Checkbox onChange={handleCheckboxChange(option)} />}
//               label={option}
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleModalClose} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={handleSavePeran} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default function DaftarPenggunaTabel() {
//   const [rows] = useState(initialRows);

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSizeOptions={[5, 10]}
//       />
//     </div>
//   );
// }


// ning
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Checkbox, FormControlLabel } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'No', width: 70 },
  { field: 'nama', headerName: 'Nama', width: 130 },
  { field: 'nippos', headerName: 'Nippos', width: 130 },
  { field: 'posisi', headerName: 'Posisi', width: 130 },
  { field: 'jobfam', headerName: 'Job Family', width: 130 },
  { field: 'joblevel', headerName: 'Job Level', width: 130 },
  { field: 'Peran', headerName: 'Peran', width: 130 },
  {
    field: 'Aksi',
    headerName: 'Aksi',
    width: 130,
    renderCell: (params) => (
      <ActionButton rowId={params.row.id}  />
    ),
  },
];

const initialRows = [
  { id: 1, nama: 'Sri Hartini', nippos: '998494379', posisi: 'Asisten Manajer Pengembangan Join Operation', jobfam: 'Bisnis', joblevel: 'D3', kantor: 'Kantor Pusat Bandung', komiteunit: 'ABD HAFID', Peran: '', selectedPeran: [] },
];

const peranOptions = ['Option 1', 'Option 2', 'Option 3'];

const ActionButton = ({ rowId }) => {
  const [open, setOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleButtonClick = () => {
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (option) => (event) => {
    if (event.target.checked) {
      setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, option]);
    } else {
      setSelectedOptions((prevSelectedOptions) => prevSelectedOptions.filter((item) => item !== option));
    }
  };

  const handleSavePeran = () => {
    const updatedRows = initialRows.map(row => {
      if (row.id === rowId) {
        return { ...row, Peran: selectedOptions.join(', '), selectedPeran: selectedOptions };
      }
      return row;
    });
    // Here you would typically save the updatedRows to your database or wherever you store your data
    console.log(updatedRows);
    setOpen(false);
    setSelectedOptions([]);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={handleButtonClick}
      >
        Action
      </Button>
      <Dialog open={open} onClose={handleModalClose}>
        <DialogTitle>Select Peran</DialogTitle>
        <DialogContent>
          {peranOptions.map((option, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox checked={selectedOptions.includes(option)} onChange={handleCheckboxChange(option)} />}
              label={option}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSavePeran} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default function DaftarPenggunaTabel() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={initialRows}
        columns={columns}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
