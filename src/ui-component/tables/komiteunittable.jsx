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
  { id: 'no', label:'No', minWidth:50, align: 'left', format: (value) =>parseInt(value)},
  { id: 'komiteunit', label: 'Komite Unit', align:'left', minWidth: 120 },
  { id: 'nippos', label: 'NIPPOS', align:'left', minWidth: 120 },
  { id: 'jabatan', label: 'Jabatan', align:'left', minWidth: 120 },
  { id: 'personallevel', label: 'Personal Level', align:'left', minWidth: 120 },
  { id: 'status', label: 'Status', align:'left', minWidth: 120 },
];


function createData(no, komiteunit, nippos, jabatan, personallevel, status) {
  return {no, komiteunit, nippos, jabatan, personallevel, status };
}


const rows = [
  createData(1,'ABD HAFID','900000001', 'VP Fronting Business', 'B2', 'Belum Memilih'),
  createData(2,'ABDU SOMAD','900000001', 'VP Fronting Business', 'B2', 'Belum Memilih'),
  createData(3,'ABDUL JAMIL','900000001', 'VP Fronting Business', 'B2', 'Belum Memilih'),
  createData(4,'ABDUL WAHHAB','900000001', 'VP Fronting Business', 'B2', 'Belum Memilih'),
  createData(5,'ACEP RUDI SUPRIADI','900000001', 'VP Fronting Business', 'B2', 'Belum Memilih'),
  createData(6,'IMAN HAKIM','900000001', 'VP Fronting Business', 'B2', 'Belum Memilih'),
  createData(7,'JAMALUDIN','900000001', 'VP Fronting Business', 'B2', 'Belum Memilih'),
  createData(8,'KEMAL ASSEGAF','900000001', 'VP Fronting Business', 'B2', 'Belum Memilih'),
  createData(9,'LORENZO','900000001', 'VP Fronting Business', 'B2', 'Belum Memilih'),
  createData(10,'MAMAT SUPARMAT','900000001', 'VP Fronting Business', 'B2', 'Belum Memilih'),
  createData(11,'OSMAN','900000001', 'VP Fronting Business', 'B2', 'Belum Memilih'),
  createData(12,'PANDU WIJAYA','900000001', 'VP Fronting Business', 'B2', 'Belum Memilih'),
  createData(13,'RADEN AZIZ','900000001', 'VP Fronting Business', 'B2', 'Belum Memilih'),]

export default function KomiteUnitListTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
