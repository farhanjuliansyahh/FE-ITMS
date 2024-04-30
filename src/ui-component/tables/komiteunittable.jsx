import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';

const columns = [
  { id: 'id', label:'No', minWidth:50, align: 'left', format: (value) =>parseInt(value)},
  { id: 'Komite Unit', label: 'Komite Unit', align:'left', minWidth: 120 },
  { id: 'Nippos', label: 'NIPPOS', align:'left', minWidth: 120 },
  { id: 'Posisi', label: 'Jabatan', align:'left', minWidth: 120 },
  { id: 'Job Family', label: 'Personal Level', align:'left', minWidth: 120 },
  { id: 'Nama Kantor', label: 'Nama Kantor', align:'left', minWidth: 120 },
  { id: 'Status Memilih', label: 'Status', align:'left', minWidth: 120 },
];


function createData(no, komiteunit, nippos, jabatan, personallevel, status) {
  return {no, komiteunit, nippos, jabatan, personallevel, status };
}



export default function KomiteUnitListTable({data}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = data
  console.log(rows);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage-1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 320 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2} alignItems="center" sx={{marginTop: '15px'}}> 
          <Pagination count={Math.ceil(rows.length / rowsPerPage)} page={page + 1} onChange={handleChangePage} />
          <Typography sx={{marginLeft: '320px' }}>Page  {page + 1}</Typography>

      </Grid>
    </Paper>
  );
}
