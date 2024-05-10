import * as React from 'react';
import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RestartAlt, Search } from '@mui/icons-material';

import MainCard from '../../../ui-component/cards/MainCard';
import ButtonPrimary from '../../../ui-component/button/ButtonPrimary';
import SearchResetButton from '../../../ui-component/button/SearchResetButton';
import EventDetailSearchSection from '../../../ui-component/button/EventDetailSearchSection';
import KaryawanKomiteUnit from '../../../ui-component/tables/karyawankomiteunit';
import KonfirmasiTalentSource from '../../../ui-component/modal/konfirmasi-talentsource';

// ==============================|| DETAIL KARYAWAN DARI KOMITE UNIT ||============================== //

export default function DetailKaryawandiKomiteUnit({Title, Icon, Label, ActionForButton,id, rows, nippos, source_kuota, checkboxSelection,sudahdipilih}) {
    const [filterNama, setFilterNama] = useState('');
    const [filterNippos, setFilterNippos] = useState('');
    const [filterJob, setFilterJob] = useState('');
    const [showModal, setShowModal] = useState(false);  // State to control the visibility of the modal
    const [selectedRows, setSelectedRows] = useState([]);
    const [checkedCount, setCheckedCount] = useState(0); // State variable to store the count of checked checkboxes


    const handleSelectedRowsChange = (newSelectedRows) => {
        setSelectedRows(newSelectedRows);
        setCheckedCount(newSelectedRows.length); // Update the checkedCount whenever selectedRows changes
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
        console.log("validnippos", validNippos);
    
        // Send update API request to change something in the database
        fetch(`http://localhost:4000/updatestatussource?eventtalentid=${id}`, {
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

          dataToDownload = rows;
          filename = `Talent_Source_Terdaftar.csv`;

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
          
                <div style={{ display: 'flex', justifyContent: 'flex-start', paddingBottom: '16px', width:'100%' }}>
                    <div style={{ marginRight: '12px', width:'100%'  }}>
                        <EventDetailSearchSection filter={filterNama} setFilter={setFilterNama} PlaceHolder={'Nama'} />
                    </div>
                    <div style={{ marginRight: '12px', width:'100%' }}>
                        <EventDetailSearchSection filter={filterNippos} setFilter={setFilterNippos} PlaceHolder={'NIPPOS'} />
                    </div>
                    <div style={{ marginRight: '12px', width:'100%' }}>
                        <EventDetailSearchSection filter={filterJob} setFilter={setFilterJob} PlaceHolder={'Job Level'} />
                    </div>
                    <div style={{ marginRight: '12px' }}>
                        <SearchResetButton outlineColor="#1C2D5A" icon={Search} LabelName={'Cari'} />
                    </div>
                    <div style={{ marginRight: '0px' }}>
                        <SearchResetButton outlineColor="#D32F2F" icon={RestartAlt} LabelName={'Reset'} />
                    </div>
                </div>

                <KaryawanKomiteUnit 
                    checkboxSelection={checkboxSelection} 
                    rows={tablerows} 
                    selectedRows={selectedRows} 
                    onSelectedRowsChange={handleSelectedRowsChange}
                    filter={{nama:filterNama, nippos:filterNippos, job:filterJob}}
                />

                {ActionForButton && <KonfirmasiTalentSource 
                    open={showModal} 
                    handleClose={() => setShowModal(false)} 
                    onConfirmation={handleTambahTalent} />
                }

            </Box>

        </MainCard>
    );
}
