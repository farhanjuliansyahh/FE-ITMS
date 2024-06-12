import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Menu, MenuItem } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import FilterButton from '../../ui-component/button/FilterButton'; // Adjust the path as necessary

const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F5F5F5',
      color: '#1F1F1F',
      fontSize: 14,
      fontWeight: 600,
      whiteSpace: 'nowrap'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      minHeight: 20,
      fontWeight: 400,
      verticalAlign: 'center',
    },
  }));

const KomiteUnitTable = ({ rows }) => {

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
            <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px', maxHeight: '500px', overflowY: 'auto' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>Nama</StyledTableCell>
                                <StyledTableCell>NIPPOS</StyledTableCell>
                                <StyledTableCell>Posisi</StyledTableCell>
                                <StyledTableCell>Rumpun Jabatan</StyledTableCell>
                                <StyledTableCell>Kantor</StyledTableCell>
                                <StyledTableCell>Status</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(startIndex, endIndex).map((row) => (
                                <TableRow key={row.id}>
                                    <StyledTableCell>{row.id}</StyledTableCell>
                                    <StyledTableCell>{row['Komite Unit']}</StyledTableCell>
                                    <StyledTableCell>{row.Nippos}</StyledTableCell>
                                    <StyledTableCell>{row.Posisi}</StyledTableCell>
                                    <StyledTableCell>{row['Job Family']}</StyledTableCell>
                                    <StyledTableCell>{row['Nama Kantor']}</StyledTableCell>
                                    <StyledTableCell>{row['Status Memilih']}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Stack spacing={2} direction="row">
                <Pagination
                    count={Math.ceil(rows.length / itemsPerPage)}
                    page={page}
                    onChange={handleChangePage}
                    color="primary" />
                <div style={{ flex: '1' }}> </div>
                <FilterButton itemsPerPage={itemsPerPage} setItemsPerPage={handleItemsPerPageChange} />
            </Stack>
        </div>
    );
};

export default KomiteUnitTable;
