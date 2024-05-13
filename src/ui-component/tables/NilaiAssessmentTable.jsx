import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Menu, MenuItem } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { ExpandMore } from '@mui/icons-material';
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

const columnKeys = {
    'id': 'No',
    'nama': 'Nama',
    'nippos': 'NIPPOS',
    'posisi': 'Posisi',
    'joblevel': 'Job Level',
    'rumpunjabatan': 'Rumpun Jabatan',
    'kantor': 'Kantor',
    'komiteunit': 'Komite Unit',
    'kompbumn': 'Kompetensi BUMN',
    'komplead': 'Kompetensi Leadership',
    'kompteknis': 'Kompetensi Teknis',
    'potensi': 'Potensi',
    'akhlak': 'AKHLAK',
    'learningagility': 'Learning Agility',
    'performance': 'Performance'
};

export default function NilaiAssessmentTable({ 
    rows,
    searchNama, // Receive the search term as a prop
    searchNippos,
    searchJobLevel,
    searchRumpunJabatan
}) {
    // Filter the rows based on selected filters and search term
    const filteredRows = rows.filter((row) => {
        const namaMatch = !searchNama || (row.nama && row.nama.toLowerCase().includes(searchNama.toLowerCase())); // Add null check for row.nama
        const nipposMatch = !searchNippos || (row.nippos && row.nippos.toLowerCase().includes(searchNippos.toLowerCase())); // Add null check for row.nippos
        const jobLevelMatch = !searchJobLevel || (row.joblevel && row.joblevel.toLowerCase().includes(searchJobLevel.toLowerCase())); // Add null check for row.nippos
        const rumpunJabatanMatch = !searchRumpunJabatan || (row.rumpunjabatan && row.rumpunjabatan.toLowerCase().includes(searchRumpunJabatan.toLowerCase())); // Add null check for row.nippos

        return (!searchNama || namaMatch) 
        && (!searchNippos || nipposMatch) 
        && (!searchJobLevel || jobLevelMatch) 
        && (!searchRumpunJabatan || rumpunJabatanMatch);
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
          <Table stickyHeader sx={{ minWidth: 3000 }}>
            <TableHead>
                <TableRow>
                    {Object.keys(columnKeys).map((key) => (
                        <StyledTableCell key={key}>{columnKeys[key]}</StyledTableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {filteredRows.slice(startIndex, endIndex).map((row) => (
                    <TableRow key={row.id}>
                    {Object.keys(columnKeys).map((key) => (
                        <StyledTableCell key={key}>{row[key]}</StyledTableCell>
                    ))}
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
