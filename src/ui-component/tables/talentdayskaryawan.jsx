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
  const url = import.meta.env.VITE_API_BASE_URL

  const getnilai = (eventid, nippos) => {
    return fetch(url + 'getnilaidays', {
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

  const calculateColumnWidth = (data, accessor, headerText) => {
    const maxLength = Math.max(...data.map((item) => (item[accessor] ? item[accessor].toString().length : 0)), headerText.length);
    return maxLength * 11;
  };

  return (
    <div>
      <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell >No</StyledTableCell>
              <StyledTableCell sx={{ minWidth: 150 }}>Nama</StyledTableCell>
              <StyledTableCell >Nippos</StyledTableCell>
              <StyledTableCell sx={{ minWidth: 250 }}>Posisi</StyledTableCell>
              <StyledTableCell >Job Level</StyledTableCell>
              <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'jobfam', 'Job Family') }}>Rumpun Jabatan</StyledTableCell>
              <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'Kantor', 'Nama Kantor') }}>Kantor</StyledTableCell>
              <StyledTableCell >Komite Unit</StyledTableCell>
              <StyledTableCell sx={{ textAlign: 'center' }}>Status</StyledTableCell>
              <StyledTableCell sx={{ textAlign: 'center' }}>Aksi</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(startIndex, endIndex).map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{row.id}</StyledTableCell>
                <StyledTableCell >{row.Nama}</StyledTableCell>
                <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{row.Nippos}</StyledTableCell>
                <StyledTableCell >{row.Posisi}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: 'center' }}>{row['Job Level']}</StyledTableCell>
                <StyledTableCell >{row['Rumpun Jabatan']}</StyledTableCell>
                <StyledTableCell >{row['Nama Kantor']}</StyledTableCell>
                <StyledTableCell >{row['Komite Unit']}</StyledTableCell>
                <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        ...getStatusStyle(row.Status),
                        padding: '4px 8px',
                        borderRadius: '24px'
                      }}
                    >
                      {row.Status}
                    </span>
                  </div>
                </StyledTableCell>
                <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: '#1C2D5A',
                      color: '#FFFFFF',
                      borderRadius: '12px',
                      padding: '6px 16px',
                      boxShadow: 'none'
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