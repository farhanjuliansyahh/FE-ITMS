import * as React from 'react';
import { useEffect, useState } from 'react';
import { CreateOutlined } from '@mui/icons-material/';
import ButtonPrimary from '../button/ButtonPrimary';
import UbahStatusTalent from '../modal/ubah-status-talent';
import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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
    height: '60px'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    minHeight: 20,
    verticalAlign: 'center',
    height: '60px'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const ButtonContainer = styled('div')({
  whiteSpace: 'nowrap'
});

const calculateColumnWidth = (data, accessor, headerText) => {
  const maxLength = Math.max(...data.map((item) => (item[accessor] ? item[accessor].toString().length : 0)), headerText.length);
  return maxLength * 11;
};

export default function TalentPool({ rows, eventid, updaterows, eventstatus_id, setrefresh, initialDataLength }) {
  const [ubahStatusOpen, setUbahStatusOpen] = useState(false);
  const [selectedNippos, setSelectedNippos] = useState(null);

  const handleUbahStatusOpen = (nippos) => {
    setSelectedNippos(nippos);
    setUbahStatusOpen(true);
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

  const noResultsCaption = "Maaf, tidak ada hasil yang sesuai dengan pencarian Anda.\nCoba periksa ejaan kata kunci";

  return (
    <div>
      {
        rows.length === 0 && initialDataLength !== rows.length ? (
          <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>No</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 150 }}>Nama</StyledTableCell>
                    <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>Nippos</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 250 }}>Posisi</StyledTableCell>
                    <StyledTableCell>Job Level</StyledTableCell>
                    <StyledTableCell sx={{ width: calculateColumnWidth(rows, 'jobfam', 'Job Family') }}>Rumpun Jabatan</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'Kantor', 'Nama Kantor') }}>Kantor</StyledTableCell>
                    <StyledTableCell>Kategori Matrix Akhir</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell style={{ textAlign: 'center' }}>Aksi</StyledTableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </TableContainer>
            <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', whiteSpace: 'pre-line', textAlign: 'center' }}>
              {noResultsCaption}
            </Typography>
          </div>
        ) : (
          <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>No</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 150 }}>Nama</StyledTableCell>
                    <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>Nippos</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: 250 }}>Posisi</StyledTableCell>
                    <StyledTableCell>Job Level</StyledTableCell>
                    <StyledTableCell sx={{ width: calculateColumnWidth(rows, 'jobfam', 'Job Family') }}>Rumpun Jabatan</StyledTableCell>
                    <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'Kantor', 'Nama Kantor') }}>Kantor</StyledTableCell>
                    <StyledTableCell>Kategori Matrix Akhir</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell style={{ textAlign: 'center' }}>Aksi</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.slice(startIndex, endIndex).map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{row.id}</StyledTableCell>
                      <StyledTableCell>{row.Nama}</StyledTableCell>
                      <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{row.Nippos}</StyledTableCell>
                      <StyledTableCell>{row.Posisi}</StyledTableCell>
                      <StyledTableCell style={{ textAlign: 'center' }}>{row['Job Level']}</StyledTableCell>
                      <StyledTableCell>{row['Rumpun Jabatan']}</StyledTableCell>
                      <StyledTableCell>{row['Nama Kantor']}</StyledTableCell>
                      <StyledTableCell style={{ textAlign: 'center' }}>{row['Kategori Matrix Akhir']}</StyledTableCell>
                      <StyledTableCell style={{ textAlign: 'center' }}>{row.Status}</StyledTableCell>
                      <StyledTableCell>
                        <ButtonContainer>
                          <ButtonPrimary
                            icon={CreateOutlined}
                            LabelName={'Ubah Status'}
                            padding={'6px 16px'}
                            onClick={() => handleUbahStatusOpen(row.Nippos)}
                            disabled={eventstatus_id !== 7}
                          />
                        </ButtonContainer>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )
      }

      <Stack spacing={2} direction="row" marginTop={2}>
        <Pagination count={Math.ceil(rows.length / itemsPerPage)} page={page} onChange={handleChangePage} color="primary" />
        <div style={{ flex: '1' }}> </div>
        <FilterButton itemsPerPage={itemsPerPage} setItemsPerPage={handleItemsPerPageChange} />
      </Stack>
      <UbahStatusTalent
        open={ubahStatusOpen}
        handleClose={() => {
          // confirm()
          setUbahStatusOpen(false);
          setSelectedNippos(null); // Reset selected nippos when closing modal
          updaterows();
          setrefresh(true);
        }}
        nippos={selectedNippos} // Pass selected nippos as prop
        eventid={eventid}
      />
    </div>
  );
}
