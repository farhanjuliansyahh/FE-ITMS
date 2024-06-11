// import React, { useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';


// const KaryawanKomiteUnit = ({
//     rows,
//     checkboxSelection,
//     selectedRows,
//     onSelectedRowsChange
// }) => {

//     const currentYear = new Date().getFullYear();

//     const handleSelectionChange = (newSelection) => {
//         onSelectedRowsChange(newSelection); 
//     };

//     const columns = [
//         { field: 'id', headerName: 'No', width: 70 },
//         { field: 'Nama', headerName: 'Nama', width: 170 },
//         { field: 'Nippos', headerName: 'NIPPOS', width: 130 },
//         { field: 'Posisi', headerName: 'Posisi', width: 250 },
//         { field: 'Job Level', headerName: 'Job Level', width: 130 },
//         { field: 'Job Family', headerName: 'Rumpun Jabatan', width: 180 },
//         { field: 'Competency/Psychotest', headerName: 'Competency/Psychotest', width: 200 },
//         { field: 'PMS2yearsago', headerName: `PMS ${currentYear - 2}`, width: 180 },
//         { field: 'PMS1yearago', headerName: `PMS ${currentYear - 1}`, width: 180 },
//         { field: 'PMSthisyear', headerName: `PMS ${currentYear}`, width: 180 },
//         { field: 'AKHLAK', headerName: 'AKHLAK', width: 180 },
//         { field: 'Learning Agility', headerName: 'Learning Agility', width: 180 },
//         { field: 'Status Hukdis', headerName: 'Status Hukdis', width: 200 },
//     ];

//     return (
//         <div style={{ height: 400, width: '100%' }}>
//             <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 initialState={{
//                     pagination: {
//                         paginationModel: { page: 0, pageSize: 5 },
//                     },
//                 }}
//                 pageSizeOptions={[5, 10]}
//                 checkboxSelection={checkboxSelection}
//                 disableRowSelectionOnClick={!checkboxSelection}
//                 onRowSelectionModelChange={handleSelectionChange}
//                 rowSelectionModel={selectedRows}

//             />

//         </div>
//     );
// };

// export default KaryawanKomiteUnit;

import React, { useState, useEffect } from 'react';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, Stack } from '@mui/material';
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
        border: 0
    }
}));

const KaryawanKomiteUnit = ({
    rows,
    checkboxSelection,
    selectedRows,
    onSelectedRowsChange,
    initialDataLength,
    caption
}) => {

    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [selectAll, setSelectAll] = useState(false);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setPage(1);
    };
    const handleSelectionChange = (id) => {
        let newSelection;
        if (selectedRows.includes(id)) {
            newSelection = selectedRows.filter((rowId) => rowId !== id);
        } else {
            newSelection = [...selectedRows, id];
        }
        onSelectedRowsChange(newSelection);
    };

    const handleSelectAllChange = () => {
        if (selectAll) {
            onSelectedRowsChange([]);
        } else {
            onSelectedRowsChange(rows.map((row) => row.id));
        }
        setSelectAll(!selectAll);
    };

    useEffect(() => {
        setSelectAll(selectedRows.length === rows.length && rows.length > 0);
    }, [selectedRows, rows]);

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, rows.length);

    const currentYear = new Date().getFullYear();


    const columns = [
        // { field: 'id', headerName: 'No', width: 70 },
        { field: 'Nama', headerName: 'Nama', width: 170 },
        { field: 'Nippos', headerName: 'NIPPOS', width: 130 },
        { field: 'Posisi', headerName: 'Posisi', width: 250 },
        { field: 'Job Level', headerName: 'Job Level', width: 130 },
        { field: 'Job Family', headerName: 'Rumpun Jabatan', width: 180 },
        { field: 'Competency/Psychotest', headerName: 'Competency/Psychotest', width: 200 },
        { field: 'PMS2yearsago', headerName: `PMS ${currentYear - 2}`, width: 180 },
        { field: 'PMS1yearago', headerName: `PMS ${currentYear - 1}`, width: 180 },
        { field: 'PMSthisyear', headerName: `PMS ${currentYear}`, width: 180 },
        { field: 'AKHLAK', headerName: 'AKHLAK', width: 180 },
        { field: 'Learning Agility', headerName: 'Learning Agility', width: 180 },
        { field: 'Status Hukdis', headerName: 'Status Hukdis', width: 200 },
    ];

    const noResultsCaption = "Maaf, tidak ada hasil yang sesuai dengan pencarian Anda.\nCoba periksa ejaan kata kunci";

    return (
        <div>
            {
                rows.length > 0 ? (
                    <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }}>
                                <TableHead>
                                    <StyledTableRow>
                                        {checkboxSelection && (
                                            <StyledTableCell style={{ textAlign: 'center' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={handleSelectAllChange}
                                                    style={{ width: '12px', height: '12px', transform: 'scale(1.5)' }}
                                                />
                                            </StyledTableCell>
                                        )}
                                        <StyledTableCell>No</StyledTableCell>
                                        {columns.map((column) => (
                                            <StyledTableCell key={column.field} style={{ width: column.width }}>
                                                {column.headerName}
                                            </StyledTableCell>
                                        ))}
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(startIndex, endIndex).map((row, index) => (
                                        <StyledTableRow key={row.id}>
                                            {checkboxSelection && (
                                                <StyledTableCell style={{ textAlign: 'center' }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedRows.includes(row.id)}
                                                        onChange={() => handleSelectionChange(row.id)}
                                                        style={{ width: '12px', height: '12px', transform: 'scale(1.5)' }}
                                                    />
                                                </StyledTableCell>
                                            )}
                                            <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>
                                                {startIndex + index + 1}
                                            </StyledTableCell>
                                            {columns.map((column) => (
                                                <StyledTableCell key={column.field} sx={{ minWidth: column.width }} >
                                                    {row[column.field]}
                                                </StyledTableCell>
                                            ))}
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ) : (
                    <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }}>
                                <TableHead>
                                    <StyledTableRow>
                                        {checkboxSelection && (
                                            <StyledTableCell style={{ textAlign: 'center' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={handleSelectAllChange}
                                                    style={{ width: '12px', height: '12px', transform: 'scale(1.5)' }}
                                                />
                                            </StyledTableCell>
                                        )}
                                        <StyledTableCell>No</StyledTableCell>
                                        {columns.map((column) => (
                                            <StyledTableCell key={column.field} style={{ width: column.width }}>
                                                {column.headerName}
                                            </StyledTableCell>
                                        ))}
                                    </StyledTableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                        <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', whiteSpace: 'pre-line', textAlign: 'center' }}>
                            {rows.length === 0 && initialDataLength !== rows.length ? noResultsCaption : caption}
                        </Typography>
                    </div>
                )
            }

            {rows.length > 0 && (
                <Stack spacing={2} direction="row" marginTop={2}>
                    <Pagination
                        count={Math.ceil(rows.length / itemsPerPage)}
                        page={page}
                        onChange={handleChangePage}
                        color="primary" />
                    <div style={{ flex: '1' }}></div>
                    <FilterButton itemsPerPage={itemsPerPage} setItemsPerPage={handleItemsPerPageChange} />
                </Stack>
            )}
        </div>

    );
};

export default KaryawanKomiteUnit;

