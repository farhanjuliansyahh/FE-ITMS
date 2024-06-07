import React, { useEffect, useState } from 'react';
import { Grid,  Stack,  Box, } from '@mui/material';
import { gridSpacing } from '../../store/constant.jsx';
import SearchResetButton from './SearchResetButton.jsx';
import EventDetailSearchSection from './EventDetailSearchSection.jsx';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const ManajemenSearchSectionGroup= () => {
const [filterNama, setFilterNama] = useState('');
const [filterNippos, setFilterNippos] = useState('');
const [filterJob, setFilterJob] = useState('');
const [filterKategoriMatrix, setFilterKategoriMatrix] = useState('');
    return (
        <Box>
            <Grid container spacing={gridSpacing}>
                {/* Your component JSX code here */}
                <Grid item xs={12}>
                <Stack direction="row"  justifyContent="start" alignItems="center">
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
                    <div style={{ marginRight: '12px', width:'100%' }}>
                        <EventDetailSearchSection filter={filterKategoriMatrix} setFilter={setFilterKategoriMatrix} PlaceHolder={'Kategori Matriks'} />
                    </div>
                    {/* <div style={{ marginRight: '12px' }}>
                        <SearchResetButton outlineColor="#1C2D5A" icon={SearchIcon} LabelName={'Cari'} />
                    </div> */}
                    <div style={{ marginRight: '0px' }}>
                        <SearchResetButton outlineColor="#D32F2F" icon={RestartAltIcon} LabelName={'Reset'} />
                    </div>
                </div>
                </Stack>
                </Grid>
                {/* Other components and sections */}
            </Grid>
        </Box>
    );
};

export default ManajemenSearchSectionGroup;
