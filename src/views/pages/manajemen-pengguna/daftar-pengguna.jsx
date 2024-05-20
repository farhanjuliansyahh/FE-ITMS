import { useEffect, useState, useCallback } from 'react';
import { gridSpacing } from '../../../store/constant';
import { Grid, Stack,Typography, Box} from '@mui/material';
import { FileDownloadOutlined, RestartAltOutlined } from '@mui/icons-material';

import MainCard from '../../../ui-component/cards/MainCard';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import DaftarPenggunaTabel from '../../../ui-component/tables/daftarpengguna';
import CustomSearch from '../../../ui-component/searchsection/custom-search';
import ButtonErrorOutlined from '../../../ui-component/button/ButtonErrorOutlined';

// ==============================|| MANAJEMEN PENGGUNA ||============================== //

const DaftarPengguna = () => {
  const [isLoading, setLoading] = useState(true);
  const [rowsUser, setRowsUser] = useState([])

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    // Fetch data from API
    fetch(`http://localhost:4000/getallroles`)
      .then(response => response.json())
      .then(data => {
        // Update state with API data
        setRowsUser(data.map((row, index) => ({ ...row, id: index + 1 })))
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

    const userLength = rowsUser.length

    //
    const listNama = [...new Set(rowsUser.map(row => row.nama))];
    const listNippos = [...new Set(rowsUser.map(row => row.nippos))];
    const listPeran = [...new Set(rowsUser.map(row => row.Peran))];

    const [selectedNama, setSelectedNama] = useState(null);
    const [selectedNippos, setSelectedNippos] = useState(null);
    const [selectedPeran, setSelectedPeran] = useState(null);
  
    const resetNamaInput = () => {
      setSelectedNama('');
    };
  
    const resetNipposInput = () => {
      setSelectedNippos('');
    };
  
    const resetPeranInput = () => {
      setSelectedPeran('');
    };
  
    const handleResetSearch = () => {
      setSelectedNama('');
      setSelectedNippos('');
      setSelectedPeran('');
  
      // Call resetInput function for each CustomSearch component
      resetNamaInput();
      resetNipposInput();
      resetPeranInput();
    };
  
    const [filteredData, setFilteredData] = useState([]); // State to hold the filtered data

  // Memoize the function to prevent infinite loops
  const handleFilteredData = useCallback((data) => {
    setFilteredData(data);
  }, []);

  useEffect(() => {
    // Initially set filteredData to rowsUser
    setFilteredData(rowsUser);
  }, [rowsUser]);

  const handleDownloadCSV = () => {
    let dataToDownload = [];
    let filename = '';
    
    dataToDownload = filteredData;
    filename = `Daftar_Pengguna.csv`;

    // Create a CSV header with column names
    const headers = Object.keys(dataToDownload[0]);
    const idIndex = headers.indexOf('id');
    if (idIndex !== -1) {
      headers.splice(idIndex, 1); // Remove 'id' from headers
      headers.unshift('id'); // Insert 'id' at the beginning
    }
    const headerRow = headers.join(',');
  
    // Convert data to CSV format
    const csvContent = "data:text/csv;charset=utf-8," + headerRow + '\n' +
      dataToDownload.map(row => headers.map(header => row[header]).join(',')).join('\n');
  
    // Create a temporary anchor element
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
  
    // Trigger the download
    link.click();
  
    // Clean up
    document.body.removeChild(link);
  };

  return (
    <>
      {/* <MainLayout/> */}
      <MainCard>
        <Grid container spacing={gridSpacing} padding={'24px'} >
          <Grid item xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
              <Box style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Stack direction="row" spacing={2} alignItems="center"  style={{marginBottom: '16px'}}>
                  <Typography style={{display: 'inline',fontFamily: 'Roboto', fontSize:'24px', fontWeight: '700' }} gutterBottom>
                    Tabel Karyawan
                  </Typography>
                  <Typography variant="body2" 
                    style={{
                      color:'#2196F3',
                      backgroundColor:'#EAF8FF', // Default background color
                      padding: '8px 16px', // Adjust padding as needed
                      borderRadius: '16px', // Adjust border radius for rounded corners
                      display: 'inline-block', // Ensure inline display
                      fontSize: '16px',
                      fontFamily:'Roboto',
                      fontWeight: 500
                    }}>
                    {userLength} Talent Karyawan
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} /> {/* This will push the following elements to the right */}
                  <Stack direction="row" spacing={1}>
                    <ButtonPrimary Color="#ffffff" icon={FileDownloadOutlined} LabelName={'Unduh Data'} onClick={handleDownloadCSV}/>
                  </Stack>
                </Stack>

                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width:'100%' }}>
                  <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                    <CustomSearch field={listNama} label={'Nama'} onSearch={setSelectedNama} value={selectedNama} resetInput={resetNamaInput} />
                    <CustomSearch field={listNippos} label={'Nippos'} onSearch={setSelectedNippos} value={selectedNippos} resetInput={resetNipposInput} />
                    <CustomSearch field={listPeran} label={'Peran'} onSearch={setSelectedPeran} value={selectedPeran} resetInput={resetPeranInput} />
                  </Stack>
                  <ButtonErrorOutlined onClick={handleResetSearch} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'}/>
                </div>

                <DaftarPenggunaTabel 
                  rows={rowsUser}
                  searchNama={selectedNama} 
                  searchNippos={selectedNippos}
                  searchPeran={selectedPeran}
                  onFilteredData={handleFilteredData} // Pass the function to child component
                />
              </Box>
              </Grid>
            </Grid>
          </Grid>
          
        </Grid>
      </MainCard>
    </>
  );
};

export default DaftarPengguna;
