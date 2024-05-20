import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Pagination, Checkbox } from '@mui/material';
import FilterButton from '../../ui-component/button/FilterButton'; // Adjust the path as necessary

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
        fontWeight: 400,
        verticalAlign: 'center',
    },
    }));

export default function MainTable({ columnKeys, filteredRows, minWidth, checkboxSelection }) {
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setPage(1);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredRows.slice(startIndex, endIndex).map((row) => row.id);
      setSelectedRows(newSelecteds);
      return;
    }
    setSelectedRows([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selectedRows.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRows, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRows.slice(1));
    } else if (selectedIndex === selectedRows.length - 1) {
      newSelected = newSelected.concat(selectedRows.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRows.slice(0, selectedIndex),
        selectedRows.slice(selectedIndex + 1),
      );
    }

    setSelectedRows(newSelected);
  };

  const isSelected = (id) => selectedRows.indexOf(id) !== -1;

  return (
    <div>
      <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
        <TableContainer component={Paper}>
          <Table stickyHeader sx={{ minWidth: minWidth || 700 }}>
            <TableHead>
              <TableRow>
                {checkboxSelection && (
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      indeterminate={selectedRows.length > 0 && selectedRows.length < filteredRows.slice(startIndex, endIndex).length}
                      checked={filteredRows.length > 0 && selectedRows.length === filteredRows.slice(startIndex, endIndex).length}
                      onChange={handleSelectAllClick}
                    />
                  </StyledTableCell>
                )}
                {Object.keys(columnKeys).map((key) => (
                  <StyledTableCell key={key}>{columnKeys[key]}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.slice(startIndex, endIndex).map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    {checkboxSelection && (
                      <StyledTableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </StyledTableCell>
                    )}
                    {Object.keys(columnKeys).map((key) => (
                      <StyledTableCell key={key}>{row[key]}</StyledTableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Stack spacing={2} direction="row">
        <Pagination
          count={Math.ceil(filteredRows.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
        <div style={{ flex: '1' }}></div>
        <FilterButton itemsPerPage={itemsPerPage} setItemsPerPage={handleItemsPerPageChange} />
      </Stack>
    </div>
  );
}
