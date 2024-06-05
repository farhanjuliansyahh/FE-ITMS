// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Button from '@mui/material/Button';
// import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
// import InputNilaiTalentDays from '../../ui-component/modal/input-nilai-talent-days';

// const getStatusStyle = (status) => {
//   let color, backgroundColor;
//   switch (status) {
//     case 'Belum Diisi':
//       color = '#F44336';
//       backgroundColor = '#FFEDED';
//       break;
//     case 'Sudah Diisi':
//       color = '#66BB6A';
//       backgroundColor = '#F5FFF5';
//       break;
//     default:
//       color = '#000000';
//       backgroundColor = 'transparent';
//   }
//   return { color, backgroundColor };
// };

// export default function TalentDaysBPJTable({ rows, question, eventid, refetchkaryawan, eventstatus_id, disabled }) {
//   const [nilaiOpen, setNilaiOpen] = useState(false);
//   const [selectedNippos, setSelectedNippos] = useState('');
//   const [nilai, setNilai] = useState([]);

//   const getnilai = (eventid, nippos) => {
//     return fetch('http://localhost:4000/getnilaidays', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         nippos: nippos,
//         eventtalentid: eventid
//       })
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then((data) => {
//         setNilai(data.nilai.map((item) => item.skor));
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         throw error;
//       });
//   };

//   const handleOpen = (nippos) => {
//     setSelectedNippos(nippos);
//     setNilaiOpen(true);
//     getnilai(eventid, nippos);
//   };

//   const handleClose = () => {
//     setNilaiOpen(false);
//   };

//   const columns = [
//     { field: 'id', headerName: 'No', width: 90 },
//     { field: 'Nama', headerName: 'Nama', width: 200 },
//     { field: 'Nippos', headerName: 'Nippos', width: 130 },
//     { field: 'Posisi', headerName: 'Posisi', width: 400 },
//     { field: 'Job Level', headerName: 'Job Level', width: 130 },
//     { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 150 },
//     { field: 'Nama Kantor', headerName: 'Kantor', width: 250 },
//     { field: 'Komite Unit', headerName: 'Komite Unit', width: 250 },
//     {
//       field: 'Status',
//       headerName: 'Status',
//       width: 130,
//       renderCell: (params) => {
//         const { color, backgroundColor } = getStatusStyle(params.value);
//         return (
//           <div>
//             <span
//               style={{
//                 color,
//                 backgroundColor,
//                 padding: '4px 8px',
//                 borderRadius: '24px'
//               }}
//             >
//               {params.value}
//             </span>
//           </div>
//         );
//       }
//     },
//     {
//       field: 'aksi',
//       headerName: 'Aksi',
//       width: 150,
//       renderCell: (params) => {
//         return (
//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: '#1C2D5A',
//               color: '#FFFFFF',
//               borderRadius: '12px',
//               padding: '6px 16px'
//             }}
//             endIcon={<AssignmentOutlinedIcon />}
//             onClick={() => handleOpen(params.row.Nippos)}
//             disabled = {disabled}
//           >
//             Nilai
//           </Button>
//         );
//       }
//     }
//   ];

//   return (
//     <div style={{ height: 400, width: '100%', overflow: 'hidden' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 5 }
//           }
//         }}
//         pageSizeOptions={[5, 10]}
//         sx={{
//           borderRadius: '12px', // Apply border radius to the DataGrid itself
//           '& .MuiDataGrid-main': {
//             borderRadius: '12px' // Apply border radius to the main container
//           },
//           '& .MuiDataGrid-columnHeader': {
//             backgroundColor: '#F5F5F5', // Apply background color to each header cell
//             padding: '0 24px' // Apply horizontal padding to each header cell
//           },
//           '& .MuiDataGrid-cell': {
//             padding: '0 24px' // Apply horizontal padding to each header cell
//           }
//         }}
//       />

//       <InputNilaiTalentDays
//         open={nilaiOpen}
//         handleClose={() => setNilaiOpen(false)}
//         questionList={question}
//         nippos={selectedNippos}
//         eventid={eventid}
//         refetchkaryawan={refetchkaryawan}
//         nilai={nilai}
//         eventstatus_id={eventstatus_id}
//       />
//     </div>
//   );
// }



import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import InputNilaiTalentDays from '../../ui-component/modal/input-nilai-talent-days';
import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import FilterButton from '../../ui-component/button/FilterButton';

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
    border: 0,
    // height: '60px',
  },
}));

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

export default function TalentDaysBPJTable({ rows, question, eventid, refetchkaryawan, eventstatus_id }) {
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
    { field: 'id', headerName: 'No', width: 90 },
    { field: 'Nama', headerName: 'Nama', width: 200 },
    { field: 'Nippos', headerName: 'Nippos', width: 130 },
    { field: 'Posisi', headerName: 'Posisi', width: 400 },
    { field: 'Job Level', headerName: 'Job Level', width: 130 },
    { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 150 },
    { field: 'Nama Kantor', headerName: 'Kantor', width: 250 },
    { field: 'Komite Unit', headerName: 'Komite Unit', width: 250 },
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
          >
            Nilai
          </Button>
        );
      }
    }
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
    <div>
      <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ padding: '0 24px' }}>No</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Nama</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Nippos</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Posisi</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Job Level</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Rumpun Jabatan</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Kantor</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Komite Unit</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Status</StyledTableCell>
              <StyledTableCell style={{ padding: '0 24px' }}>Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(startIndex, endIndex).map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell style={{ padding: '0 24px' }}>{row.id}</StyledTableCell>
                <StyledTableCell style={{ padding: '0 24px' }}>{row.Nama}</StyledTableCell>
                <StyledTableCell style={{ padding: '0 24px' }}>{row.Nippos}</StyledTableCell>
                <StyledTableCell style={{ padding: '0 24px' }}>{row.Posisi}</StyledTableCell>
                <StyledTableCell style={{ padding: '0 24px' }}>{row['Job Level']}</StyledTableCell>
                <StyledTableCell style={{ padding: '0 24px' }}>{row['Rumpun Jabatan']}</StyledTableCell>
                <StyledTableCell style={{ padding: '0 24px' }}>{row['Nama Kantor']}</StyledTableCell>
                <StyledTableCell style={{ padding: '0 24px' }}>{row['Komite Unit']}</StyledTableCell>
                <StyledTableCell style={{ padding: '0 24px' }}>
                  <div>
                    <span
                      style={{
                        ...getStatusStyle(row.Status),
                        padding: '4px 8px',
                        borderRadius: '24px'
                      }}
                    >
                      {row.Status}
                    </span>
                  </div>
                </StyledTableCell>
                <StyledTableCell style={{ padding: '0 24px' }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#1C2D5A',
                      color: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '6px 16px'
                    }}
                    endIcon={<AssignmentOutlinedIcon />}
                    onClick={() => handleOpen(row.Nippos)}
                  >
                    Nilai
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
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