import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { idID } from '@mui/material/locale';

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
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={checkboxSelection} // Use the prop value here
      />
    </div>
  );
}
