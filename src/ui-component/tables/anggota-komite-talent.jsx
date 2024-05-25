import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import FilterButton from '../../ui-component/button/FilterButton';
import HapusDataKomiteTalent from '../../ui-component/modal/hapus-data-komite-talent';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F5F5F5',
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    minHeight: 20,
    verticalAlign: 'center',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TabelDaftarAnggotaKomiteTalent({ rows }) {
  const [HapusKomiteTalentOpen, setHapusKomiteTalentOpen] = useState(false);

  const handleHapusKomiteTalentOpen = () => {
    setHapusKomiteTalentOpen(true);
  };

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1); // Reset page to 1 when changing items per page
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
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Nama</StyledTableCell>
                <StyledTableCell>NIPPOS</StyledTableCell>
                <StyledTableCell>Posisi</StyledTableCell>
                <StyledTableCell>Job Level</StyledTableCell>
                <StyledTableCell>Rumpun Jabatan</StyledTableCell>
                <StyledTableCell>Kantor</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.slice(startIndex, endIndex).map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell>{row.id}</StyledTableCell>
                  <StyledTableCell>{row.nama}</StyledTableCell>
                  <StyledTableCell>{row.nippos}</StyledTableCell>
                  <StyledTableCell>{row.posisi}</StyledTableCell>
                  <StyledTableCell>{row.joblevel}</StyledTableCell>
                  <StyledTableCell>{row.rumpunjabatan}</StyledTableCell>
                  <StyledTableCell>{row.kantor}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <HapusDataKomiteTalent
          open={HapusKomiteTalentOpen}
          handleClose={() => setHapusKomiteTalentOpen(false)}
        />
      </div>
      {rows.length > 5 && (
        <Stack spacing={2} direction="row">
          <Pagination
            count={Math.ceil(rows.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary" />
          <div style={{ flex: '1' }}> </div>
          <FilterButton itemsPerPage={itemsPerPage} setItemsPerPage={handleItemsPerPageChange} />
        </Stack>
      )}
    </div>
  );
}
