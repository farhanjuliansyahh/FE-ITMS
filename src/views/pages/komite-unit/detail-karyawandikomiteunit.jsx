import * as React from 'react';
import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RestartAltOutlined, Search } from '@mui/icons-material';

import MainCard from '../../../ui-component/cards/MainCard';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import KaryawanKomiteUnit from '../../../ui-component/tables/karyawankomiteunit';
import KonfirmasiTalentSource from '../../../ui-component/modal/konfirmasi-talentsource';
import ButtonErrorOutlined from '../../../ui-component/button/ButtonErrorOutlined';
import CustomSearch from '../../../ui-component/searchsection/custom-search';
import.meta.env.VITE_API_BASE_URL

// ==============================|| DETAIL KARYAWAN DARI KOMITE UNIT ||============================== //

export default function DetailKaryawandiKomiteUnit({Title, Icon, Label, ActionForButton, id, rows, nippos, source_kuota, checkboxSelection,sudahdipilih}) {
    const [filterNama, setFilterNama] = useState('');
    const [filterNippos, setFilterNippos] = useState('');
    const [filterJob, setFilterJob] = useState('');
    const [showModal, setShowModal] = useState(false);  // State to control the visibility of the modal
    const [selectedRows, setSelectedRows] = useState([]);
    const [checkedCount, setCheckedCount] = useState(0); // State variable to store the count of checked checkboxes
    const url = import.meta.env.VITE_API_BASE_URL

    const handleSelectedRowsChange = (newSelectedRows) => {
        setSelectedRows(newSelectedRows);
        setCheckedCount(newSelectedRows.length); // Update the checkedCount whenever selectedRows changes
    };
    const closeModal = () => {
        setShowModal(false);
      };
    const toggleModal = () => {
        if (ActionForButton) {
            setShowModal(!showModal);
        }
    };

    const FlexContainer = styled('div')({
        display: 'flex',
        alignItems: 'center',
        gap: '16px', 
        paddingBottom: '24px',
    });

    const tablerows= rows

    const handleTambahTalent = () => {
        // Find the rows corresponding to the selected IDs
        const selectedNippos = selectedRows.map(id => {
            const selectedRow = rows.find(row => row.id === id);
            return selectedRow ? selectedRow.Nippos : null; // Return Nippos if row found, null otherwise
        });
    
        // Remove null values (in case some IDs didn't match any rows)
        const validNippos = selectedNippos.filter(nippos => nippos !== null);
    
        // Send update API request to change something in the database
        fetch(url + `updatestatussource?eventtalentid=${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nippos: validNippos
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add talent');
                }
                // Reset selectedRows state to clear selected checkboxes
                setSelectedRows([]);
                // Reload the page to reflect changes
                window.location.reload();
            })
            .catch(error => {
                console.error('Error adding talent:', error);
            });
    };

    const alreadySelected = sudahdipilih + checkedCount

    const handleDownloadCSV = () => {
        let dataToDownload = [];
        let filename = '';
        
        dataToDownload = resetRowIndex(filteredRows);
        filename = `Talent_Source_Terdaftar_${id}.csv`;
  
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
          dataToDownload.map((row) => headers.map((header) => row[header]).join(',')).join('\n');
    
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
        
    // create list of Nama, Nippos, Job Level
    const listNama = [...new Set(tablerows.map(row => row.Nama))];
    const listNippos = [...new Set(tablerows.map(row => row.Nippos))];
    const listJobLevel = [...new Set(tablerows.map(row => row['Job Level']))];

    const [selectedNama, setSelectedNama] = useState(null);
    const [selectedNippos, setSelectedNippos] = useState(null);
    const [selectedJobLevel, setSelectedJobLevel] = useState(null);

    const resetNamaInput = () => {
        setSelectedNama('');
    };

    const resetNipposInput = () => {
        setSelectedNippos('');
    };

    const resetJobLevelInput = () => {
        setSelectedJobLevel('');
    };

    const handleResetSearch = () => {
        setSelectedNama('');
        setSelectedNippos('');
        setSelectedJobLevel('');

        // Call resetInput function for each CustomSearch component
        resetNamaInput();
        resetNipposInput();
        resetJobLevelInput();
    };

    const filteredRows = tablerows.filter((row) => {
        const namaMatch = !selectedNama || (row.Nama && row.Nama.toLowerCase().includes(selectedNama.toLowerCase())); 
        const nipposMatch = !selectedNippos || (row.Nippos && row.Nippos.toLowerCase().includes(selectedNippos.toLowerCase())); 
        const jobLevelMatch = !selectedJobLevel || (row['Job Level'] && row['Job Level'].toLowerCase().includes(selectedJobLevel.toLowerCase())); 

        return namaMatch && nipposMatch && jobLevelMatch
    });

    const resetRowIndex = (filteredRows) => {
        return filteredRows.map((row, index) => ({
          ...row,
          id: index + 1, // Adding 1 to start the index from 1 instead of 0
        }));
      }; 

    return (
        <MainCard>
            <Box paddingLeft={3} paddingRight={3} paddingBottom={3} marginTop={3}>
                <FlexContainer>
                    <Typography style={{fontSize:'24px', fontWeight:'bold'}} gutterBottom>
                        {Title}
                    </Typography>
                    <Button
                        variant="contained"
                        style={{ color: '#2196F3', borderRadius: '15px', borderColor: '#EAF8FF', backgroundColor: '#EAF8FF', boxShadow: 'none' }}
                    >
                        sudah terpilih {alreadySelected}/{source_kuota} Karyawan
                    </Button>
                    <div style={{ flex: '1' }}> </div>
                    {checkboxSelection ?
                        <ButtonPrimary Color="#ffffff" icon={Icon} LabelName={Label} onClick={toggleModal} disabled={alreadySelected !== source_kuota || sudahdipilih >= source_kuota} />
                        :
                        <ButtonPrimary Color="#ffffff" icon={Icon} LabelName={Label} onClick={handleDownloadCSV} />
                    }
                </FlexContainer>
          
                <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '16px', width:'100%' }}>
                    <Stack direction="row" spacing={2} marginRight={2} width={'100%'}>
                        <CustomSearch field={listNama} label={'Nama'} onSearch={setSelectedNama} value={selectedNama} resetInput={resetNamaInput} />
                        <CustomSearch field={listNippos} label={'Nippos'} onSearch={setSelectedNippos} value={selectedNippos} resetInput={resetNipposInput} />
                        <CustomSearch field={listJobLevel} label={'Job Level'} onSearch={setSelectedJobLevel} value={selectedJobLevel} resetInput={resetJobLevelInput} />
                    </Stack>
                    <ButtonErrorOutlined onClick={handleResetSearch} Color="#D32F2F" icon={RestartAltOutlined} LabelName={'Reset'}/>
                </div>

                <KaryawanKomiteUnit 
                    checkboxSelection={checkboxSelection} 
                    rows={filteredRows} 
                    selectedRows={selectedRows} 
                    onSelectedRowsChange={handleSelectedRowsChange}
                />

                {ActionForButton && <KonfirmasiTalentSource 
                    open={showModal} 
                    handleClose={closeModal} 
                    onConfirmation={handleTambahTalent} />
                }

            </Box>

        </MainCard>
    );
}
