// import React, { useState, useEffect } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import { CreateOutlined } from '@mui/icons-material';
// import { Button } from '@mui/material';
// import UbahKategoriMatrix from '../../ui-component/modal/ubah-kategori-matrix';
// import KonfirmasiUbahMatrix from '../../ui-component/modal/konfirmasi-ubah-matrix';

// const getStyledRenderCell = () => (params) => (
//     <div>
//         <span style={{ 
//             color: '#66BB6A', 
//             backgroundColor: params.value ? '#F5FFF5' : 'transparent', 
//             padding: '4px 8px', 
//             borderRadius: '24px' 
//         }}>{params.value}</span>
//     </div>
// );

// const getStatusStyle = (status) => {
//     let color, backgroundColor;
//     switch (status) {
//         case 'Turun':
//             color = '#F44336';
//             backgroundColor = '#FFEDED';
//             break;
//         case 'Naik':
//             color = '#66BB6A';
//             backgroundColor = '#F5FFF5';
//             break;
//         case 'Tetap':
//             color = '#2196F3';
//             backgroundColor = '#EAF8FF';
//             break;
//         default:
//             color = '#000000';
//             backgroundColor = 'transparent';
//     }
//     return { color, backgroundColor };
// };

// const getKategoriMatrixStyle = () => (params) => (
//     <div>
//         <span style={{ 
//             color: '#2196F3', 
//             backgroundColor: params.value ? '#EAF8FF' : 'transparent', 
//             padding: '4px 8px', 
//             borderRadius: '24px' 
//         }}>{params.value}</span>
//     </div>
// );

// const TalentClusterKetuaKomiteTalentTable = ({
//     eventid, 
//     rows,
//     onTableDataRefresh, 
//     disabled,
//     searchNama, 
//     searchNippos,
//     searchJobLevel,
//     searchKategoriMatrix,
//     terpilih,
//     kuota
// }) => {
//     const [openFirstModal, setOpenFirstModal] = useState(false);
//     const [openSecondModal, setOpenSecondModal] = useState(false);
//     const [selectedNippos, setSelectedNippos] = useState(null); // State to store selected nippos
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [currentMatrix, setcurrentMatrix] = useState('')
//     const [refreshTable, setRefreshTable] = useState(false); // State to trigger table refresh

//     useEffect(() => {
//         if (refreshTable) {
//             // Fetch new data or update existing data
//             setRefreshTable(false); // Reset the flag after refreshing
//         }
//     }, [refreshTable]);


//     const handleCategorySelect = (category) => {
//         setSelectedCategory(category); // Store the selected category in the state
//     };

//     const ubahmatriks = (eventid, nippos, matriks, reason ) => {
//         return fetch('http://localhost:4000/updatematriks', {
//             method: 'POST', // Specify the HTTP method (POST, GET, etc.)
//             headers: {
//                 'Content-Type': 'application/json', // Specify the content type
//             },
//             body: JSON.stringify({
//                 // Include any data you want to send in the request body
//                 eventid: eventid,
//                 nippos: nippos,
//                 matriks: matriks,
//                 reason: reason
//             }) // Convert the bodyData object to a JSON string
//         })
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => {
//                 return data; // Return the parsed JSON data
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//                 throw error; // Rethrow the error to handle it elsewhere
//             });
//             setRefreshTable(true);
//     };

//     const handleOpenFirstModal = (nippos, kategoriMatrixAwal) => {
//         setSelectedNippos(nippos); // Store the nippos when the button is clicked
//         setcurrentMatrix(kategoriMatrixAwal)
//         setOpenFirstModal(true); 
//     };

//     const handleCloseFirstModal = () => {
//         setOpenFirstModal(false); 
//     };

//     const handleOpenSecondModal = () => {
//         setOpenSecondModal(true);
//     };

//     const handleCloseSecondModal = (reason) => {
//         ubahmatriks(eventid, selectedNippos, selectedCategory, reason)
//         .then(() => {
//             // Trigger the callback function passed from the parent component to refresh the table data
//             onTableDataRefresh();
//             setOpenSecondModal(false);
//         })
//         .catch(error => {
//             console.error('Error updating data:', error);
//             // Handle error if needed
//         });
//     };

//     const handlebatalkansecondmodal = () => {
//             setOpenSecondModal(false);
//         };

//     const columns = [
//         { field: 'id', headerName: 'No', width: 70 },
//         { field: 'nama', headerName: 'Nama', width: 130 },
//         { field: 'nippos', headerName: 'NIPPOS', width: 130 },
//         { field: 'Posisi', headerName: 'Posisi', width: 130 },
//         { field: 'Job Level', headerName: 'Job Level', width: 130 },
//         { field: 'Rumpun Jabatan', headerName: 'Rumpun Jabatan', width: 130 },
//         { field: 'Nama Kantor', headerName: 'Kantor', width: 130 },
//         { field: 'Komite Unit', headerName: 'Komite Unit', width: 130 },
//         // { field: 'Competency/Psychotest', headerName: 'Competency/Psychotest', width: 200, renderCell: getStyledRenderCell() },
//         // { field: 'PMS', headerName: 'PMS', width: 130, renderCell: getStyledRenderCell() },
//         // { field: 'AKHLAK', headerName: 'AKHLAK', width: 130, renderCell: getStyledRenderCell() },
//         // { field: 'Learning Agility', headerName: 'Learning Agility', width: 180, renderCell: getStyledRenderCell() },
//         // { field: 'days', headerName: 'Nilai Avg Talent Days', width: 200, renderCell: getStyledRenderCell() },
//         { field: 'Matriks Kategori Awal', headerName: 'Kategori Matrix Awal', width: 180, renderCell: getKategoriMatrixStyle() },
//         { field: 'Matriks Kategori Akhir', headerName: 'Kategori Matrix Akhir', width: 180, renderCell: getKategoriMatrixStyle() },
//         {
//           field: 'status',
//           headerName: 'Status',
//           width: 130,
//           renderCell: (params) => {
//             const { color, backgroundColor } = getStatusStyle(params.value);
//             return (
//             <div>
//               <span style={{ 
//               color,
//               backgroundColor,
//               padding: '4px 8px',
//               borderRadius: '24px' 
//               }}>{params.value}</span>
//             </div>
//             );
//           },
//         },
//         {
//             field: 'aksi',
//             headerName: 'Aksi',
//             width: 180,
//             renderCell: (params) => {
//                 const { nippos, 'Matriks Kategori Awal': kategoriMatrixAwal } = params.row; // Get nippos value from row data
//                 return (
//                     <Button 
//                         variant="contained" 
//                         sx={{
//                             backgroundColor:'#1C2D5A', 
//                             color: '#FFFFFF',
//                             borderRadius:'12px', 
//                             padding: '6px 16px'
//                         }} 
//                         endIcon={<CreateOutlined />}
//                         onClick={() => handleOpenFirstModal(nippos,kategoriMatrixAwal)} // Pass nippos to handleOpenFirstModal
//                         disabled={disabled}
//                     >
//                         Ubah Kategori
//                     </Button>
//                 );
//             },
//         },
//         {
//         field: 'reason', headerName: 'Alasan Perubahan', width: 130
//         },
//     ];

//     const filteredRows = rows.filter((row) => {
//         const namaMatch = !searchNama || (row.nama && row.nama.toLowerCase().includes(searchNama.toLowerCase())); // Add null check for row.nama
//         const nipposMatch = !searchNippos || (row.nippos && row.nippos.toLowerCase().includes(searchNippos.toLowerCase())); // Add null check for row.nippos
//         const jobLevelMatch = !searchJobLevel || (row['Job Level'] && row['Job Level'].toLowerCase().includes(searchJobLevel.toLowerCase())); // Add null check for row.nippos
//         const KategoriMatrixMatch = !searchKategoriMatrix || (row['Matriks Kategori Akhir'] && row['Matriks Kategori Akhir'].toLowerCase().includes(searchKategoriMatrix.toLowerCase())); // Add null check for row.nippos

//         return (!searchNama || namaMatch) 
//         && (!searchNippos || nipposMatch) 
//         && (!searchJobLevel || jobLevelMatch) 
//         && (!searchKategoriMatrix || KategoriMatrixMatch);
//     });

//     return (
//         <div style={{ height: 400, width: '100%' }}>
//             <DataGrid
//                 rows={filteredRows}
//                 columns={columns}
//                 initialState={{
//                     pagination: {
//                         paginationModel: { page: 0, pageSize: 5 },
//                     },
//                 }}
//                 pageSizeOptions={[5, 10]}
//             />

//             <UbahKategoriMatrix 
//                 open={openFirstModal} 
//                 onClose={handleCloseFirstModal} 
//                 onOpenSecondModal={handleOpenSecondModal} 
//                 onSelectCategory={handleCategorySelect}
//                 currentMatrix={currentMatrix}/>

//             <KonfirmasiUbahMatrix 
//                 open={openSecondModal} 
//                 onClose={handlebatalkansecondmodal} 
//                 onConfirm={handleCloseSecondModal}
//                 terpilih={terpilih}
//                 kuota={kuota} />

//         </div>
//     );
// };

// export default TalentClusterKetuaKomiteTalentTable;

import React, { useState, useEffect } from 'react';
import { CreateOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';
import UbahKategoriMatrix from '../../ui-component/modal/ubah-kategori-matrix.jsx';
import KonfirmasiUbahMatrix from '../../ui-component/modal/konfirmasi-ubah-matrix.jsx';
import { Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';
import FilterButton from '../../ui-component/button/FilterButton.jsx';

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

const getStatusStyle = (status) => {
    let color, backgroundColor;
    switch (status) {
        case 'Turun':
            color = '#F44336';
            backgroundColor = '#FFEDED';
            break;
        case 'Naik':
            color = '#66BB6A';
            backgroundColor = '#F5FFF5';
            break;
        case 'Tetap':
            color = '#2196F3';
            backgroundColor = '#EAF8FF';
            break;
        default:
            color = '#000000';
            backgroundColor = 'transparent';
    }
    return { color, backgroundColor };
};

const getKategoriMatrixStyle = (value) => (
    <div>
        <span style={{
            color: '#2196F3',
            backgroundColor: value ? '#EAF8FF' : 'transparent',
            padding: '4px 8px',
            borderRadius: '24px'
        }}>{value}</span>
    </div>
);

const TalentClusterKetuaKomiteTalentTable = ({
    eventid,
    rows,
    onTableDataRefresh,
    disabled,
    searchNama,
    searchNippos,
    searchJobLevel,
    searchKategoriMatrix,
    terpilih,
    kuota,
    initialDataLength
}) => {
    const [openFirstModal, setOpenFirstModal] = useState(false);
    const [openSecondModal, setOpenSecondModal] = useState(false);
    const [selectedNippos, setSelectedNippos] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [currentMatrix, setcurrentMatrix] = useState('')
    const [refreshTable, setRefreshTable] = useState(false);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setPage(1);
    };

    useEffect(() => {
        if (refreshTable) {
            setRefreshTable(false);
        }
    }, [refreshTable]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };

    const url = import.meta.env.VITE_API_BASE_URL

    const ubahmatriks = (eventid, nippos, matriks, reason) => {
        return fetch(url + 'updatematriks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                eventid: eventid,
                nippos: nippos,
                matriks: matriks,
                reason: reason
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
        setRefreshTable(true);
    };

    const handleOpenFirstModal = (nippos, kategoriMatrixAwal) => {
        setSelectedNippos(nippos);
        setcurrentMatrix(kategoriMatrixAwal)
        setOpenFirstModal(true);
    };

    const handleCloseFirstModal = () => {
        setOpenFirstModal(false);
    };

    const handleOpenSecondModal = () => {
        setOpenSecondModal(true);
    };

    const handleCloseSecondModal = (reason) => {
        ubahmatriks(eventid, selectedNippos, selectedCategory, reason)
            .then(() => {
                onTableDataRefresh();
                setOpenSecondModal(false);
            })
            .catch(error => {
                console.error('Error updating data:', error);
            });
    };

    const handlebatalkansecondmodal = () => {
        setOpenSecondModal(false);
    };

    const noResultsCaption = "Maaf, tidak ada hasil yang sesuai dengan pencarian Anda.\nCoba periksa ejaan kata kunci";

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, rows.length);
    const calculateColumnWidth = (data, accessor, headerText) => {
        const maxLength = Math.max(...data.map((item) => (item[accessor] ? item[accessor].toString().length : 0)), headerText.length);
        return maxLength * 11;
    };

    return (
        <div>
            {
                rows.length === 0 && initialDataLength !== rows.length ? (
                    <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }}>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>No</StyledTableCell>
                                        <StyledTableCell sx={{ minWidth: 150 }}>Nama</StyledTableCell>
                                        <StyledTableCell>NIPPOS</StyledTableCell>
                                        <StyledTableCell sx={{ minWidth: 250 }}>Posisi</StyledTableCell>
                                        <StyledTableCell>Job Level</StyledTableCell>
                                        <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'jobfam', 'Job Family') }}>Rumpun Jabatan</StyledTableCell>
                                        <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'Kantor', 'Nama Kantor') }}>Kantor</StyledTableCell>
                                        <StyledTableCell>Komite Unit</StyledTableCell>
                                        <StyledTableCell>Kategori Matrix Awal</StyledTableCell>
                                        <StyledTableCell>Kategori Matrix Akhir</StyledTableCell>
                                        <StyledTableCell>Status</StyledTableCell>
                                        <StyledTableCell sx={{ textAlign: 'center' }}>Aksi</StyledTableCell>
                                        <StyledTableCell>Alasan Perubahan</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                            </Table>
                        </TableContainer>
                        <Typography style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', whiteSpace: 'pre-line', textAlign: 'center' }}>
                            {noResultsCaption}
                        </Typography>
                    </div>
                ) : (
                    <div style={{ display: 'block', borderRadius: '12px', border: '1px solid #E0E0E0', marginBottom: '24px' }}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }}>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>No</StyledTableCell>
                                        <StyledTableCell sx={{ minWidth: 150 }}>Nama</StyledTableCell>
                                        <StyledTableCell>NIPPOS</StyledTableCell>
                                        <StyledTableCell sx={{ minWidth: 250 }}>Posisi</StyledTableCell>
                                        <StyledTableCell>Job Level</StyledTableCell>
                                        <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'jobfam', 'Job Family') }}>Rumpun Jabatan</StyledTableCell>
                                        <StyledTableCell sx={{ minWidth: calculateColumnWidth(rows, 'Kantor', 'Nama Kantor') }}>Kantor</StyledTableCell>
                                        <StyledTableCell>Komite Unit</StyledTableCell>
                                        <StyledTableCell>Kategori Matrix Awal</StyledTableCell>
                                        <StyledTableCell>Kategori Matrix Akhir</StyledTableCell>
                                        <StyledTableCell>Status</StyledTableCell>
                                        <StyledTableCell sx={{ textAlign: 'center' }}>Aksi</StyledTableCell>
                                        <StyledTableCell>Alasan Perubahan</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.slice(startIndex, endIndex).map((row) => (
                                        <TableRow key={row.id}>
                                            <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{row.id}</StyledTableCell>
                                            <StyledTableCell>{row.nama}</StyledTableCell>
                                            <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{row.nippos}</StyledTableCell>
                                            <StyledTableCell>{row.Posisi}</StyledTableCell>
                                            <StyledTableCell sx={{ textAlign: 'center' }}>{row['Job Level']}</StyledTableCell>
                                            <StyledTableCell>{row['Rumpun Jabatan']}</StyledTableCell>
                                            <StyledTableCell>{row['Nama Kantor']}</StyledTableCell>
                                            <StyledTableCell>{row['Komite Unit']}</StyledTableCell>
                                            <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{getKategoriMatrixStyle(row['Matriks Kategori Awal'])}</StyledTableCell>
                                            <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>{getKategoriMatrixStyle(row['Matriks Kategori Akhir'])}</StyledTableCell>
                                            <StyledTableCell>
                                                <div style={getStatusStyle(row.status)}>
                                                    <span>{row.status}</span>
                                                </div>
                                            </StyledTableCell>
                                            <StyledTableCell sx={{ whiteSpace: 'nowrap' }}>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: '#1C2D5A',
                                                        color: '#FFFFFF',
                                                        borderRadius: '12px',
                                                        padding: '6px 16px'
                                                    }}
                                                    endIcon={<CreateOutlined />}
                                                    onClick={() => handleOpenFirstModal(row.nippos, row['Matriks Kategori Awal'])}
                                                    disabled={disabled}
                                                >
                                                    Ubah Kategori
                                                </Button>
                                            </StyledTableCell>
                                            <StyledTableCell>{row.reason}</StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
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

            <UbahKategoriMatrix
                open={openFirstModal}
                onClose={handleCloseFirstModal}
                onOpenSecondModal={handleOpenSecondModal}
                onSelectCategory={handleCategorySelect}
                currentMatrix={currentMatrix} />

            <KonfirmasiUbahMatrix
                open={openSecondModal}
                onClose={handlebatalkansecondmodal}
                onConfirm={handleCloseSecondModal}
                terpilih={terpilih}
                kuota={kuota} />
        </div>
    );
};

export default TalentClusterKetuaKomiteTalentTable;


