import * as React from 'react';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DeleteOutlined } from '@mui/icons-material';
import ButtonErrorOutlined from '../../ui-component/button/ButtonErrorOutlined';
import HapusDataKomiteTalent from '../../ui-component/modal/hapus-data-komite-talent';

const StyledTableCell = styled(TableCell)(({ columnIndex }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#E0E0E0',
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: 600,
    border: 0
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    minHeight: 20,
    verticalAlign: 'center',
  },
}));

export default function TabelDaftarAnggotaKomiteTalent({ rows }) {
  const [HapusKomiteTalentOpen, setHapusKomiteTalentOpen] = useState(false);

  const handleHapusKomiteTalentOpen = () => {
    setHapusKomiteTalentOpen(true);
  };

  const handleHapusBPJClose = () => {
    setHapusKomiteTalentOpen(false);
  };

  return (
    <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px'}}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell>Nama</StyledTableCell>
            <StyledTableCell>NIPPOS</StyledTableCell>
            <StyledTableCell>Posisi</StyledTableCell>
            <StyledTableCell>Job Level</StyledTableCell>
            <StyledTableCell>Bagian</StyledTableCell>
            <StyledTableCell>Kantor</StyledTableCell>
            <StyledTableCell>Aksi</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <StyledTableCell>{row.id}</StyledTableCell>
              <StyledTableCell>{row.nama}</StyledTableCell>
              <StyledTableCell>{row.nippos}</StyledTableCell>
              <StyledTableCell>{row.posisi}</StyledTableCell>
              <StyledTableCell>{row.joblevel}</StyledTableCell>
              <StyledTableCell>{row.bagian}</StyledTableCell>
              <StyledTableCell>{row.kantor}</StyledTableCell>
              <StyledTableCell>
                  <ButtonErrorOutlined
                      icon={DeleteOutlined}
                      LabelName={'Hapus'}
                      padding={'6px 16px'}
                      onClick={handleHapusKomiteTalentOpen}
                  />
              </StyledTableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <HapusDataKomiteTalent
        open={HapusKomiteTalentOpen}
        handleClose={() => setHapusKomiteTalentOpen(false)}
    />
    </div>
  );
}
