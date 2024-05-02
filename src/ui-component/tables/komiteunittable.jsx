import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { idID } from '@mui/material/locale';

const columns = [
  { field: 'id', label:'No', minWidth:50, align: 'left', format: (value) =>parseInt(value)},
  { field: 'Komite Unit', label: 'Komite Unit', align:'left', minWidth: 120 },
  { field: 'Nippos', label: 'NIPPOS', align:'left', minWidth: 120 },
  { field: 'Posisi', label: 'Jabatan', align:'left', minWidth: 120 },
  { field: 'Job Family', label: 'Rumpun Jabatan', align:'left', minWidth: 120 },
  { field: 'Nama Kantor', label: 'Nama Kantor', align:'left', minWidth: 120 },
  { field: 'Status Memilih', label: 'Status', align:'left', minWidth: 120 },
];



export default function KomiteUnitListTable({data}) {
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = data
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage-1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]} // Use the prop value here
      />
    </div>
  );
}
