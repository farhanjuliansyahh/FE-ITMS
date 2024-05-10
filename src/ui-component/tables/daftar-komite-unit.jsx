import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Menu, MenuItem } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { AddCircleOutlineOutlined, ExpandMore } from '@mui/icons-material';
import ButtonPrimary from '../../ui-component/button/ButtonPrimary';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F5F5F5',
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: 600,
    border: 0
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    minHeight: 20,
    fontWeight: 400,
    verticalAlign: 'center',
  },
}));

// function createData(id, nama, nippos, jabatan, kantor, aksi) {
//   return { id, nama, nippos, jabatan, kantor, aksi };
// }

// const rows = [
//   createData(1, 'Sri Hartini', '998494379', 'Asisten Manajer Pengembangan Join Operation', 'KANTOR PUSAT BANDUNG'),
//   createData(2, 'Muhamad Arsyi', '998494379', 'Asisten Manajer Acquisition Biller', 'KANTOR PUSAT BANDUNG'),
//   createData(3, 'Adinda', '998494379', 'Asisten Manajer Pengelolaan Remittance LN', 'KANTOR PUSAT BANDUNG'),
//   createData(4, 'Niken Wijaya', '998494379', 'Asisten Manajer Penjualan dan Kemitraan Pospay', 'KANTOR PUSAT JAKARTA'),
//   createData(5, 'Niken', '998494379', 'Asisten Manajer Pengelolaan Administrasi dan Kinerja Bidding', 'KANTOR PUSAT JAKARTA'),
// ];

export default function TabelDaftarAnggotaKomiteUnit({ 
  onOpenSecondModalTable,
  selectedKantor,
  selectedRumpunJabatan,
  selectedJobLevel,
  selectedStatusIDP,
  rows
  }) {

  const filteredRows = rows.filter((row) => {
    const kantorMatch = row.kantor === selectedKantor?.nama_kantor;
    const rumpunJabatanMatch = row.jobfam === selectedRumpunJabatan;
    const jobLevelMatch = row.joblevel === selectedJobLevel;
    const statusIDPMatch = row.status_IDP === selectedStatusIDP;
    
    return (!selectedKantor || kantorMatch) && (!selectedRumpunJabatan || rumpunJabatanMatch) && 
            (!selectedJobLevel || jobLevelMatch) && (!selectedStatusIDP || statusIDPMatch);
  });

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
      <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px'}}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow>
                <StyledTableCell>No</StyledTableCell>
                <StyledTableCell>Nama</StyledTableCell>
                <StyledTableCell>NIPPOS</StyledTableCell>
                <StyledTableCell>Jabatan</StyledTableCell>
                <StyledTableCell>Kantor</StyledTableCell>
                <StyledTableCell>Aksi</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(startIndex, endIndex).map((row) => (
                <TableRow key={row.id}>
                  <StyledTableCell>{row.id}</StyledTableCell>
                  <StyledTableCell>{row.nama}</StyledTableCell>
                  <StyledTableCell>{row.nippos}</StyledTableCell>
                  <StyledTableCell>{row.jabatan}</StyledTableCell>
                  <StyledTableCell>{row.kantor}</StyledTableCell>
                  <StyledTableCell>
                    <ButtonPrimary
                      icon={AddCircleOutlineOutlined}
                      LabelName={'Tambah'}
                      padding={'6px 16px'}
                      onClick={() => onOpenSecondModalTable(row.nippos)}
                    />
                  </StyledTableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Stack spacing={2} direction="row">
        <Pagination 
          count={Math.ceil(filteredRows.length / itemsPerPage)} 
          page={page} 
          onChange={handleChangePage} 
          color="primary" />
        <div style={{ flex: '1' }}> </div>
        <FilterButton itemsPerPage={itemsPerPage} setItemsPerPage={handleItemsPerPageChange} />
      </Stack>
    </div>
  );
}

function FilterButton({ itemsPerPage, setItemsPerPage }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (value) => {
    setItemsPerPage(value);
    handleClose();
  };

  return (
    <div>
      <ButtonPrimary
        Color={'#1F1F1F'}
        backgroundColor={'#FFFFFF'}
        icon={ExpandMore}
        LabelName={`${itemsPerPage} rows`}
        padding={'6px 16px'}
        onClick={handleClick}
        hoverColor={'#1F1F1F'}
        hoverBackgroundColor={'#F5F5F5'}
      />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleItemClick(3)}>3</MenuItem> 
        <MenuItem onClick={() => handleItemClick(5)}>5</MenuItem>
        <MenuItem onClick={() => handleItemClick(10)}>10</MenuItem>
      </Menu>
    </div>
  );
}
